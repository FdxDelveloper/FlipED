import React, {Component} from "react"
import {connect} from "react-redux"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import UserCard from "../../components/UserCard"

import Searchbar from "../../components/Searchbar"
import Grid from "../../components/Grid"

import {ROLE} from "../../constants/roles"

import app, {services} from "../../client/api"
import {setUi, setSnackbar} from "../../actions/app"

import s from "./UserList.scss"

const USER_QUERY = {
  query: {
    $select: ["_id", "username", "photo", "roles", "email"]
  }
}

const mapStateToProps = state => ({
  socket: state.socket,
  online: state.socket.queryResult ? state.socket.queryResult.online : [],
  user: state.user,
  users: state.users.queryResult || {},
  search: state.app.ui.studentSearch || "",
  filter: state.app.ui.studentFilter || "username"
})

const mapDispatchToProps = dispatch => ({
  getOnline: () => dispatch(services.socket.find()),
  getUsers: () => dispatch(services.users.find(USER_QUERY)),
  elevate: (id, role) => {
    if (role) {
      const roles = role === "admin" ? "guest" : Object.keys(ROLE)[ROLE[role].perm + 1]
      dispatch(setSnackbar(`ปรับปรุงสิทธิการใช้งานเป็น${ROLE[roles].th}แล้วครับ`))
      dispatch(services.users.patch(id, {roles}))
      dispatch(services.users.find())
      dispatch(services.socket.find())
    } else {
      dispatch(setSnackbar("ไม่สามารถเพิ่มสิทธิให้ผู้เยี่ยมชมได้"))
    }
  },
  handleSearch: (value, filter) => {
    dispatch(setUi("studentSearch", value))
    dispatch(services.users.find({
      query: {
        [filter || "username"]: {
          $regex: value,
          $options: "ig"
        },
      }
    }))
    dispatch(services.socket.find())
  },
  toggleFilter: filter => {
    switch (filter) {
      case "username":
        dispatch(setUi("studentFilter", "email"))
        break
      case "email":
        dispatch(setUi("studentFilter", "roles"))
        break
      case "roles":
        dispatch(setUi("studentFilter", "username"))
        break
      default:
        break
    }
  },
  addStudent: () => {
    dispatch(setSnackbar("ความสามารถนี้ยังไม่พร้อมใช้งานในขณะนี้ (503: Not Implemented)"))
  }
})

const onlineFirst = (arr, online) => {
  const data = arr
  data.forEach((item, i) => {
    if (online[item._id]) {
      data.splice(i, 1)
      data.unshift(item)
    }
  })
  return data
}

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(s)
export default class UserList extends Component {

  componentDidMount() {
    this.props.getOnline()
    app.service("socket").on("connected", this.props.getOnline)
    app.service("socket").on("disconnected", this.props.getOnline)
    app.service("users").on("patched", this.props.getUsers)
    app.service("users").on("created", this.props.getUsers)
  }

  componentWillUnmount() {
    app.service("socket").off("connected")
    app.service("socket").off("disconnected")
    app.service("users").off("created")
  }

  render = () => (
    <div className={s.main}>
      <Searchbar
        searchText="ค้นหารายชื่อผู้ใช้งาน"
        onSearch={this.props.handleSearch}
        value={this.props.search}
        onFilterToggle={() => this.props.toggleFilter(this.props.filter)}
        filter={this.props.filter}
        btn={this.props.addStudent}
        btnText="การตั้งค่าเพิ่มเติม"
        hr top
      />
      <Grid r>
        {this.props.users.data &&
          onlineFirst(this.props.users.data, this.props.online).map((user, i) => (
            <Grid style={{marginBottom: "2em"}} xs={12} sm={6} md={4} key={i}>
              <UserCard
                online={this.props.online[user._id]}
                elevate={() => this.props.elevate(user._id, user.roles)}
                {...user}
              />
            </Grid>
          ))
        }
      </Grid>
    </div>
  )

}

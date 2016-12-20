import React, {Component} from "react"
import {Link} from "react-router"
import {connect} from "react-redux"

import Paper from "./Paper"
import TextField from "./TextField"
import GridList from "./GridList"

import {services, app, LESSON_API, LESSON_URL} from "../constants/api"
import {setField} from "../actions/app"

const mapStateToProps = state => ({
  lessons: state.lesson.queryResult,
  searchField: state.app.fields.searchLesson,
  user: state.user
})

const mapDispatchToProps = (dispatch, props) => ({
  search: (query = "") => {
    dispatch(setField("searchLesson", query))
    dispatch(services.lesson.find({
      query: {
        $select: ["_id", "url", "name", "description", "thumbnail", "color", "section"],
        name: {
          $regex: query,
          $options: "ig"
        },
        parentCourse: props.classId
      }
    }))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export default class LessonList extends Component {

  componentDidMount = () => {
    /*
    app.service(LESSON_API).on("created", () => this.props.search())
    app.service(LESSON_API).on("patched", () => this.props.search())
    app.service(LESSON_API).on("removed", () => this.props.search())
    */
  }

  componentWillUnmount = () => {
    // ["created", "removed", "patched"].forEach(e => app.service(LESSON_API).off(e))
  }

  render = () => (
    <div>
      <Paper>
        <TextField
          label="ค้นหาบทเรียน"
          value={this.props.searchField}
          onChange={v => this.props.search(v.target.value)}
        />
      </Paper>
      <GridList
        data={this.props.lessons && this.props.lessons.data}
        url={LESSON_URL}
        cLink="/create"
        cTitle="สร้างห้องเรียน"
      />
    </div>
  )

}

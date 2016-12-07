import React, {Component} from "react"

import ChatInterface from "./ChatInterface"

const WAITING_TIME = 1300
const TYPING_TIME = 800

const stage = {
  "somsak/1": {
    messages: [{
      user: 2,
      text: [
        "สวัสดีครับ N' ภูมิ ไม่เจอกันนานเลยนะ 😀",
        "รู้รึเปล่าว่า คำว่า <b>เสี่ยโอ</b> เริ่มมีการใช้เมื่อไร?",
      ]
    }, {
      user: 2,
      image: "placehold.it/1920x1080",
      text: ["สวัสดีครับ"]
    }, {
      user: 1,
      text: ["อ่าหะ..."]
    }],
    choices: [{
      path: "somsak/2",
      text: "ไม่ทราบครับพี่สมศักดิ์ 😀"
    }, {
      path: "somsak/2-1",
      text: "ไม่อยากรู้ครับกลัว 112 👋"
    }]
  },
  "somsak/2": {
    messages: [{
      user: 2,
      text: [
        `เมื่อวาน ผมไปกินกาแฟกับเพื่อนคนไทยและฝรั่งจำนวนหนึ่ง
          (อยู่นี่ พิลึกดี ผมมีนัดเจอคนเสมอๆ มากกว่าอยู่เมืองไทยหลายปีรวมกัน)`,
        `มีเพื่อนคนนึงถามขึ้นมาว่า คำว่า <b>เสี่ยโอ</b> นี่ใครเป็นคนคิด และคิดขึ้นมาเมื่อไร`
      ]
    }],
    choices: [{path: "somsak/3", text: "แล้วอาจารย์พอจะทราบไหมครับ 😀"}]
  },
  "somsak/2-1": {
    messages: [{
      user: 2,
      text: [`โอ๊ยเดี๋ยวมึงก็โดนจับครับ กลัวเหี้ยไร 😂 😂 😂`]
    }, {
      user: 0,
      text: ["BAD END"]
    }],
    choices: []
  },
  "somsak/3": {
    messages: [{
      user: 2,
      text: [
        `เรื่องใครเป็นคนคิด ผมบอกไม่ได้ แต่เรื่องเมื่อไร ผมคิดว่าผมพอจะบอกปีที่ใกล้เคียงได้`,
        `ผมคิดว่า น่าจะประมาณ <b>กลางทศวรรษ 2520</b> คือน่าจะราว<b>ประมาณปี 2526-2527</b>`
      ]
    }],
    choices: [{path: "somsak/4", text: "ทำไมถึงคิดอย่างนั้นล่ะครับ"}]
  },
  "somsak/4": {
    messages: [{
      user: 2,
      text: [
        `ทำไมผมจึงคิดเช่นนั้น? ผมไปเรียนปริญญาเอกตอนต้นปี 2526
          ผมจำได้ค่อนข้างแน่ใจว่า ตอนที่ผมออกจากเมืองไทย <b>คำนี้ยังไม่มีการใช้กัน</b>`,
        `อีกอย่าง ถ้าดูหนังสือใต้ดินชื่อ <b>ประวัติ 9 รัชกาล</b>
          (ที่หลังวิกฤติครั้งนี้ มีคนเอามาเผยแพร่ในชื่อยาวๆ
          <b>ความจริงย่อมลอยขึ้น เหนือน้ำ เหนือฟ้าเสมอ</b>)`,
        `ซึ่งพิมพ์ครั้งแรกในปี 2525 <b>ยังไม่มีการเอ่ยถึงคำนี้</b> ซึ่งโดยลักษณะของหนังสือเล่มนั้น
          ถ้ามีการใช้คำนี้โดยแพร่หลายแล้ว น่าจะต้องเอ่ยถึงบ้าง`,
        `แต่ตอนผมกลับมาเมืองไทยชั่วคราวเพื่อเก็บข้อมูล <b>ในปี 2528 ผมได้ยินคำนี้แล้ว</b>
          ยังจำได้ว่า ตอนได้ยินครั้งแรก งงมาก ว่า <b>"เสี่ย" ไหน?</b>`,
        `หรือทำไมจึงต้อง <b>"เสี่ยโอ"</b>? ต้องให้คนอธิบายให้ฟัง`
      ]
    }],
    choices: [{path: "somsak/5", text: `เล่าให้ฟังเลยซิครับ 👋`}]
  },
  "somsak/5": {
    messages: [{
      user: 2,
      text: [
        `เมื่อครู่ ผมลองเช็คข้อมูลอันหนึ่งเพื่อจะดูว่า ในช่วงกลางทศวรรษ 2520
          มีอะไรที่เป็นปริบทที่อาจจะส่งเสริมให้เกิดคำนี้ขึ้นมา`,
        `ก็พบว่า ปี 2522 คุณ <b>"ยุวธิดา ผลประเสริฐ"</b>
          (หรือ คุณ <b>"สุจาริณี วิวัชรวงศ์"</b> ในปัจจุบัน) เริ่ม <b>"หายไปจากวงการ"</b>`,
        `ผมคิดว่านี่คงเป็น<b>ปัจจัยอย่างหนึ่ง</b>ที่มีส่วน (contribute)
          ให้เริ่มมีการพาดพิงถึงบางคนด้วยคำว่า "เสี่ยโอ"`,
        `คือถ้าเราคิดว่า คุณยุวธิดา หลังจาก "หายไปจากวงการ"
          กว่าที่จะเป็น<b>ข่าวลือซุบซิบแพร่หลาย</b>กว้างเต็มที่`,
        `และกว่าที่คนจะเริ่ม<b>พูดในเชิงลบต่อ "เสี่ย"</b> อย่างแพร่หลายเต็มที่
          ก็น่าจะ<b>ราวๆ 2-3 ปี</b>`,
        `ก็จะตกประมาณ<b>กลางทศวรรษ 2525</b>`,
        `ช่วงเวลาที่ผมคาดไว้ข้างต้นว่า คำนี้เริ่มใช้
          (<b>2526-2527</b> ที่ผมไม่อยู่เมืองไทยครั้งแรก) ก็น่าจะใกล้เคียง`
      ]
    }],
    choices: [{text: "ขอบคุณมากครับ 👋"}]
  }
}

const users = [{
  name: "Game Moderator",
  avatar: "/images/icon/listening.svg",
}, {
  name: "Pmc",
  client: 1
}, {
  name: "Somsak Jeamteerasakul",
  avatar: "https://scontent.fbkk1-2.fna.fbcdn.net/v/t1.0-1/12063386_889937894392824_5154552084527806469_n.jpg?oh=e8d5ecececfce77f8f29b7551987a8f4&oe=58B03653"
}]

class ChatStage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      path: "somsak/1",
      backlog: this.getInitialBacklog("somsak/1"),
      isTyping: {}
    }
  }

  getInitialBacklog = path => {
    const backlog = []
    if (typeof stage[path] !== "undefined") {
      stage[path].messages.forEach(message => {
        message.text.forEach((text, index) => {
          backlog.push({
            text,
            user: message.user,
            showAvatar: !index || message.user !== backlog[backlog.length - 1].user
          })
        })
      })
    }
    return backlog
  }

  handleChoiceSelection = i => {
    const choice = stage[this.state.path].choices[i]
    console.log("PATH_SELECTED", choice.path, choice.text)
    this.addChat(choice.text, 0, 1)
    if (typeof stage[choice.path] !== "undefined") {
      this.setState({path: choice.path})
      let counter = 0
      stage[choice.path].messages.forEach(message => {
        message.text.forEach(text => {
          this.addWithAnim(text, counter, message.user)
          counter++
        })
      })
    }
  }

  addChat = (text, index, user) => {
    const backlog = this.state.backlog
    backlog.push({
      text,
      user,
      showAvatar: !index || user !== backlog[backlog.length - 1].user
    })
    this.setState({backlog})
  }

  toggleTyping = (index, state) => this.setState({
    isTyping: Object.assign({}, this.state.isTyping, {
      [index]: state || !this.state.isTyping[index]
    })
  })

  addWithAnim = (text, index, user) => {
    setTimeout(() => {
      const tIndex = this.state.backlog.length
      this.addChat(text, index, user)
      this.toggleTyping(tIndex)
      setTimeout(() => {
        this.toggleTyping(tIndex)
      }, WAITING_TIME + TYPING_TIME)
      scrollBy({
        behavior: "smooth",
        top: document.body.scrollHeight
      })
    }, WAITING_TIME * index)
  }

  render = () => (
    <ChatInterface
      backlog={this.state.backlog}
      user={users}
      choices={stage[this.state.path].choices}
      onChoiceSelected={this.handleChoiceSelection}
      typing={this.state.isTyping}
    />
  )

}

export default ChatStage

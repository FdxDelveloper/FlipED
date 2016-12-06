import React, {Component} from "react"

import ChatInterface from "./ChatInterface"

const TYPING_TIME = 1300

const stage = [{
  route: {
    0: [{
      user: 2,
      text: [
        "สวัสดีครับ N' ภูมิ ไม่เจอกันนานเลยนะ 😀",
        "รู้รึเปล่าว่า คำว่า <b>เสี่ยโอ</b> เริ่มมีการใช้เมื่อไร?",
      ]
    }, {
      user: 1,
      text: ["อ่าหะ..."]
    }]
  },
  choices: ["ไม่ทราบครับพี่สมศักดิ์ 😀", "ไม่อยากรู้ครับกลัว 112 👋"]
}, {
  route: {
    0: {
      user: 2,
      text: [
        `เมื่อวาน ผมไปกินกาแฟกับเพื่อนคนไทยและฝรั่งจำนวนหนึ่ง
          (อยู่นี่ พิลึกดี ผมมีนัดเจอคนเสมอๆ มากกว่าอยู่เมืองไทยหลายปีรวมกัน)`,
        `มีเพื่อนคนนึงถามขึ้นมาว่า คำว่า <b>เสี่ยโอ</b> นี่ใครเป็นคนคิด และคิดขึ้นมาเมื่อไร`
      ]
    },
    1: {
      user: 2,
      text: [`โอ๊ยเดี๋ยวมึงก็โดนจับครับ กลัวเหี้ยไร 😂 😂 😂`]
    }
  },
  choices: ["แล้วอาจารย์พอจะทราบไหมครับ 😀"]
}, {
  route: [{
    user: 2,
    text: [
      `เรื่องใครเป็นคนคิด ผมบอกไม่ได้ แต่เรื่องเมื่อไร ผมคิดว่าผมพอจะบอกปีที่ใกล้เคียงได้`,
      `ผมคิดว่า น่าจะประมาณ <b>กลางทศวรรษ 2520</b> คือน่าจะราว<b>ประมาณปี 2526-2527</b>`
    ]
  }],
  choices: ["ทำไมถึงคิดอย่างนั้นล่ะครับ"]
}, {
  route: {
    0: [{
      user: 2,
      text: [
        `ทำไมผมจึงคิดเช่นนั้น? ผมไปเรียนปริญญาเอกตอนต้นปี 2526
          ผมจำได้ค่อนข้างแน่ใจว่า ตอนที่ผมออกจากเมืองไทย <b>คำนี้ยังไม่มีการใช้กัน</b>`,
        `อีกอย่าง ถ้าดูหนังสือใต้ดินชื่อ <b>ประวัติ 9 รัชกาล</b>
          (ที่หลังวิกฤติครั้งนี้ มีคนเอามาเผยแพร่ในชื่อยาวๆ
          <b>ความจริงย่อมลอยขึ้น เหนือน้ำ เหนือฟ้าเสมอ</b>)`,
        `ซึ่งพิมพ์ครั้งแรกในปี 2525 <b>ยังไม่มีการเอ่ยถึงคำนี้</b> ซึ่งโดยลักษณะของหนังสือเล่มนั้น
          ถ้ามีการใช้คำนี้โดยแพร่หลายแล้ว น่าจะต้องเอ่ยถึงบ้าง`,
      ]
    }, {
      user: 2,
      text: [
        `แต่ตอนผมกลับมาเมืองไทยชั่วคราวเพื่อเก็บข้อมูล <b>ในปี 2528 ผมได้ยินคำนี้แล้ว</b>
          ยังจำได้ว่า ตอนได้ยินครั้งแรก งงมาก ว่า <b>"เสี่ย" ไหน?</b>`,
        `หรือทำไมจึงต้อง <b>"เสี่ยโอ"</b>? ต้องให้คนอธิบายให้ฟัง`
      ]
    }]
  },
  choices: [`เล่าให้ฟังเลยซิครับ 👋`]
}, {
  route: [[{
    user: 2,
    text: [
      `เมื่อครู่ ผมลองเช็คข้อมูลอันหนึ่งเพื่อจะดูว่า ในช่วงกลางทศวรรษ 2520
        มีอะไรที่เป็นปริบทที่อาจจะส่งเสริมให้เกิดคำนี้ขึ้นมา`,
      `ก็พบว่า ปี 2522 คุณ <b>"ยุวธิดา ผลประเสริฐ"</b>
        (หรือ คุณ <b>"สุจาริณี วิวัชรวงศ์"</b> ในปัจจุบัน) เริ่ม <b>"หายไปจากวงการ"</b>`,
    ]
  }, {
    user: 2,
    text: [
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
  }]],
  choices: ["ขอบคุณมากครับ 👋"]
}]

const users = [{
  name: "Somsak Bear",
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
      iter: 0,
      backlog: [],
      isTyping: {}
    }
    stage[0].route[0].forEach(chat => {
      chat.text.forEach((text, index) => {
        this.addChat(text, index, chat.user)
      })
    })
  }

  handleChoiceSelection = i => {
    this.addChat(stage[this.state.iter].choices[i], 0, 1)

    if (typeof stage[this.state.iter + 1].route[i] !== "undefined") {
      const seq = stage[this.state.iter + 1].route[i]
      if (seq.constructor === Array) {
        let counter = 0
        seq.forEach(item => {
          item.text.forEach(text => {
            this.addWithAnim(text, counter, item.user)
            counter++
          })
        })
      } else if (typeof seq === "object") {
        seq.text.forEach((text, index) => {
          this.addWithAnim(text, index, seq.user)
        })
      }
    } else {
      this.addWithAnim({
        user: 1,
        text: ["Route is not defined! Exiting."]
      })
    }

    this.setState({iter: this.state.iter + 1})
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

  toggleTyping = (index = this.state.backlog.length, state) => this.setState({
    isTyping: Object.assign({}, this.state.isTyping, {
      [index]: state || !this.state.isTyping[index]
    })
  })

  addWithAnim = (text, index, user) => {
    setTimeout(() => {
      this.addChat(text, index, user)
      this.toggleTyping()
      setTimeout(() => {
        this.toggleTyping()
      }, (TYPING_TIME + 3000))
    }, TYPING_TIME * index)
  }

  render = () => (
    <ChatInterface
      backlog={this.state.backlog}
      user={users}
      choices={stage[this.state.iter].choices}
      onChoiceSelected={this.handleChoiceSelection}
      typing={this.state.isTyping}
      setTyping={index => this.toggleTyping(index)}
    />
  )

}

export default ChatStage

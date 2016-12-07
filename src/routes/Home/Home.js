import React, {Component} from "react"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import s from "./Home.scss"

import Grid from "../../components/Grid"
import ChatStage from "../../components/ChatStage"

const Somsak = {
  "somsak/1": {
    messages: [{
      user: 2,
      type: "image",
      image: "http://placehold.it/1920x1080",
      text: "สวัสดีครับ N' <b> %NAME% </b> ไม่เจอกันนานเลยนะ 😀"
    }, {
      user: 2,
      text: [
        "รู้รึเปล่าว่า คำว่า <b>เสี่ยโอ</b> เริ่มมีการใช้เมื่อไร?",
      ]
    }, {
      user: 1,
      text: ["อ่าหะ..."]
    }],
    choices: [{
      path: "somsak/2",
      text: "ไม่ทราบครับอาจารย์สมศักดิ์ 😀"
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
      ],
      actions: [{
        type: "INCREMENT",
        payload: {
          key: "DEJA_VU",
          by: 1
        }
      }]
    }],
    choices: [{path: "somsak/3", text: "แล้วอาจารย์พอจะทราบไหมครับ 😀"}]
  },
  "somsak/2-1": {
    messages: [{
      user: 2,
      text: `โอ๊ยเดี๋ยวมึงก็โดนจับครับ กลัวเหี้ยไร 😂 😂 😂`,
      actions: [{
        type: "INCREMENT",
        payload: {
          key: "BAD_END_ENCOUNTER",
          by: 1
        }
      }]
    }, {
      user: 0,
      text: "ลาก่อน %NAME% หวังว่าเราคงจะ<b>ไม่เจอกันอีก</b>"
    }],
    choices: [{
      text: "Take the Blue 💊",
      path: "somsak/1",
      actions: [{
        type: "INCREMENT",
        payload: {
          key: "BAD_END_REPLAY",
          by: 1
        }
      }]
    }, {
      text: "Take the Red 💊",
      path: "redpill/1"
    }]
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
    choices: [{text: "ขอบคุณมากครับ 👋"}, {text: "Replay", path: "somsak/1"}]
  },
  "redpill/1": {
    triggers: [{
      condition: {
        and: [{
          is: "RED_PILLS_TAKEN"
        }, {
          is: "BAD_END_ENCOUNTER"
        }]
      },
      messages: [{
        user: 0,
        text: ["คิดว่าฉันลืมนายรึไง %NAME% 💊💊"]
      }]
    }, {
      condition: {
        and: [{
          not: "BAD_END_REPLAY"
        }, {
          is: "BAD_END_ENCOUNTER"
        }]
      },
      messages: [{
        user: 3,
        type: "image",
        text: "นายหนีสิ่งที่ทำไว้ไม่พ้นหรอก <b> %NAME% </b>",
        image: "http://static.zerochan.net/Chara.(Undertale).full.2034908.jpg"
      }]
    }],
    actions: [{
      type: "INCREMENT",
      payload: {
        key: "RED_PILLS_TAKEN",
        by: 1
      }
    }],
    choices: [{
      text: "Restart",
      path: "somsak/1"
    }, {
      text: "Remove 💊 & Restart",
      path: "somsak/1",
      actions: [{
        type: "DECREMENT",
        payload: {key: "RED_PILLS_TAKEN", by: 1}
      }]
    }]
  }
}

const users = [{
  client: 1
}, {
  name: "Game Moderator",
  avatar: "/images/icon/listening.svg",
}, {
  name: "Somsak Jeamteerasakul",
  avatar: "https://scontent.fbkk1-2.fna.fbcdn.net/v/t1.0-1/12063386_889937894392824_5154552084527806469_n.jpg?oh=e8d5ecececfce77f8f29b7551987a8f4&oe=58B03653"
}, {
  name: "Chara Dreemurr",
  avatar: "https://s-media-cache-ak0.pinimg.com/originals/7c/81/25/7c8125ae80c45fa1e7d3e7c9a3042480.jpg"
}]

const Undertale = {
  "undertale/1": {
    messages: [{
      user: 1,
      text: ["Hello, humans!"]
    }, {
      user: 1,
      type: "image",
      image: "http://static.zerochan.net/Chara.(Undertale).full.2034908.jpg",
      text: "I am Chara Dreemurr"
    }],
    choices: [{
      text: "Fuck you nigga!",
      path: "undertale/2"
    }]
  },
  "undertale/2": {
    messages: [{
      user: 1,
      text: ["What the fsck", "Who are u dude"]
    }]
  }
}

const UTCharacter = [{
  client: 1
}, {
  name: "Chara Dreemurr",
  avatar: "https://s-media-cache-ak0.pinimg.com/originals/7c/81/25/7c8125ae80c45fa1e7d3e7c9a3042480.jpg"
}]

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render = () => (
    <Grid style={{marginTop: "2em"}} c>
      <ChatStage stage={Undertale} users={UTCharacter} />
    </Grid>
  )

}

export default withStyles(s)(Home)

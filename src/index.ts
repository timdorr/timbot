import { config } from 'dotenv-flow'
config()

import Turntable from 'turntable-api'

const timsUserId = process.env.TT_TIMS_USERID as string

const tt = new Turntable({
  userId: process.env.TT_USERID as string,
  userAuth: process.env.TT_AUTH as string,
  roomId: process.env.TT_ROOMID as string,

  debug: true
})

tt.on('newsong', () => {
  setTimeout(() => tt.voteUp(), 2000)
})

setTimeout(() => tt.voteUp(), 1000)

tt.on('pmmed', message => {
  tt.fan(message.senderid)

  if (message.senderid == timsUserId) {
    message.text.charAt(0) == '!' ? eval(message.text.substring(1)) : tt.speak(message.text)
  } else {
    tt.pm('gotcha!', message.senderid)
  }
})

console.log('go!')

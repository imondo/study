const qrcodeTerminal = require('qrcode-terminal')
const { Wechaty, Contact, Message, log } = require('wechaty')
// const startSchedule = require('./schedule') // 定时任务 可以理解为一个function

const bot = new Wechaty()

let schedule

// 二维码登录
bot.on('scan', (qrcode, status) => {
  if (status === 0) {
    qrcodeTerminal.generate(qrcode, { small: true }) // show qrcode on console
  }
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode)
  ].join('')
  console.log(qrcodeImageUrl)
})
// 登录
bot.on('login', user => {
  console.log(`${user} 登录成功`)
  main()
})
// 登出
bot.on('logout', user => {
  console.log(`${user} 退出登录`)
  process.exit()
  if (schedule) schedule.stop()
})


// 接受到信息
bot.on('message', async msg => {
  if (msg.self()) return

  await msg.say(msg.text() || '我现在只能识别文字')
})

// 登录成功之后的事情
async function main() {
  const girl = await bot.Contact.find('对应微信名字')

  if (girl) {
    // await girl.say('想说的话')  // 通过这种办法，发送微信消息
    /**
     * 自定义开始聊天
    **/
    // schedule = startSchedule(girl) 
  }
}

bot
  .start()
  .then(() => console.log('微信机器人启动成功'))
  .catch(console.error)
var Peer = require('simple-peer')
var p = new Peer({ initiator: location.hash === '#1', trickle: false })
p.on('error', function (err) { console.log('error', err) })

var form = {
  signal: document.querySelector('form#signal'),
  chat: document.querySelector('form#chat')
}

p.on('signal', function (data) {
  var signal = Buffer(JSON.stringify(data)).toString('base64')
  form.signal.elements.outgoing.value = signal
})

form.signal.addEventListener('submit', function (ev) {
  ev.preventDefault()
  p.signal(JSON.parse(Buffer(form.signal.incoming.value,'base64')))
})

form.chat.addEventListener('submit', function (ev) {
  ev.preventDefault()
  var msg = form.chat.elements.msg.value
  form.chat.elements.msg.value = ''
  showMsg(msg)
  p.write(msg + '\n')
})

p.on('connect', function () {
  console.log('CONNECT')
  form.signal.style.display = 'none'
  form.chat.style.display = 'block'
})

var split = require('split2')
var through = require('through2')
var msgs = document.querySelector('#messages')
function showMsg (buf) {
  var div = document.createElement('div')
  div.textContent = buf.toString()
  msgs.insertBefore(div, msgs.childNodes[0])
}

p.pipe(split()).pipe(through(function (buf, enc, next) {
  showMsg(buf)
  next()
}))

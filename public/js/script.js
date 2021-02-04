const registerButton = document.getElementById('register')
const callButton = document.getElementById('call')
const unregisterButton = document.getElementById('unregister')
const answerButton = document.getElementById('answer')
const rejectButton = document.getElementById('reject')
const hangupButton = document.getElementById('hangup')

const ringtone = document.getElementById('ringtone')
const ringbacktone = document.getElementById('ringbacktone')

const server = 'wss://sip001.c1.pbx002.ofon.biz:5065/'

const localVideo = document.getElementById('localVideo')
const remoteVideo = document.getElementById('remoteVideo')

var simpleUser
var options
var realm

const delegate = {
  //  onCallCreated: makeCallCreatedCallback(simpleUser),
  onCallReceived: makeCallReceivedCallback(),
  onCallHangup: makeCallHangupCallback()
  //onRegistered: makeRegisteredCallback(simpleUser),
  //onUnregistered: makeUnregisteredCallback(simpleUser),
  //onServerConnect: makeServerConnectCallback(simpleUser),
  //onServerDisconnect: makeServerDisconnectCallback(simpleUser)
}

registerButton.addEventListener(
  'click',
  async function () {
    document.getElementById('login').hidden = true
    document.getElementById('callBox').hidden = false
    unregisterButton.hidden = false

    realm = document.getElementById('realm').value
    createSimpleUser()

    await simpleUser.connect()
    await simpleUser.register()
  },
  false
)

callButton.addEventListener(
  'click',
  async function () {
    document.getElementById('ongoingCall').classList.remove('hidden')
    document.getElementById('hangupBox').hidden = false
    document.getElementById('callBox').hidden = true
    unregisterButton.hidden = true
    let destination = document.getElementById('phonenumber').value
    await simpleUser.call('sip:' + destination + '@' + realm)

    document.getElementById('destinationNumber').hidden = false
    document.getElementById('callerNumber').hidden = true
    document.getElementById('destinationNumber').innerHTML = destination
  },
  false
)

hangupButton.addEventListener(
  'click',
  async function () {
    document.getElementById('ongoingCall').classList.add('hidden')
    document.getElementById('callBox').hidden = false
    unregisterButton.hidden = false
    await simpleUser.hangup()
  },
  false
)

unregisterButton.addEventListener(
  'click',
  async function () {
    document.getElementById('login').hidden = false
    document.getElementById('callBox').hidden = true
    unregisterButton.hidden = true

    if (!document.getElementById('ongoingCall').classList.contains('hidden')) {
      document.getElementById('ongoingCall').classList.add('hidden')
    }

    await simpleUser.unregister()
    await simpleUser.disconnect()
  },
  false
)

function createSimpleUser() {
  options = {
    media: {
      constraints: {
        audio: true,
        video: true
      },
      local: {
        video: localVideo
      },
      remote: {
        video: remoteVideo
      }
    },
    aor: 'sip:' + document.getElementById('username').value + '@' + realm,
    userAgentOptions: {
      authorizationUsername: document.getElementById('username').value,
      authorizationPassword: document.getElementById('password').value
    }
  }

  simpleUser = new SIP.Web.SimpleUser(server, options)

  simpleUser.delegate = delegate
}

//async function makeCallCreatedCallback(user) {}

function makeCallReceivedCallback() {
  return async function () {
    if (document.getElementById('ongoingCall').classList.contains('hidden')) {
      document.getElementById('ongoingCall').classList.remove('hidden')
    }
    document.getElementById('incomingBox').hidden = false

    startRingTone()

    answerButton.addEventListener('click', async function () {
      stopRingTone()
      await simpleUser.answer()
      document.getElementById('hangupBox').hidden = false
      document.getElementById('callBox').hidden = true
      document.getElementById('incomingBox').hidden = true
      unregisterButton.hidden = true

      document.getElementById('destinationNumber').hidden = true
      document.getElementById('callerNumber').hidden = false
      document.getElementById('callerNumber').innerHTML = destination
    })

    rejectButton.addEventListener('click', async function () {
      stopRingTone()
      await simpleUser.decline()
      document.getElementById('incomingBox').hidden = true
      if (
        !document.getElementById('ongoingCall').classList.contains('hidden')
      ) {
        document.getElementById('ongoingCall').classList.add('hidden')
      }
    })
  }
}

function makeCallHangupCallback() {
  return async function () {
    document.getElementById('callBox').hidden = false
    document.getElementById('hangupBox').hidden = true
    unregisterButton.hidden = false
    if (!document.getElementById('ongoingCall').classList.contains('hidden')) {
      document.getElementById('ongoingCall').classList.add('hidden')
    }
  }
}
//async function makeRegisteredCallback(user) {}
//async function makeUnregisteredCallback(user) {}
//async function makeServerConnectCallback(user) {}
//async function makeServerDisconnectCallback(user) {}

function startRingTone() {
  try {
    ringtone.play()
  } catch (error) {}
}

function stopRingTone() {
  try {
    ringtone.pause()
  } catch (error) {}
}

function startRingBackTone() {
  try {
    ringbacktone.play()
  } catch (error) {}
}

function stopRingBackTone() {
  try {
    ringbacktone.pause()
  } catch (error) {}
}

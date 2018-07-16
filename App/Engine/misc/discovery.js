const EventEmitter = require('EventEmitter');
const utils = require('./utils.js');
const { firebaseInstance } = require('./../firebaseWrapper.js')
const common = require('./../../common.js');

class Discovery extends EventEmitter {
  constructor(aUserId, aPublicKey, aPrivateKey) {
    if (!aUserId || !aPublicKey || !aPrivateKey) {
      throw('ERROR(discovery.js): Unable to create object from provided arguments.')
    }

    super()

    this.myUserId = aUserId
    this.publicKey = aPublicKey
    this.privateKey = aPrivateKey
  }

  // TODO: create a class from EventEmitter that defines this method so we don't
  //       copy-pasta it everywhere.
  //
  // Convert node 'on' method to react 'addListener' method for RN EventEmitter
  on = (eventTypeStr, listenerFn, context) => {
    this.addListener(eventTypeStr, listenerFn, context);
  }

  async _handleInvitation(snapshot) {
    if (snapshot && snapshot.val()) {
      const theirPublicKey = snapshot.key
      try {
        const stringifiedCipherObj = snapshot.val()
        const cipherObj = JSON.parse(stringifiedCipherObj)
        const theirUserId = await utils.decrypt(this.privateKey, cipherObj, true)
        this.emit('new-invitation', theirPublicKey, theirUserId)
      } catch (err) {
        console.log(`ERROR(discovery.js::_handleInvitation): ${err}`)
      }
    }
  }

  async clearInvitation(theirPublicKey) {
    if (!theirPublicKey) {
      throw(`ERROR(discovery.js::clearInvitation): theirPublicKey unspecified.`)
    }

    try {
      const discoveryPath = `${common.getDbDiscoveryPath(this.publicKey)}/${theirPublicKey}`
      const discoveryRef = firebaseInstance.getFirebaseRef(discoveryPath)
      const result = await discoveryRef.remove()
    } catch (err) {
      console.log(`ERROR(discovery.js::clearInvitation): ${err}`)
    }
  }

  monitorInvitations() {
    const discoveryPath = `${common.getDbDiscoveryPath(this.publicKey)}`
    const discoveryRef = firebaseInstance.getFirebaseRef(discoveryPath)

    discoveryRef.on('child_added', (snapshot) => this._handleInvitation(snapshot))
  }

  // Updates the shared discovery structure with an invite if needed.
  // Shared discovery structure:
  //   ud/<their pk>/discovery/<our pk>
  //                                   blob: <enc id>
  //
  //   - If key <our pk> exists, nothing to do / no work.
  //   - If the key doesn't exist, we haven't connected to this person before or
  //     they deleted our thread and we need to send again.
  //
  async inviteContact(theirPublicKey) {
    if (!theirPublicKey) {
      throw(`ERROR(discovery.js::inviteContact): theirPublicKey unspecified.`)
    }

    try {
      const discoveryPath = `${common.getDbDiscoveryPath(theirPublicKey)}/${this.publicKey}`
      const discoveryRef = firebaseInstance.getFirebaseRef(discoveryPath)

      // If there is no existing invitation, then invite the specified contact:
      const snapshot = await discoveryRef.once('value')
      if (!snapshot || !snapshot.val()) {
        const encUserId = await utils.encrypt(theirPublicKey, this.myUserId)
        const encUserIdStr = JSON.stringify(encUserId)
        const result = await discoveryRef.set(encUserIdStr)
      }
    } catch (err) {
      console.log(`ERROR(discovery.js::inviteContact): ${err}`)
    }
  }
}

module.exports = { Discovery };

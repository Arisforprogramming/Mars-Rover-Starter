const Message = require("./message");
const Command = require("./command");
class Rover {
  // Write code here!
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;

  }
  //(name,[commands])
  receiveMessage(message) {
    //“response returned by receiveMessage includes two results if two commands are sent in the message 
    let results = message.commands

    if (results === 'STATUS_CHECK') {

    }
    console.log(this)
    return {
      message: message,
      results: [{
        roverStatus: this
          // position: this.position,
          // mode: this.mode,
          // generatorWatts: this.generatorWatts,
        
      }]
    }
  }
}

module.exports = Rover;
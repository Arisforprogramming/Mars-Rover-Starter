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
    // console.log("wannan see ", message)
    // if (results === 'STATUS_CHECK') {

    // }

    return {
      message: message,
      results: results
    }
  }
}

module.exports = Rover;
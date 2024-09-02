class Rover {
  constructor(position, mode, generatorWatts) {
     this.position = position,
        this.mode = 'NORMAL',
        this.generatorWatts = 110
  }
  // Write code here!
  /*receiveMessage(message){
  console.log(message);
    let setMessage = {
        message : message.name,
        results : []
    }
    //This is where I need to process the message command
    return setMessage;
  }*/
  //taking command from  messages parameter suppose to return status depends on command types and the value is 
  receiveMessage(Message) {
     let newCommands = []

     for (let i = 0; i < Message.commands.length; i++) {
        // 
        if (Message.commands[i].commandType === 'STATUS_CHECK') {

           newCommands.push({
              completed: true,
              roverStatus: {
                 mode: this.mode,
                 generatorWatts: this.generatorWatts,
                 position: this.position
              }
           })

        } else if (Message.commands[i].commandType === 'MOVE') {
           // if the  mode is low power then push the false to the new commands
           if (this.mode === 'LOW_POWER') {
              newCommands.push({
                 completed: false
              })
           } else {
              this.position = Message.commands[i].value
              newCommands.push({
                 completed: true
              })
           }

        } else {
           if (Message.commands[i].value === 'LOW_POWER') {

              this.mode = 'LOW_POWER'

           } else {

              this.mode = 'NORMAL'
           }
           newCommands.push({
              completed: true
           })

        }

     }

     return {
        message: Message.name,
        results: newCommands
     }
  }

}



module.exports = Rover;
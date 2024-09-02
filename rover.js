class Rover {
  constructor(position, mode, generatorWatts) {
     this.position = position,
        this.mode = 'NORMAL',
        this.generatorWatts = 110
  }
  
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
    // handles Move command type if it is low power then rover can't be move to new position otherwise successed to be proceeded 
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
         //handles mode changed command all commands that didn't get covered from earlier condiation 
         //if commands value == to lower power using .notation to access each index of the commands value if rover mod is lowpower then rover mode is set to lowpower 
         //otherwise mode set to normal and the rover status completed set to true got push to new command array as well
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
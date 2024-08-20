const Message = require("./message");

class Rover {
  // Write code here!
 constructor(position){
   this.position = position,
   this.mode = 'NORMAL',
   this.generatorWatts = 110
 };
 
  receiveMessage(message){
  //    console.log(message)
    
    let theMessage = {
      message : message.name,
      result : []
    }


    for (let i = 0; i < message.commands.length; i++) {

      if (message.commands[i].commandType === 'STATUS_CHECK'){

        theMessage.result.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})

      } else if (message.commands[i].commandType === 'MOVE'){
       
         if (this.mode === 'LOW_POWER'){
           theMessage.result.push({completed: false})
         } else {
           this.position = message.commands[i].value
           theMessage.result.push({completed: true})
         }

     } else {
        if (message.commands[i].value === 'LOW_POWER'){

         this.mode = 'LOW_POWER'

       } else {

         this.mode = 'NORMAL'
       }
       theMessage.result.push({completed: true})

      }

    }

    // return { message: message.name, results: resultArray }

    return theMessage;
  }

}













module.exports = Rover;
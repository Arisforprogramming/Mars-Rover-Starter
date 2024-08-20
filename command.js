class Command {
   constructor(commandType, value) {
  
     if (!commandType) {
      console.log(commandType,value)
      throw Error("Command type required.");

    
     }
     this.commandType = commandType;
     this.value = value;

   }
 
 }
 
 module.exports = Command;
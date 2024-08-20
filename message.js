class Message {
   // Write code here!
   constructor(name,commands) { // let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]; commands obj
      this.name = name ;
       if(!name){
         throw Error("Messege is not defined")
       }
       this.commands = commands
   }
   
};


module.exports = Message;
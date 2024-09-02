const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover("position")
    expect(rover.position).toEqual("position"),
    expect(rover.mode).toEqual('NORMAL'),
    expect(rover.generatorWatts).toEqual(110)
  })
   // test 8 
   it("response returned by receiveMessage contains name of message", function(){
     
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        //console.log(commands[0])
        let message = new Message('Test message with two commands', commands);
      //console.log(message)
        let rover = new Rover(98382); // Passes 98382 as the rover's position.
        let response = rover.receiveMessage(message);
       // console.log(response)
        expect(response.message).toEqual(message.name)
  })

  //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands)
    let rover = new Rover(10)
    let response = rover.receiveMessage(message)

    expect(response.results.length).toEqual(2)
  })
//push obj to another obj link https://www.geeksforgeeks.org/how-to-push-an-object-into-another-object-in-javascript/
  //test 10
  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands)
    let rover = new Rover(10)

  

    let response = rover.receiveMessage(message)

    expect(response.results[0]).toEqual({
       completed: true, 
       roverStatus: {
       mode: "NORMAL", 
       generatorWatts: 110,
       position: 10
    }  
    }) 
    })
  
  //test 11
  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands)
    let rover = new Rover(10)
    let response = rover.receiveMessage(message)

    expect(response.results[0].completed).toEqual(true)
    expect(rover.mode).toEqual('LOW_POWER')
  })

  //test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
   let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 20)]
    let message = new Message('Test message', commands)
    let rover = new Rover(10)
    let response = rover.receiveMessage(message)
  //console.log(response);
    expect(response.results[1].completed).toEqual(false)
    
  })

  //test 13
  it("responds with position for move command", function() { 
    let commands = [new Command('MOVE')];
    let message = new Message('Test message', commands)
    let rover = new Rover(50)
    expect(rover.position).toEqual(50)

    
  })
  
});

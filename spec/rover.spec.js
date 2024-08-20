const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function(){
     let rover = new Rover("position")
     expect(rover.position).toEqual("position"),
     expect(rover.mode).toEqual('NORMAL'),
     expect(rover.generatorWatts).toEqual(110)
  });
  // test 8 
 test("response returned by receiveMessage contains the name of the message", function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(12345);    // Passes 12345 as the rover's position.
  let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);
 });

 //test 9 

 test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
//   console.log("test access commands",commands);
//   console.log("test acess first index",commands[0]);
  let message = new Message('Test message with two commands', commands);
  //console.log("test message", message)
  let rover = new Rover(12345);    // Passes 12345 as the rover's position.
  let response = rover.receiveMessage(message);
//   console.log("respond test", response);
//   console.log(response.results.length);
    expect(response.results.length).toBe(2);


 }); 

 // test 10
 test("responds correctly to the status check command", function() {
   let commands = [new Command('STATUS_CHECK')];
   let message = new Message('Test message', commands)
   let rover = new Rover(25)
   let response = rover.receiveMessage(message)
 
   expect(response.results[0]).toEqual({
     completed: true,
     roverStatus: {
       mode: "NORMAL",
       generatorWatts: 110,
       position: 25
     }
   })
 })
 
// Test 11
// "responds correctly to mode change command".
// The test should check the completed property and rover mode for accuracy.
// The rover has two modes that can be passed a values to a mode change command, 'LOW_POWER' and 'NORMAL'.
it("responds correctly to mode change command", function() {
   let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
   let message = new Message('Test message', commands)
   let rover = new Rover(10)
   let response = rover.receiveMessage(message)

   expect(response.results[0].completed).toEqual(true)
   expect(rover.mode).toEqual('LOW_POWER')
 })

// Test 12
// The test should check the completed property for accuracy and confirm that the rover position did not change.
// Use the Rover Modes table for guidance on how to handle move commands in different modes.
it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
   // let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 20)]
   //  let message = new Message('Test message', commands)
    let rover = new Rover(10)
    let response = rover.receiveMessage(message)
    expect(response.results[0].completed).toEqual(false)
    
  })

// Test 13
// "responds with position for move command".

// A MOVE command will update the rover's position with the position value in the command.

it("responds with position for move command", function() { 
   let commands = [new Command('MOVE')];
   let message = new Message('Test message', commands)
   let rover = new Rover(50)
   expect(rover.position).toEqual(50)
 })

 });


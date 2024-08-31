const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function () {
    const rover = new Rover("position");
    expect(rover.position).toEqual("position");
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });
  //Test 8
  test("response returned by receiveMessage contains the name of the message", function () {
    let testWord = "I gonna test this";
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let message = new Message("Test message", commands);
    let rover = new Rover(10); // Passes 10 as the rover's position.
    //calls the receiveMessage method of the Rover class and captures the result (or response)
    let response = rover.receiveMessage(testWord);
    expect(response.message).toBe(testWord);
  });
  //Test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let rover = new Rover(10); // Passes 10 as the rover's position.
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK")
    ];
    let message = new Message("Test message", commands);

    let response = rover.receiveMessage(message);
    console.log('This is message',message)
    //console.log('This is response',response)
    expect(response.results.length).toBe(2);
    console.log("test")

    //expect(response.results[0].completed).toBeTrue(); //checked if first commands complete 
  });
  //Test 10
  test("responds correctly to the status check command", function () {
    let rover = new Rover(10); // Passes 10 as the rover's position.
     console.log('This is Rover',rover)
    //console.log('This is Newer Rover',rover)
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("Test message", commands);
    let response = rover.receiveMessage(message);
    console.log('This is new response',response)
    let mode = 'NORMAL';
    let generatorWatts = 110;
    let position = 10;
    let testObj = {mode: mode,generatorWatts :generatorWatts,position :position};
    expect(response.results[0].roverStatus.position).toEqal(position);
    expect(response.results[0].roverStatus.mode).toBe(mode);
    expect(response.results[0].roverStatus.generatorWatts).toBe(generatorWatts);
    expect(response.results[0].toMatchObject(testObj));
  });
  //Test 11
  test("responds correctly to the mode change command", function () {
    let rover = new Rover(10); // Passes 10 as the rover's position.
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message("Test message", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER')
  });

});
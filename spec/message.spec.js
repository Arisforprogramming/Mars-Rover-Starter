const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function () {
    //test 4

    test("throws error if a name is NOT passed into the constructor as the first parameter", function () {
        expect(function () {
            new Message();
        }).toThrow(new Error("Messege is not defined"));
    });
    // test 5

    test("“constructor sets name”.", function () {
        let message = new Message("Name")
        expect(message.name).toEqual("Name");
    });

    //test 6 
    test("contains a commands array passed into the constructor as 2nd argument", function () {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message = new Message('NAME', commands)
        expect(Array.isArray(message.commands)).toEqual(true)
    });

})
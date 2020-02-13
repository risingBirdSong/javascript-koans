describe("About Functions", function() {
  it("should declare functions", function() {
    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function() {
    var message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      var message = "Inner";
      return message;
    }

    expect(getMessage()).toBe("Outer");
    expect(overrideMessage()).toBe("Inner");
    //Oh intersting! I learned something here. My first hunch was Outer, but i see, it wasn't overiding, setting up a brand new var in a different scope;
    expect(message).toBe("Outer");
  });

  it("should have lexical scoping", function() {
    var variable = "top-level";
    function parentfunction() {
      var variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    //right, makes sense, its returning the nearest scope, which is local, if this inner assignment, it goes up scope and returns "top-level", good stuff
    expect(parentfunction()).toBe("local");
  });

  it("should use lexical scoping to synthesise functions", function() {
    function makeMysteryFunction(makerValue) {
      var newFunction = function doMysteriousThing(param) {
        return makerValue + param;
      };
      return newFunction;
    }

    var mysteryFunction3 = makeMysteryFunction(3);
    console.log(
      " i exptect a function to be return that has 3 in closure (i believe closure is the correct term here) of makerValue, this is like a currying pattern right?",
      mysteryFunction3
    );
    console.log(
      "right, you can't see the closure, can't see it's value, which we know to be 3"
    );
    console.log(
      "is there a way to see this value, we just see the variable name 'makerValue'. of course when invoked with another arg, we'll see the final return... but what about this intermediate step? "
    );
    console.log(
      "when its invoked with another number, well see the value in closure added to the number that mysteryFunction3 is invoked with -->",
      mysteryFunction3(3)
    );
    var mysteryFunction5 = makeMysteryFunction(5);

    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23);
  });

  it("should allow extra function arguments", function() {
    function returnFirstArg(firstArg) {
      return firstArg;
    }
    console.log(returnFirstArg("first", "second", "third"));
    expect(returnFirstArg("first", "second", "third")).toBe("first");

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    expect(returnSecondArg("only give first arg")).toBe(undefined);

    function returnAllArgs() {
      var argsArray = [];
      for (var i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(",");
    }

    expect(returnAllArgs("first", "second", "third")).toBe(
      "first,second,third"
    );
  });

  it("should pass functions as values", function() {
    var appendRules = function(name) {
      return name + " rules!";
    };

    var appendDoubleRules = function(name) {
      return name + " totally rules!";
    };

    var praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise("John")).toBe("John rules!");

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe("Mary totally rules!");
  });
});

import { CodeGenerator } from "@babel/generator";

var _; //globals

const findLargetsPrime = (numberArr, composite) => {};

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const isPrime = num => {
  if (num == 1) {
    return false;
  }
  if (num === 2) {
    return true;
  }
  let ranged = Array(num)
    .fill(1)
    .map((val, idx) => idx + 1);

  let trimmed = ranged.slice(1, ranged.length - 1);
  console.log("trimmed", trimmed);
  //dont want number 1 or num itself
  let isPrime = true;
  trimmed.forEach(val => {
    if (num % val === 0) {
      isPrime = false;
    }
  });
  return isPrime;
};

//("should find the largest prime factor of a composite number"

const largestPrimeFactorOfComp = num => {
  let possibilites = [2, 3];
  let factors = [];
  while (isPrime(num) === false) {
    // pseudo CodeGenerator, ran outta time,
    // if its even keep divide like this
    // num = num / possibilites[0];
    // if its not even shift the possibilites.
    // continue with
    // num = num / possibilites[0];
    // factors.push(possibilites[0]);
  }

  return {
    factors: factors,
    num
  };
};

console.log("factors", largestPrimeFactorOfComp(18));

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function() {
    products = [
      {
        name: "Sonoma",
        ingredients: ["artichoke", "sundried tomatoes", "mushrooms"],
        containsNuts: false
      },
      {
        name: "Pizza Primavera",
        ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"],
        containsNuts: false
      },
      {
        name: "South Of The Border",
        ingredients: ["black beans", "jalapenos", "mushrooms"],
        containsNuts: false
      },
      {
        name: "Blue Moon",
        ingredients: ["blue cheese", "garlic", "walnuts"],
        containsNuts: true
      },
      {
        name: "Taste Of Athens",
        ingredients: ["spinach", "kalamata olives", "sesame seeds"],
        containsNuts: true
      }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function() {
    var i,
      j,
      hasMushrooms,
      productsICanEat = [];

    for (i = 0; i < products.length; i += 1) {
      if (products[i].containsNuts === false) {
        hasMushrooms = false;
        for (j = 0; j < products[i].ingredients.length; j += 1) {
          if (products[i].ingredients[j] === "mushrooms") {
            hasMushrooms = true;
          }
        }
        if (!hasMushrooms) productsICanEat.push(products[i]);
      }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function() {
    var productsICanEat = [];

    console.log("products", products);

    let noNuts = products.filter(pizza => {
      return pizza.containsNuts === false;
    });

    console.log(noNuts);

    productsICanEat = noNuts.filter(pizza => {
      let mushrooms = pizza.ingredients.some(ing => ing == "mushrooms");
      console.log("------------------------");
      console.log(mushrooms);
      if (mushrooms) {
        return false;
      } else return true;
    });
    console.log("products i can eat", productsICanEat);

    /* solve using filter() & all() / any() */

    expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function() {
    var sum = 0;
    for (var i = 1; i < 1000; i += 1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    console.log("sum", sum);
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function() {
    var sum = Array(1000)
      .fill(1)
      .map((val, idx) => (val = idx))
      .reduce((acc, val) => {
        if (val % 3 == 0 || val % 5 == 0) {
          acc += val;
          return acc;
        } else return acc;
      });
    console.log("array fill", sum);

    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
  it("should count the ingredient occurrence (imperative)", function() {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i += 1) {
      for (j = 0; j < products[i].ingredients.length; j += 1) {
        ingredientCount[products[i].ingredients[j]] =
          (ingredientCount[products[i].ingredients[j]] || 0) + 1;
      }
    }

    expect(ingredientCount["mushrooms"]).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function() {
    var ingredientCount = { "{ingredient name}": 0 };

    console.log(products);
    /* chain() together map(), flatten() and reduce() */

    let reduced = products.reduce((acc, val) => {
      acc += val.ingredients.reduce((innerAcc, innerVal) => {
        if (innerVal === "mushrooms") {
          innerAcc += 1;
          return innerAcc;
        } else return innerAcc;
      }, 0);
      return acc;
    }, 0);
    ingredientCount["mushrooms"] = reduced;

    expect(ingredientCount["mushrooms"]).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
});

// it("should find the largest prime factor of a composite number", function() {
//   it("should find the largest palindrome made from the product of two 3 digit numbers", function() {});

//   it("should find the smallest number divisible by each of the numbers 1 to 20", function() {});

//   it("should find the difference between the sum of the squares and the square of the sums", function() {});

//   it("should find the 10001st prime", function() {});
// });

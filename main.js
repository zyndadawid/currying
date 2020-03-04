//currying
const multiply = (a, b) => a * b;
const curriedMultiply = a => b => a * b;
const curriedMultiplyByFive = curriedMultiply(5);

const result = curriedMultiplyByFive(4);

//console.log(result);

//Partial application compared to currying

//Regular fun with 3 param
const multiply3 = (a, b, c) => a * b * c;

//Curring with 3 param
const curriedMultiply3 = a => b => c => a * b * c;
curriedMultiply3(3)(4)(5);

//Partial application with 3 param a=5 b=4 c=10 || null instade of this
const partialMultiplyByA = multiply3.bind(null, 5);
const result2 = partialMultiplyByA(4, 10);

//console.log(result2);

/*
//Memoizetion and caching
We use cache to store the result of fun. This way we don't have to run it every time, we just grab the answer from cache

The problem is that we are poluting a global scope with cache, but if we move cache inside fun memoizedAddTo80() it's gonna empty the cache everytime
Solution one step below
*/

//let cache = {};
function memoizedAddTo80(n) {
  if (n in cache) {
    return cache[n];
  } else {
    console.log("long time");
    cache[n] = n + 80;
    return cache[n];
  }
}

//console.log("1", memoizedAddTo80(5)); //long time , 85
//console.log("2", memoizedAddTo80(7)); //long time, 87
//console.log("3", memoizedAddTo80(5)); // 85 (read from cache)

/* Mindblowing use of CLOSURES
Not only we prevent cache from poluting global scope but also now it's hidden from users!!! It's safe and sound inside the local scope of fun memoizedAddTo80()
*/
function memoizedAddTo80() {
  let cache = {};
  return function(n) {
    if (n in cache) {
      return cache[n];
    } else {
      console.log("long time");
      cache[n] = n + 80;
      return cache[n];
    }
  };
}

const memoized = memoizedAddTo80();

console.log("1", memoized(5)); //long time , 85
console.log("2", memoized(7)); //long time, 87
console.log("1", memoized(5)); //long time , 85

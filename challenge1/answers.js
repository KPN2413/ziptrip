// Ziptrrip Developer Assignment - Challenge 1 JavaScript answers

// Question 1: Pattern
// Assumption: Based on sample 1, 21, 321, 4321, row i prints numbers from i down to 1.

function printPatternWay1(n) {
  for (let i = 1; i <= n; i++) {
    let row = '';
    for (let j = i; j >= 1; j--) row += j;
    console.log(row);
  }
}

function printPatternWay2(n) {
  Array.from({ length: n }, (_, i) => i + 1).forEach(i => {
    console.log(Array.from({ length: i }, (_, index) => i - index).join(''));
  });
}

printPatternWay1(5);
printPatternWay2(5);

// Question 2: Reverse characters in a string

function reverseStringWay1(str) {
  return str.split('').reverse().join('');
}

function reverseStringWay2(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) reversed += str[i];
  return reversed;
}

console.log(reverseStringWay1('Bhaskara'));
console.log(reverseStringWay2('Bhaskara'));

// Question 3: Remove duplicates from an array

const numbers = [1, 2, 3, 6, 4, 3, 7, 4, 2, 6, 8, 2, 5, 9, 0, 1];

function uniqueValuesWay1(arr) {
  return [...new Set(arr)];
}

function uniqueValuesWay2(arr) {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

console.log(uniqueValuesWay1(numbers));
console.log(uniqueValuesWay2(numbers));

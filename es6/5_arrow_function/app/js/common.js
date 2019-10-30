// Common function
function greet(name = 'Jack', age = 21) {
    // const name = name || 'Jack'; (es5 default value)

    return `Hello ${name}, your age is ${age}!`;
}

console.log('Common function:', greet());
///Common function

// Arrow function
const greetArrow = (name = 'Jack', age = 21) => `Hello ${name}, your age is ${age}!`;

console.log('Arrow function:', greetArrow());
///Arrow function

// 1) Using name
const FUNC = () => { };

// 2) Default syntax
(a, b) => {
    const sum = a + b;
    return sum;
}

// 3) One argument
// a => {
(a) => {
    const sum = a + 1;
    return sum;
}

// 4) No Arguments
() => {
    const sum = 1 + 2;
    return sum;
}

// 5) If one line, don't need `return`
// a => a * 2;
(a) => a * 2;
(a, b) => a * b;

// 6) Object literal
() => ({ a: 2 });

// 7) IIFE
(() => { null })();
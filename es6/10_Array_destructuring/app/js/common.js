// Task class has been created.
class Task {
    constructor(title = '') {
        // 2 properties have been created in class `Task`.
        this.title = title;
        this.isCompleted = false;
    }

    // `completed` method has been created in `Task` class.
    completed() {
        this.isCompleted = true;
    }
}

// `SubTask` class has been created.
class SubTask extends Task {
    constructor(title) {
        // `super` keyword calls parent constructor if it is not defined.
        // `super` keyword allows to call parent constructor.
        super(title);
    }

    completed() {
        // `super` keyword allows to call parent methods.
        super.completed();
        console.log(`Task ${this.title} is completed!`);
    }
}

// 2 instances of Task and SubTask objects have been created.
const task = new Task('Learn ReactJS');
const subTask = new SubTask('Learn ES6');


// complete methods have been called from `task` and `subTask` objects.
task.completed();
subTask.completed();

console.log(task, subTask);

// Class declaration
class Declarated {
    constructor(isDeclarated = true) {
        this.isDeclarated = isDeclarated;
    }
};

// Class expression
const Extended = class extends Declarated {
    constructor(isExtended) {
        super(false);

        this.isExtended = isExtended
    }
};

const declarated = new Declarated(true);
const extended = new Extended(true);

console.log(declarated, extended);

// Additional information
// Function declaration
console.log('`sum` function has been called before declaration.', sumDeclaration(1, 2));
function sumDeclaration(a, b) {
    return a + b;
}

// Function expression
// Сode above will throw the `Uncaught TypeError: sumExpression is not a function` error
// console.log('`sum1` function expression has been called before expression.');
// console.log(sumExpression(1, 2));
const sumExpression = function (a, b) {
    return a + b;
}
console.log('`sum1` function expression has been called after expression.');

// Name Function Expression
const functionExpression = function nameFunction() {

}

// `factorial` function has been declared
// function factorial(n) {
//     return n ? n * factorial(n - 1) : 1;
// }
// const n = 5;
// console.log(`factorial n=${n}`, factorial(n));

// factorial method reference has been assigned to newFactorial constant
// const newFactorial = factorial;
// console.log(`newFactorial n=${n}`, newFactorial(n));

// `factorial` reference has been removed
// factorial = null;
// Code belove will throw `newFactorial` is not a function because `factorial`
// - reference has been removed.
// console.log(`newFactorial n=${n}`, newFactorial(n));

let newFactorial = function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}

const n = 5;
const secondNewFactorial = newFactorial;
newFactorial = null;
console.log(`secondNewFactorial n=${n}`, secondNewFactorial(n));
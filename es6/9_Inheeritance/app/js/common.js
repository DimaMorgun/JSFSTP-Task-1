// The class is defined using es6 syntax.
class Task {
    // Class should contains no more than one constructor.
    constructor(title = '', isCompleted = true) {
        // Class propertiest 
        // Properties are created using this value.
        this.title = title;
        this._isCompleted = isCompleted;
        // Static property is called using class name.
        Task.counter += 1;
    };

    // Static methods are created using static keyword.
    static getInfo() {
        return `Task class contains ${Task.counter} instances.`;
    };

    completed() {
        this.isCompleted = true;
    };

    // There is getter for `isCompleted` property.
    get isCompleted() {
        return this._isCompleted ? 'Task is completed.' : 'Task is not completed.';
    }

    // There is setter for `isCompleted` property.
    set isCompleted(status) {
        this._isCompleted = status;
    }
};
// Static properties defines outside of class.
Task.counter = 0;

const task1 = new Task('Learn ES6', false);
const task2 = new Task('Learn ReactJS', false);
console.log(Task.counter);

console.log(task1);
console.log(task2);

task2.completed();

console.log(task2);
const name = 'Jack';
const sex = 'male';
const age = 20;

// es5
const personES5 = {
    name: name,
    sex: sex,
    age: age,
    greet: function () {
        console.log('Hello. My name is ' + this.name + '. I\'m a ' + this.sex + '. I\'m ' + this.age + ' years old.');
    },
};

// es6
const personES6 = {
    name,
    sex,
    age,
    greet() {
        console.log(`Hello. My name is ${this.name}. I'm a ${this.sex}. I'm ${this.age} years old.`);
    }
}

// Write preson objects in console.
console.log(personES5, personES6);

// Greet functions were called using dots.
personES5.greet();
personES6.greet();

// Greet functions were called using keys.
personES5['greet']();
personES6['greet']();

// Value from `name` property was got using nameVariable with defined property name.
const nameVariable = 'name';
console.log(personES5[nameVariable]);
console.log(personES6[nameVariable]);

const ageVariable = 'age';
const sexVariable = 'sex';
let person = {
    // Person's object properties was defined dynamically
    [nameVariable]: 'Dmytro',
    [ageVariable]: 21,
    [sexVariable]: 'male',
    flag: true,
    // Getter for concat function was created.
    get concat() {
        return this.name + this.age + this.sex;
    },
    // Setter for concat function was created.
    set concat(flag) {
        this.flag = flag;
    },
}

// Concat property with getter was defined using es5 syntax.
// Object.defineProperty(person, 'concat', {
//     get: function () {
//         return this.name + this.age + this.sex;
//     }
// });

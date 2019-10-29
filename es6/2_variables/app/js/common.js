console.log('before', first);// (Undefined) <- var variable hoisting
// console.log('before', second); (Uncaught ReferenceError)
// console.log('before', third); (Uncaught ReferenceError)

if (true) {
    var first = 'ES5';
    let second = 'ES6';
    const third = 'ES6';

    console.log('inside', first);
    console.log('inside', second);
    console.log('inside', third);
}

console.log('after', first);
// console.log('after', second); (Uncaught ReferenceError)
// console.log('after', third); (Uncaught ReferenceError)



// Task
// var buttons = document.querySelectorAll('button');
// for (var i = 0; i < buttons.length; i++) {
//     var button = buttons[i];
//     button.innerText = i;
//     button.onclick = function () {
//         console.log(i);
//     }
// }
///Task

// Solution with Closures (es5: deprecated)
// var buttons = document.querySelectorAll('button');
// for (var i = 0; i < buttons.length; i++) {
//     var button = buttons[i];
//     button.innerText = i;
//     button.onclick = function (x) {
//         return function () {
//             console.log(x);
//         }
//     }(i)
// }
///Solution with Closures (es5: deprecated)

// Solution with let or const (es6)
// const buttons = document.querySelectorAll('button');
// for (let i = 0; i < buttons.length; i++) {
//     const button = buttons[i];
//     button.innerText = i;
//     button.onclick = function () {
//         console.log(i);
//     }
// }
///Solution with let or const (es6)

// Solution with es6 and bubbling
const buttonContainer = document.querySelector('div');
const buttons = document.querySelectorAll('button');

for (var i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.innerText = i;
}

buttonContainer.addEventListener('click', (event) => {
    console.log('Button container onclick event listener.');
    alert(`target: ${event.target.innerText}`);
    alert(`this: ${event.currentTarget.innerText}`);
    event.stopPropagation();
}, true);
// When third parameter sets to true ({capture: true}), we'll use capturing with 3 phases. Uncomment event.stopPropagation() to see changes in behaviour.
// When rhird parameter sets to false (default value) ({capture: false}), we'll use bubbling. Comment event.stipPropagation() to see changes in behaviour.

let newDiv = document.createElement("button");
let newContent = document.createTextNode(i++);
newDiv.appendChild(newContent);
buttonContainer.appendChild(newDiv);
///Solution with es6 and bubbling

const ARR = [0, 1, 2, 3, 4, 5]
ARR.push(6);
console.log(ARR);

const OBJ = {
    es: 'ES5'
};
OBJ.es = 'ES6';
console.log(OBJ);
function greet(name) {
    console.log('Hello ' + name + ', without tempalte string!');
    console.log(`Hello ${name}, with template string!`);
}
greet('Dmytro');

const URL = '/api';
const path1 = 'test1';
const path2 = 'test2';
const path3 = 'test3';

const API_URL_WITHOUT_TEMPLATE_STRING = URL + '/' + path1 + '/' + path3 + '/' + path3;
const API_URL_WITH_TEMPLATE_STRING = `${URL}/${path1}/${path2}/${path3}`;
console.log(API_URL_WITHOUT_TEMPLATE_STRING);
console.log(API_URL_WITH_TEMPLATE_STRING);

function emailMessage(name, mail, status) {
    return `
    Hello dear ${name},
    Your email ${mail} has been ${status}!
    Thank you for subscription!
    `;
}
console.log(emailMessage('Dmytro', 'dimamorgun97@gmail.com', 'sent'));

// Tagging
const name = 'Jack';
console.log(toUppercase`Hello ${name}!`);
function toUppercase(litArr, value) {
    console.log(litArr, value);
    return `${litArr[0]}${value.toUpperCase()}${litArr[1]}`;
}
///Tagging

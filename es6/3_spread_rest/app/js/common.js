
// Arrays (Spread)
const spreadArrA = [0, 1, 2, 3, 4];
const spreadArrB = [5, 6, 7, 8, 9];

console.log('It does not work :(', [spreadArrA, spreadArrB]);

const newArray = [];
Array.prototype.push.apply(newArray, spreadArrA);
Array.prototype.push.apply(newArray, spreadArrB);
console.log('Hello arrays apply from es5 :', newArray);

console.log('Spread operation with arrays es6 :', [...spreadArrA, ...spreadArrB]);
///Arrays(Spread)

// Objects(Spread)
const spreadObjA = {
    a: 'default',
    b: 'value_from_a',
}
const spreadObjB = {
    a: 'value_from_b',
}

const newObj = Object.assign(spreadObjA, spreadObjB);
console.log('Hello object assign from es5 :', newObj);

console.log('Spread operation with objects es6 :', { ...spreadObjA, ...spreadObjB });
///Objects(Spread)

// Functions(Spread)
function sum(a, b, c, d) {
    return a + b + c + d;
}

console.log('Function call using es5 :', sum.apply(null, spreadArrA))

console.log('Function call using es6 :', sum(...spreadArrA));
///Functions(Spread)

// Functions(Rest)
function res(key, ...values) {
    console.log(key, values);
}

res('key', 1, 2, 3, 4, 5);
res('test', 1, '2', true, '4', { key: 5 });
res('Joke', ...[...spreadArrA, ...spreadArrB])
///Functions(Rest)
const names = ['Jack', 'Max', 'Eugene', 'Dmytro', 'Mary'];

// es5
// for (const index in names) {
//     console.log(names[index]);
// }

for (const name of names) {
    console.log(name);
}

// let is used in the specific block
// var i = 99999;
// function c() {
//     for (i = 0; i < 10; i++) {
//         console.log(i)
//     }
//     // console.log(i)
// }
// c()
// console.log("After loop", i)

// let a, b, rest;
// [a, b] = [10, 20];

// console.log(a);
// // Expected output: 10

// console.log(b);
// // Expected output: 20

// [a, b, rest] = [10, 20, 30, 40, 50];

// console.log(rest);

// var animals = [
//     { name: 'Shashank', species: 'Human' },
//     { name: 'Bruno', species: 'Dog' },
//     { name: 'pinku', species: 'Cat' },
//     { name: "Chinnu", species: 'Human' }
// ]

// var a = animals.filter(function (i) {
//     return i.species === 'Human'
// })

// for (var i = 0; i < animals.length; i++) {
//     if (animals[i].species === 'Human')
//         a.push(animals[i])
// }

// const Total = ({ parts }) => {
//     var sum = 0;
//     // Calculate the sum of exercises using the reduce method
//     sum = parts.reduce((a, b) => a + b.exercises, 0);
//     return <b>Total of {sum} exercises</b>;
// };

// for (var i = 0; i < animals.length; i++) {
//     a.push(animals[i].name)
// }

// var a = animals.map(function (i) {
//     // return i.name + " is a" + i.species
// })
// var a = animals.map(function (i) { return i.name + " is a" + i.species })
// var a = animals.map((i) => i.name + " is a" + i.species)

var amounts = [
    { amount: 250 },
    { amount: 350 },
    { amount: 500 },
    { amount: 650 }
]

// var totalAmount = 0
// for (var i = 0; i < amounts.length; i++) {
//     totalAmount += amounts[i].amount
// }

var totalAmount = amounts.reduce(function (sum, i) {
    console.log("hello ", sum, i)
    return sum + i.amount
}, 0)
console.log(totalAmount)

// import fs from 'fs'
// var fs = require('fs')
// var output = fs.readFileSync('data.txt', 'utf8')
//     .split("\n")
//     .map(line => line.split(','))
//     .reduce((cust, i) => {
//         cust[i[0]] = cust[i[0]] || []
//         cust[i[0]].push({
//             name: i[1],
//             price: i[2],
//             quantity: i[3]
//         })
//         return cust
//     }, {})

// console.log('output', output)
// // //Iterator
// //
// // function *test() {
// //   yield 1;
// //   yield 2;
// //   yield 3;
// //   yield 4;
// //   yield 5;
// // }
// //
// // var t = test()
// // console.log(t.next()) // { }
// // console.log(t.next()) // { value: 1, done: false }
// // console.log(t.next()) // { value: 2, done: false }
// // console.log(t.next()) // { value: 3, done: false }
// // console.log(t.next()) // { value: 4, done: false }
// // console.log(t.next()) // { value: 5, done: false }
// // console.log(t.next()) // { value: undefined, done: true }
//
//
// // Async
//
// function promiseFactory(val){
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=> {
//       resolve(val*2);
//     })
//   },1000);
// };
// function asyncFunc(url) {
//   return promiseFactory(url).then(data => {
//     tt.next(data)
//   })
// }
// function *test() {
//   let v1 = yield asyncFunc(2);
//   let v2 = yield asyncFunc(v1);
//   let v3 = yield asyncFunc(v2);
//   let res = yield asyncFunc(v3);
//   console.log(res);
// }
//
// // promiseFactory(2).
// //   then(res => {return promiseFactory(res)}).
// //   then(res => {return promiseFactory(res)}).
// //   then(res => {return promiseFactory(res)}).
// //   then(res =>console.log(res)).
// //   catch(err => console.log(err))
//
//
// var tt = test();
// tt.next()

// ## Provide an example of TypeScript inheritance, involving
// * A top-level interface to define the most basic behaviour and types
// * The constructor shorthand to automatically create properties
// * All of the Access Modifiers public, private and protected (and perhaps also
// readonly)
// * Abstract
// * Static (make a counter than counts the total number of instances)

interface

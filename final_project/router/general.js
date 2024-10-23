const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", async (req,res) => {
  //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
if(!req.body.username){
    return res.status(400).json({message: "Username not provided"});
}
if(!req.body.password){
    return res.status(400).json({message: "Password not provided"});
}
let userNames = users.map((user)=>{
    return user.username;
})
if(userNames.includes(req.body.username)){
    return res.status(403).json({message: "Username already exists"});
}
users.push({
    username: req.body.username,
    password: req.body.password
});

});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
  let promise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(JSON.stringify(books));
      },1000)
  })
  const response = await promise;
  return res.status(200).json(response);
//   return res.status(200).json(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(JSON.stringify(books[req.params.isbn]));
        }, 1000)
    })
    const response = await promise;
    return res.status(200).json(response);
    // return res.status(200).json(JSON.stringify(books[req.params.isbn]));
});
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
    // let searchResult = {};
    // for (const isbn in books) {
    //     if (books[isbn]["author"] == req.params.author) {
    //         searchResult[isbn] = { ...books[isbn] }
    //     }
    // }
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let searchResult = {};
            for (const isbn in books) {
                if (books[isbn]["author"] == req.params.author) {
                    searchResult[isbn] = { ...books[isbn] }
                }
            }
            resolve(searchResult);
        }, 1000)
    })
    const response = await promise;
    return res.status(200).json(response);
    // return res.status(200).json(JSON.stringify(searchResult));
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
    //   return res.status(300).json({message: "Yet to be implemented"});
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let searchResult = {};
            for (const isbn in books) {
                if (books[isbn]["title"] == req.params.title) {
                    searchResult[isbn] = { ...books[isbn] }
                }
            }
            resolve(searchResult);
        }, 1000)
    })
    const response = await promise;
    return res.status(200).json(response);
    // return res.status(200).json(JSON.stringify(searchResult));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
return res.status(200).json(JSON.stringify(books[req.params.isbn]["reviews"]));
});

module.exports.general = public_users;

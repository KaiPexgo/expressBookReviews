const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", async (req,res) => {
  //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });

});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  let promise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(books);
      },1000)
  })
  const response = await promise;
  return res.status(200).json(response);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books[req.params.isbn]);
        }, 1000)
    })
    const response = await promise;
    return res.status(200).json(response);
});
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
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
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
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
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
return res.status(200).json(JSON.stringify(books[req.params.isbn]["reviews"]));
});

module.exports.general = public_users;

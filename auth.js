const express = require('express');
const db = require('./db');
const mailer = require('./mailer');

const con = db.conn;

const router = express.Router();

router.post('/login', (req,res) => {
    try {
        if (req.body.username.length == 0 || req.body.password.length == 0) {
          throw "Invalid Fields";
        } else {
          let user = {
            username: req.body.username,
            password: req.body.password,
          };
          let query = 'SELECT * FROM users WHERE email = "' + user.username + '"';
          con.query(query, (error, result) => {
            if (error) {
              console.log(error);
              res.status(400).json({
                message: `Error : ${error}`,
              });
            } else {
              console.log(result);
              if (result.length > 0) {
                if (result[0].Password === user.password) {
                  res.status(201).json({
                    message: "Login Successful",
                    authToken: result[0].ID,
                  });
                } else {
                  res.status(401).json({
                    message: "Password incorrect",
                  });
                }
              } else {
                res.status(404).json({
                  message: "User not found",
                });
              }
            }
          });
        }
      } catch (e) {
        console.log(e);
        res.status(400).json({
          message: e.message,
        });
      }
})

router.post('/signUp', (req,res) => {
    try {
        if (req.body.username.length == 0 || req.body.password.length == 0 || req.body.email.length == 0) {
          throw "Invalid Fields";
        } else {
          let user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
          };
          let query = 'SELECT * FROM users WHERE email = "' + user.username + '"';
          con.query(query, (error, result) => {
            if (error) {
              console.log(error);
              res.status(400).json({
                message: `Error : ${error}`,
              });
            } else {
              if (result.length > 0) {
                res.status(201).json({
                  message: "User Exists. Login Instead",
                });
              } else {
                query =
                  'INSERT INTO users ( email , password ) VALUES ("' +
                  user.username +
                  '" , "' +
                  user.password +
                  '")';
                con.query(query, (errorSignUp, resultSignUp) => {
                  if (error) {
                    console.log(errorSignUp);
                    res.status(400).json({
                      message: `Error : ${errorSignUp}`,
                    });
                  } else {
                    console.log(resultSignUp);
                    mailer.mailUser(user.email)
                    res.status(201).json({
                      message: "User Added",
                      token: resultSignUp.insertId,
                    });
                  }
                });
              }
            }
          });
        }
      } catch (e) {
        console.log(e);
        res.status(400).json({
          message: e.message,
        });
      }
});

module.exports = {
    authRouter: router 
};
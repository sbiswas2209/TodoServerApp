const express = require('express')
const db = require('./db');

const router = express.Router();

const con = db.conn;

router.post('/all', (req,res) => {
    try {
        const id = req.body.id;
        console.log(id);
        let query = 'SELECT * FROM items WHERE user_id = "' + id + '"';
        con.query(query, (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({
              message: `Error : ${error}`,
            });
          } else {
            console.log(`Results : ${result}`);
            res.status(200).json({
              todos: result,
              status: "OK",
              code: 200,
            });
          }
        });
      } catch (e) {
        console.log(e);
        res.status(400).json({
          message: e.message,
        });
      }
})

router.post('/addItem', (req,res) => {
    try {
        if (req.body.title.length == 0 || req.body.content.length == 0) {
          throw "Invalid Fields";
        } else {
          let data = {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userId,
          };
    
          let query =
            'INSERT INTO items ( title , content , user_id ) VALUES ("' +
            data.title +
            '" , "' +
            data.content +
            '" , "' +
            data.userId +
            '")';
    
          con.query(query, (error, result) => {
            if (error) {
              console.log(error);
              res.status(400).json({
                message: `Error : ${error}`,
              });
            } else {
              console.log("Item Added");
              res.status(201).json({
                message: "Item Added",
              });
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

router.post('/deleteItem', (req,res) => {
    try {
        if (req.body.id.length === 0) {
          throw "Invalid Fields";
        } else {
          let query = `DELETE FROM items WHERE id = ${req.body.id}`;
          const id = req.body.userId;
          con.query(query, (err, result) => {
            if (err) {
              res.status(500).json({
                message: err,
              });
            } else {
              console.log("Deleted");
              query = 'SELECT * FROM items WHERE user_id = "' + id + '"';
              con.query(query, (error, resultFinal) => {
                if (error) {
                  console.log(error);
                  res.status(400).json({
                    message: `Error : ${error}`,
                  });
                } else {
                  res.status(200).json({
                    result: resultFinal,
                    message: "Item Deleted",
                  });
                }
              });
            }
          });
        }
      } catch (e) {
        res.status(400).json({
          message: e.message,
        });
      }
})

module.exports = {
    tasksRouter: router
}
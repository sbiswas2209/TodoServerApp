const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 5000;

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
});

con.connect((err) => {
    if(err) {
        console.log(err);
    }
    else{
        console.log('Connected!!!');
    }
})

app.post('/login', (req,res) => {
    try{
        if(req.body.username.length == 0 || req.body.password.length == 0){
            throw 'Invalid Fields';
        }
        else{
            let user = {
                username: req.body.username,
                password: req.body.password
            }
            let query = 'SELECT * FROM users WHERE email = "'+user.username+'"';
            con.query(query , (error , result) => {
                if(error) {
                    console.log(error);
                    res.status(400).json({
                        message: `Error : ${error}`
                    })
                }
                else{
                    console.log(result);
                    if(result.length > 0){
                        if(result[0].Password === user.password){
                            res.status(201).json({
                                message: 'Login Successful',
                                authToken: result[0].ID,
                            })
                        }
                        else{
                            res.status(401).json({
                                message: 'Password incorrect',
                            })
                        }
                    }
                    else{
                        res.status(404).json({
                            message: 'User not found',
                        })
                    }
                }
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            message: e.message,
        });
    }
})

app.post('/all', (req,res) => {
    try{
        const id = req.body.id;
        let query = 'SELECT * FROM items WHERE id = "'+id+'"';
            con.query(query , (error , result) => {
                if(error) {
                    console.log(error);
                    res.status(400).json({
                        message: `Error : ${error}`
                    })
                }
                else{
                    res.status(200).json({
                        todos: result,
                        status: 'OK',
                        code: 200
                    })
                }
            });
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            message: e.message,
        });
    }
})

app.post('/signUp', (req,res) => {
    try{
        if(req.body.username.length == 0 || req.body.password.length == 0){
            throw 'Invalid Fields';
        }
        else{
            let user = {
                username: req.body.username,
                password: req.body.password
            }
            let query = 'SELECT * FROM users WHERE email = "'+user.username+'"';
            con.query(query , (error , result) => {
                if(error) {
                    console.log(error);
                    res.status(400).json({
                        message: `Error : ${error}`
                    })
                }
                else{
                    if(result.length > 0){
                        res.status(201).json({
                            message: 'User Exists. Login Instead',
                        })
                    }
                    else{
                        query = 'INSERT INTO users ( email , password ) VALUES ("'+user.username+'" , "'+user.password+'")';
                        con.query(query , (errorSignUp , resultSignUp) => {
                        if(error) {
                            console.log(errorSignUp);
                            res.status(400).json({
                                message: `Error : ${errorSignUp}`
                            })
                        }
                        else{
                        console.log(resultSignUp);
                        res.status(201).json({
                            message: 'User Added',
                            token: resultSignUp.insertId
                        })
                    }
                    })
                    }
                }
            })
        }
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            message: e.message,
        });
    }
})

app.post('/addItem', (req,res) => {
    try{
        if(req.body.title.length == 0 || req.body.content.length == 0){
            throw 'Invalid Fields';
        }
        else{
            let data = {
                title: req.body.title,
                content: req.body.content
            }

            let query = 'INSERT INTO items ( title , content ) VALUES ("'+data.title+'" , "'+data.content+'")';

            con.query(query , (error , result) => {
                if(error) {
                    console.log(error);
                    res.status(400).json({
                        message: `Error : ${error}`
                    })
                }
                else{
                    console.log('Item Added');
                    res.status(201).json({
                        message: 'Item Added',
                    })
                }
            })

        }
    }
    catch(e){
        console.log(e);
        res.status(400).json({
            message: e.message,
        });
    }
})

app.delete('/deleteItem' , (req,res) => {
    try{
        if(req.body.title.length === 0){
            throw 'Invalid Fields'
        }
        else{
            let query = `DELETE * FROM items WHERE title = ${req.body.title}`;
            con.query(query , (err,result) => {
                if(err){
                    res.status(500).json({
                        message: err,
                    });
                }
                else{
                    console.log('Deleted');
                    res.status(200).json({
                        message: 'Item Deleted'
                    })
                }
            })
        }
    }
    catch(e){
        res.status(400).json({
            message: e.message
        })
    }
});

app.get('/', (req,res) => {
    res.status(200).json({
        message: `Server started on port ${port}`
    })
})



app.listen(port, (err) => {
    if(err) {
        console.log(err);
    }
    else{
        console.log(`Server started on port ${port}`);
    }
})
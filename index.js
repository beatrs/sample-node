// libraries
const express = require("express");
const app = express();
const cors = require("cors");
// import db.js
const pool = require("./db");

const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
// access client side data
app.use(express.json());

//react
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/test', (req, res) => {
    res.json({test: "hello world"});
})

//* ROUTES 

// create a todo

app.post("/todos", async(req, res) => {
    try {
        // get data from client side
        console.log(req.body);
        // destructure rq.body to get desc
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        // then send a response (so it doesn't get stuck at sending request forever)
        res.send(newTodo.rows[0]);


    } catch (err) {
        console.error(err.message);
        
    }
})

// get all todo's

app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query(
            "SELECT * FROM todo ORDER BY id"
        );

        res.json(allTodos.rows);
        
    } catch (err) {
        console.error(err.message);
        
    }
})

// get a todo
// * /:id -> replace id with specific param
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE id=$1", [id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// update a todo

app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE id = $2",
            [description, id]
        );
        
        res.json('Update success');
    } catch (err) {
        console.error(err.message);
    }
})

// delete a todo

app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);

        res.json('Delete success');
    } catch (err) {
        console.error(err.message);
    }
})

// server start
app.listen(PORT, () => {
    console.log("server has started on port 5000");
});
/*
SETUP
*/
var mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs361_lyp',
    password: '1250',
    database: 'cs361_lyp'
});

var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 4283;                 // Set a port number at the top so it's easy to change in the future

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Cors to read data
var cors = require('cors')
app.use(cors())

/*
ROUTES
*/


/*
GET ROUTES
*/
// Gets login data
app.get('/login', (req, res) => {
    const query = 'SELECT * FROM Logins';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

/*Get specific login email/password */
app.post('/signin', (req, res) => {
    const {email, password} = req.body
    const query = 'SELECT * FROM Logins WHERE email = ? AND password = ?';
    const results = [email,password]
    pool.query(query, results, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
            return;
        }

        res.json(results);
    });
});

// Gets weight data
app.get('/weight', (req, res) => {
    const query = 'SELECT * FROM Weights';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

// Gets calorie data
app.get('/calorie', (req, res) => {
    const query = 'SELECT * FROM Calories';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

// Gets calorie data
app.get('/exercise', (req, res) => {
    const query = 'SELECT * FROM Exercises';
    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});


/*
Post routes
*/
// Add a login
app.post("/login", (req, res) => {
    const { loginid, name, password, email, profilePic } = req.body;
    const q = `INSERT INTO Logins (loginID, name, password, email, profilePic) VALUES (?, ?, ?, ?, ?)`;
    const values = [loginid, name, password, email, profilePic];

    pool.query(q, values, (err) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        console.log('Login added successfully');
        res.status(200).json({ message: 'Login added successfully' });
    });
});


// Add a weight
app.post("/weight", (req, res) => {
    const {date, weight} = req.body;
    const q = `INSERT INTO Weights (date, weight) VALUES (?, ?)`;
    const values = [date, weight];

    pool.query(q, values, (err) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        console.log('Login added successfully');
        res.status(200).json({ message: 'Login added successfully' });
    });
});

// Add a food item
app.post("/calorie", (req, res) => {
    const {calorieID, name, calorie} = req.body;
    const q = `INSERT INTO Calories (calorieID, name, calorie) VALUES (?, ?, ?)`;
    const values = [calorieID, name, calorie];

    pool.query(q, values, (err) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        console.log('Food added successfully');
        res.status(200).json({ message: 'Food added successfully' });
    });
});

// Add a exercise item
app.post("/exercise", (req, res) => {
    const {exerciseID, name, burned} = req.body;
    const q = `INSERT INTO Exercises (exerciseID, name, burned) VALUES (?, ?, ?)`;
    const values = [exerciseID, name, burned];

    pool.query(q, values, (err) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        console.log('Exercise added successfully');
        res.status(200).json({ message: 'Exercise added successfully' });
    });
});

/*Delete Routes */
// Route to delete all entries from the table
app.delete('/delete-calories', (req, res) => {
    const sql = 'DELETE FROM Calories';
    pool.query(sql, (error) => {
      if (error) {
        res.status(500).send('Error deleting entries');
        return;
      }
      res.send('All entries deleted successfully');
    });
  });


app.delete("/delete-exercises", (req, res) => {
    const sql = 'DELETE FROM Exercises';
    pool.query(sql, (error) => {
        if (error) {
            res.status(500).send('Error deleting entries')
            return;
        }
        res.send('All entries deleted successfully');
    });
});

app.delete("/delete-weights", (req, res) => {
    const sql = 'DELETE FROM Weights';
    pool.query(sql, (error) => {
        if (error) {
            res.status(500).send('Error deleting entries')
            return;
        }
        res.send('All entries deleted successfully');
    });
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
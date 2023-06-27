const express = require('express');
const { Pool } = require('pg');
const PORT = 8080;
const app = express();
app.use(express.urlencoded({ extended: false }));
const pool = new Pool({
    user: 'liuke',
    host: 'localhost',
    database: 'liuke',
    password: '220701528',
    port: 5432,
})

app.post('/', async (req, res) => {
    pool.query('INSERT INTO students (student_id,name,age,gender) VALUES ($1,$2,$3,$4)', [req.body.student_id, req.body.name, req.body.age, req.body.gender]);
    res.status(201).send('Created user successfully');
});

app.get('/students', async (req, res) => {
    pool.query('SELECT * FROM students',
        (error, result) => {
            try {
                res.send(result.rows);
            } catch (error) {
                console.log(error);
            }
        });
});

app.get('/courses', async (req, res) => {
    await pool.query('SELECT * FROM courses LIMIT 2',
        (error, result) => {
            try {
                res.send(result.rows);
            } catch (error) {
                console.log(error);
            }
        });
});

const serverRun = () => {
    const server = app.listen(PORT, () => {
        console.log('I am running on port:8080');
    });

}
serverRun();
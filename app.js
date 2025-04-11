import express from 'express'
import { initializeDB, dbAll, dbRun } from './util/database.js';
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json())

app.get('/schedule', async (req, res) => {
    const rows = await dbAll('SELECT * FROM lessons')
    res.json(rows)
})

app.post('/schedule', async (req, res) => {
    const { day, ora1, ora2, ora3, ora4, ora5, ora6, ora7, ora8, ora9 } = req.body
    await dbRun(
        `INSERT INTO lessons (day, ora1, ora2, ora3, ora4, ora5, ora6, ora7, ora8, ora9)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [day, ora1, ora2, ora3, ora4, ora5, ora6, ora7, ora8, ora9]
    )
    res.sendStatus(200)
})

app.put('/schedule/:id', async (req, res) => {
    const { day, ora1, ora2, ora3, ora4, ora5, ora6, ora7, ora8, ora9 } = req.body
    await dbRun(
        `UPDATE lessons SET day=?, ora1=?, ora2=?, ora3=?, ora4=?, ora5=?, ora6=?, ora7=?, ora8=?, ora9=? WHERE id=?`,
        [day, ora1, ora2, ora3, ora4, ora5, ora6, ora7, ora8, ora9, req.params.id]
    )
    res.sendStatus(200)
})

async function startServer(){
    await initializeDB();
    app.listen(3000, () => {
        console.log("Server runs on port 3000")
    });
}

startServer();
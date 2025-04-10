import sqlite from 'sqlite3'

const db = new sqlite.Database('./data/database.sqlite')

export function dbAll(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.all(sql, params, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

export function dbGet(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.get(sql, params, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}

export function dbRun(sql, params = []){
    return new Promise((resolve, reject) =>{
        db.run(sql, params, function(err) {
            if(err) reject(err);
            else resolve();
        });
    });
}

export async function initializeDB(){
    await dbRun("DROP TABLE IF EXISTS lessons;");
    await dbRun("CREATE TABLE IF NOT EXISTS lessons (id INTEGER PRIMARY KEY AUTOINCREMENT, day STRING, ora1 STRING, ora2 STRING, ora3 STRING, ora4 STRING, ora5 STRING, ora6 STRING, ora7 STRING, ora8 STRING, ora9 STRING);")

    const lessons = [
        {day: 'Monday', ora1: 'Emelt Angol', ora2: 'Emelt Angol', ora3: 'Angol', ora4: 'Osztályfőnöki', ora5: 'Testnevelés', ora6: 'Testnevelés', ora7: 'Matematika', ora8: 'Érettségi felkészítő', ora9: '-'},
        {day: 'Tuesday', ora1: 'IKT(PHP)',  ora2: 'IKT(Java Script)', ora3: 'Német', ora4: 'IKT', ora5: 'Nyelvtan', ora6: 'Szakmai angol', ora7: 'Webprogramozás(CMS+Webdesign)', ora8: 'Asztali alkalmazások fejlesztés', ora9: 'Asztali alkalmazások fejlesztés'},
        {day: 'Wednesday', ora1: 'Asztali alkalmazások fejlesztés',  ora2: 'Matematika', ora3: 'Angol', ora4: 'Szakmai angol', ora5: 'Történelem', ora6: '-', ora7: '-', ora8: '-', ora9: '-'},
        {day: 'Thursday', ora1: 'Történelem',  ora2: 'Irodalom', ora3: 'Matematika', ora4: 'Szakmai angol', ora5: 'Német', ora6: 'Angol', ora7: '-', ora8: '-', ora9: '-'},
        {day: 'Friday', ora1: 'Állampolgársági ismeretek',  ora2: 'Történelem', ora3: 'Irodalom', ora4: 'Webprogramozás', ora5: 'Testnevelés', ora6: 'Angol', ora7: 'Asztali alkalmazások fejlesztése', ora8: '-', ora9: '-'}
    ]

    for(const lesson of lessons){
        await dbRun("INSERT INTO lessons (day, ora1, ora2, ora3, ora4, ora5, ora6, ora7, ora8, ora9) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [lesson.day, lesson.ora1, lesson.ora2, lesson.ora3, lesson.ora4, lesson.ora5, lesson.ora6, lesson.ora7, lesson.ora8, lesson.ora9]);
    }
}
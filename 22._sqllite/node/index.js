import db from "./database/connection.js";

db.exec(`CREATE TABLE IF NOT EXISTS movies (title, year, score)`);

db.exec(`INSERT INTO movies VALUES (?,?,?)`, ["The Awakening", 2011, 6.3]);

db.exec(
  `INSERT INTO movies (title, year, score) VALUES 
(?, ?, ?),
(?, ?, ?)`,
  ["Monthy Python and the Holy Grail", 1975, 9.5],
  ["The Life of Brian", 1979, 8.5]
);

const movies = await db.all(`SELECT * FROM movies`);
console.log(movies);

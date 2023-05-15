import sqlite3

connection = sqlite3.connect('database.db')

cursor = connection.cursor()

res = cursor.execute('SELECT * FROM movies;')
print(res.fetchall())
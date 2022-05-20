import express, { Request, Response } from 'express';
import { Client } from 'pg'

const app = express();
const port = 3000;

const client = new Client({
  user: 'postgres',
  host: 'gdb',
  database: 'database_postgres',
  password: 'postgres',
  port: 5432,
})

client.connect(function(err) {
  if (err) throw err;
});

app.get('/person/insert', async (req: Request, res: Response) => {
  await client.query('create table person (id int primary key not null, nome varchar)')
  await client.query(`insert into person VALUES (1, 'RONALDO')`)
  await client.query(`insert into person VALUES (2, 'RUTILDE')`)
  return res.json({ message: 'Processo concluído!' })
})

app.get('/', async (req: Request, res: Response) => {
  const { rows } = await client.query('SELECT * FROM person');
  return res.json(rows)
})

app.listen(port, () => {
  console.log('Server started in port '+port)
})

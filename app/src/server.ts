import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'OK' })
})

app.listen(port, () => {
  console.log('Server started in port '+port)
})

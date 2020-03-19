import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.get('', async (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(PORT, () => console.log(`Express server is running on port ${PORT}`));

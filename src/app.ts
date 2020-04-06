import express, {NextFunction, Request, Response} from 'express';
import todoRoutes from './routes/todo'
import {json} from 'body-parser';

const app = express();

app.use(json());

app.use('/todos', todoRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({message: error.message});
});

app.listen(3000);

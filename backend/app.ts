import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { router } from './router';
import { context } from './context/context';
import express from 'express';
import cors from 'cors';
import { env } from './env';

const { PORT } = env;

const app = express();

app.use(cors());
app.use(
	'/trpc',
	createExpressMiddleware({
		router,
		createContext: context,
	}),
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

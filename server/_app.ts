import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { apiRoutes } from './routes/api';

const app = new Hono();
const port = 3000;

app.use('/api/*', cors());
export const appRouter = app.route('/api', apiRoutes);

serve({ fetch: app.fetch, port });

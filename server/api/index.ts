import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';
import { apiRoutes } from '../routes/api';

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');
app.use('/*', cors());
app.route('/', apiRoutes);
app.get('/', (c) => c.text('Hello! This is a Hono server.'));

export default handle(app);

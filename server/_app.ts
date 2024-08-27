import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { apiRoutes } from './routes/api';

export const initApp = () => {
  const app = new Hono().basePath('/api');
  app.use('/*', cors());
  app.route('/', apiRoutes);
  app.get('/', (c) => c.text('Hello! This is a Hono server.'));
  return app;
};

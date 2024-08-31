import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { apiRoutes } from './routes/api';
import { logger } from 'hono/logger';

export const initApp = () => {
  const app = new Hono();
  app.use('/*', cors());
  app.use('/*', logger());
  app.route('/api', apiRoutes);
  app.get('/', (c) => c.text('Hello! This is a Hono server.'));
  return app;
};

const app = initApp();

export default app;

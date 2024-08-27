import { serve } from '@hono/node-server';
import { initApp } from './_app';

const app = initApp();

serve({ fetch: app.fetch, port: 3000 });

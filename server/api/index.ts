import { handle } from 'hono/vercel';
import { initApp } from '../_app';

/** This file is needed to deploy on vercel */

export const config = { runtime: 'edge' };

const app = initApp();

export default handle(app);

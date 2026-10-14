import { handle } from './worker.mjs';
Deno.serve((req: Request) => handle(req, Deno.env));

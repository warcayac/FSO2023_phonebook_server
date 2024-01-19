import Elysia from "elysia";
import cors from "@elysiajs/cors";
import staticPlugin from "@elysiajs/static";

import personsRoutes from "./plugins/paths/persons/personsRoutes";
import { getInfo } from "./handlers";
import { httpResponse } from "./utils/constants";
import wlogger  from './plugins/wac-logger/index';


const app = new Elysia()
  .use(cors({methods: '*'}))  
  .use(wlogger(true))
  .use(staticPlugin({ assets: 'dist', prefix: '/' }))
  .group('/api', app => app.use(personsRoutes))
  .get('/info', getInfo)
  .all('*', () => httpResponse[404]('Path name not found'))
  .listen(3001)
;

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);

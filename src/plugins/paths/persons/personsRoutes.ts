import Elysia from "elysia";

import { addOnePerson, deleteOnePerson, getOnePerson, getPersons } from "./handlers";
import { bodyPersonParser, paramIdParser } from './hooks'
import { jsonResponse } from "../../../utils/constants";


const personsRoutes = new Elysia({prefix: '/persons'})
  // onError maneja cualquier EXCEPCIÓN no gestionada ocurrida en algún handler
  .onError(({code, set:{status}}) => jsonResponse(code, Number(status) ?? -1))
  .get('/', getPersons)
  .get('/:id', ({params: {id}}) => getOnePerson(id), paramIdParser)
  .delete('/:id', ({params: {id}}) => deleteOnePerson(id), paramIdParser)
  .post('/', ({body}) => addOnePerson(body), bodyPersonParser)
;

export default personsRoutes;
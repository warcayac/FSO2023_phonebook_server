import Elysia from "elysia";

import * as h from "./handlers";
import * as k from './hooks'
import errorHandler from "../../../@warcayac/utils-elysia";


const personsRoutes = new Elysia({prefix: '/persons'})
  .onError(({error, set}) => errorHandler(error, set))
  .get('/', h.getPersons)
  .get('/:id', ({params: {id}}) => h.getOnePerson(id), k.paramIdParser)
  .delete('/:id', ({params: {id}}) => h.deleteOnePerson(id), k.paramIdParser)
  .post('/', ({body}) => h.addOnePerson(body), k.bodyPersonParser)
  .put(
    '/:id', 
    ({body, params: {id}}) => h.updateOnePersonNumber(id, body.number), 
    k.idAndBodyPersonParser,
  )
;

export default personsRoutes;
import { Person, TPerson } from "../../../models/mongodb/personsSchema";
import { httpResponse } from "../../../@warcayac/const-elysia";


 /* ------------------------------------------------------------------------------------------ */
 export async function getPersons() {
  try {
    return httpResponse[200]({data: await Person.find()})
  } catch (error) {
    return httpResponse.INTERNAL_ERROR();
  }
}

 /* ------------------------------------------------------------------------------------------ */
 export async function getOnePerson(id: string) {
  const result = await Person.findById(id);
  
  return result !== null
    ? httpResponse[200]({data: [result]})
    : httpResponse.NOT_FOUND()
  ;
}

 /* ------------------------------------------------------------------------------------------ */
 export async function deleteOnePerson(id: string) {
  const response = await Person.findByIdAndDelete(id);
  
  return response !== null
    ? httpResponse.SUCCESS()
    : httpResponse.NOT_FOUND()
  ;
}

 /* ------------------------------------------------------------------------------------------ */
 export async function addOnePerson(body: TPerson) {
  body.name = body.name.trim();
  const name = body.name.toLowerCase();
  const person = await Person
    .findOne({ name })
    .collation({locale:'en', strength: 2})
    .exec()
  ;
  
  if (person !== null) {
    return httpResponse[400]('Name must be unique')
  }

  const newPerson = new Person(body);
  
  // these lines are innecesary because the schema already has a validator and the error is handled by the hook
  // const error = newPerson.validateSync();
  // if (error !== null && error.errors.number) return httpResponse.BAD_REQUEST(error.errors.number.message);

  const response = await newPerson.save();
  
  return httpResponse[200]({data: [response]});
}

 /* ------------------------------------------------------------------------------------------ */
 export async function updateOnePersonNumber(id: string, number: string) {
  const response = await Person.findByIdAndUpdate(
    id, 
    {number}, 
    {new: true, runValidators: true}
  );

  return response !== null
    ? httpResponse.OK({data: [response]})
    : httpResponse.NOT_FOUND()
  ;
}
import persons from "../../../data/db";
import { httpResponse } from "../../../utils/constants";
import { TPerson } from "../../../utils/types";


const _person = (id: number) => persons.find(n => n.id === id);
const _personIdx = (id: number) => persons.findIndex(n => n.id === id);

function generateNewId() {
  if (persons.length === 0) return 0;

  const genId = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  const idList = persons.map<number>(e => e.id!);
  
  let newId : number;
  do {
    newId = genId();
  } while (idList.some(e => e === newId))

  return newId;
}

export function getPersons() {
  return httpResponse[200]({data: persons})
}

export function getOnePerson(id: string) {
  const result = _person(Number(id));
  
  return result 
    ? httpResponse[200]({data: [result]})
    : httpResponse.NOT_FOUND()
  ;
}

export function deleteOnePerson(id: string) {
  const index = _personIdx(Number(id));
  
  if (index >= 0) {
    persons.splice(index, 1);
    return httpResponse[200]({updatedAt: new Date().toUTCString()});
  }

  return httpResponse.NOT_FOUND()
}

export function addOnePerson(body: TPerson) {
  body.name = body.name.trim();
  
  if (persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())) {
    return httpResponse[400]('Name must be unique')
  }

  const newPerson : TPerson = {...body, id: generateNewId()};
  const currentTime = new Date().toUTCString();
  persons.push(newPerson);
  
  return httpResponse[200]({createdAt: currentTime, data: [newPerson]});
}
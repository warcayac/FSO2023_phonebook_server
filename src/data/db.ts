import { TPersonList } from '../utils/types';


const file = Bun.file('./src/data/persons.json');
let persons = await file.json<TPersonList>();


export default persons;
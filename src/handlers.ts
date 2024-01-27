import { Person } from "./models/mongodb/personsSchema";
import { httpResponse } from "./@warcayac/const-elysia";


export async function getInfo() {
  const currentTime = new Date();
  const count = await Person.countDocuments();

  return httpResponse[200]({
    message: `Phonebook has info of ${count} people`,
    updatedAt: currentTime.toUTCString(),
  });
}

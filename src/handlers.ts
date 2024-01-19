import persons from "./data/db";
import { httpResponse } from "./utils/constants";


export function getInfo() {
  const currentTime = new Date();

  return httpResponse[200]({
    message: `Phonebook has info ${persons.length} people`,
    updatedAt: currentTime.toUTCString(),
  });
}

import { TJMap } from "./types";


export const contentType = {
  JSON : { "Content-Type": "application/json" },
  HTML : { "Content-Type": "text/html" },
  TEXT : { "Content-Type": "text/plain" },
}

export function jsonResponse(message: string, code: number = 200, other?: TJMap) {
  return Response.json({message, status: code, ...other}, {status: code});
}

export const httpResponse = {
  200 : (other?: TJMap) => jsonResponse('Successful', 200, other),
  400 : (message: string = 'Bad Request') => jsonResponse(message, 400),
  404 : (message: string = 'Not Found') => jsonResponse(message, 404),
  NOT_FOUND : () => jsonResponse('Not Found', 404),
  BAD_REQUEST : () => jsonResponse('Bad Request', 400),
}

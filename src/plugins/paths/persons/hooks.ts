import { t } from "elysia";
import { TJMap } from "../../../utils/types";
import { httpResponse } from "../../../utils/constants";


export const paramIdParser = {
  params: t.Object({
    id: t.String({ 
      pattern: /^\d+$/.source, 
      maxLength: 5,
    })
  }),
  error: () => httpResponse.BAD_REQUEST(),
}

export const bodyPersonParser = {
  body: t.Object({
    name: t.String(),
    number: t.String(),
    id: t.Optional(t.Number())
  }),
  error: (details: TJMap) => httpResponse[400](JSON.parse(details.error.message)['message'])
}
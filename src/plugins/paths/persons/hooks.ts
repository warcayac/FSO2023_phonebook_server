import { t } from "elysia";

import { errorMsg, parsers } from "../../../@warcayac/const-elysia";


const numberFormat = t.String({pattern: /^\d{2,3}-\d{3,}$/.source, error: 'Number malformatted'})

/* ------------------------------------------------------------------------------------------ */
 export const paramIdParser = parsers.paramObjectId

 /* ------------------------------------------------------------------------------------------ */
 export const bodyPersonParser = {
  body: t.Object(
    {
      name: t.String(),
      number: numberFormat,
    },
    {
      error: errorMsg.MISSING_PROPERTY
    }
  ),
}

 /* ------------------------------------------------------------------------------------------ */
 export const idAndBodyPersonParser = {
  ...parsers.paramObjectId,
  body: t.Object(
    {
      number: numberFormat,
      name: t.Optional(t.String()),
      id: t.Optional(t.String()),
    },
    {
      error: errorMsg.MISSING_PROPERTY
    }
  ),
}

 /* ------------------------------------------------------------------------------------------ */

import * as mongoose from 'mongoose';


const personsSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, minlength: 3},
    number: {
      type: String, 
      required: [true, 'Number is required'], 
      minlength: 8, 
      // match: /^\d{2,3}-\d{3,}$/,
      validate: {
        validator: (v: string) => /^\d{2,3}-\d{3,}$/.test(v),
        message: (props: any) => `${props.value} is not a valid phone number!`
      }
    },
  },
  {
    collection: 'persons',
    strictQuery: 'throw',
    strict: true,
    toJSON: {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
    }
  }
);

export type TPerson = mongoose.InferSchemaType<typeof personsSchema>;
export const Person = mongoose.model('Person', personsSchema);

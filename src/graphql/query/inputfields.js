import { gql } from "@apollo/client";

export const GET_INPUT_FIELDS = gql`
  query  getInputFields {
    input_fields(order_by: { created_at: asc }){
      id
      name
      question
    }
  }
`;
import { gql } from "@apollo/client";

export const CREATE_INPUT_FIELD = gql`
  mutation createInputFiled(
    $name: String
    $question: String
  ) {
    insert_input_fields_one(
      object: {
        name: $name
        question: $question
      }
    ) {
      id
      name
      question
      created_at
    }
  }
`;

export const UPDATE_INPUT_FIELD_BY_ID = gql`
  mutation updateInputField(
    $id: uuid!
    $name: String
    $question: String
  ) {
    update_input_fields_by_pk(
      pk_columns: { id: $id }
      _set: {
        id: $id
        name: $name
        question: $question
      }
    ) {
      id
      name
      question
    }
  }
`;

export const DELETE_INPUT_FIELD_BY_ID = gql`
  mutation deleteInputField($id: uuid!) {
    delete_input_fields_by_pk(id: $id) {
      id
      name
      question
    }
  }
`;
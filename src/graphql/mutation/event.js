import { gql } from "@apollo/client";

export const UPDATE_EVENT_BY_NAME = gql`
  mutation updateEvent(
    $name: String
    $company: String
    $description: String
  ) {
    update_event_by_pk(
      pk_columns: { name: $name }
      _set: {
        name: $name
        company: $company
        description: $description
      }
    ) {
      name
      company
      description
    }
  }
`;
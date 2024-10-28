import { gql } from "@apollo/client";

export const CREATE_THEME = gql`
  mutation createTheme(
    $name: String
  ) {
    insert_event_themes_one(
      object: {
        name: $name
      }
    ) {
      id
      name
      created_at
    }
  }
`;

export const DELETE_THEME = gql`
  mutation deleteTheme($id: uuid!) {
    delete_event_themes_by_pk(id: $id) {
      id
      name
      created_at
    }
  }
`;
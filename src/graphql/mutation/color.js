import { gql } from "@apollo/client";

export const UPDATE_COLOR_BY_ID = gql`
  mutation updateColor(
    $id: uuid!
    $name: String
    $value: String
  ) {
    update_colors_by_pk(
      pk_columns: { id: $id }
      _set: {
        id: $id
        name: $name
        value: $value
      }
    ) {
      id
      name
      value
    }
  }
`;
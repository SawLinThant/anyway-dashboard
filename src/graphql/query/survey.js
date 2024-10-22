import { gql } from "@apollo/client";

export const GET_DATA = gql`
  query getCards {
    survey_data (order_by: { created_at: desc }){
      id
      name
      phone
      theme
      created_at
    }
  }
`;

export const GET_SURVEY_DATA_BY_ID = gql`
   query getSurveyDataById($id: uuid!) {
    survey_data(where: { id: { _eq: $id } }) {
      id
      name
      phone
      theme
      aboutus
      created_at
    }
  }
`

export const GET_DATA_FROM_SEARCH = gql`
  query getCards($name: String, $phone: String) {
   survey_data(
      where: {
        _or: [
          { name: { _ilike: $name } }
          { name: { _is_null: true } }
        ]
      }
      order_by: { created_at: desc }
    ) {
      id
      name
      phone
      theme
      aboutus
      created_at
    }
  }
`;
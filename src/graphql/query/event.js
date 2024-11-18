import { gql } from "@apollo/client";

export const GET_EVENT_BY_NAME = gql`
   query getEventByName($name: String!) {
    event(where: { name: { _eq: $name } }) {
      name
      company
      description
    }
  }
`
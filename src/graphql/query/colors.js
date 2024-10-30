import { gql } from "@apollo/client";

export const GET_COLORS = gql`
  query  getColors {
    colors(order_by: { created_at: asc }){
      id
      name
      value
    }
  }
`;
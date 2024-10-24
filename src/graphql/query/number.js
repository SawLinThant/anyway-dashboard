import { gql } from "@apollo/client";

export const GET_NUMBERS = gql`
  query  getNumbers {
    luckydraw_numbers(order_by: { created_at: desc }){
      phone
      number
      created_at
    }
  }
`;

export const GET_NUMBER_FROM_SEARCH = gql`
  query getNumbers($phone: String) {
   luckydraw_numbers(
      where: {
        _or: [
          { phone: { _ilike: $phone } }
          { phone: { _is_null: true } }
        ]
      }
      order_by: { created_at: desc }
    ) {
      phone
      number
      created_at
    }
  }
`;
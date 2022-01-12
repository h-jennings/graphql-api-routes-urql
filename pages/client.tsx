import type { NextPage } from 'next';
import { WithUrqlProps } from 'next-urql';
import React from 'react';
import { gql, useQuery } from 'urql';
import { withPokemonGraphQL } from '../graphql/urql/urql';

const QUERY = gql`
  {
    pokemons(limit: 50) {
      name
    }
  }
`;

// Fetching data from the client via api route
const Client: NextPage<WithUrqlProps> = () => {
  const [result] = useQuery({ query: QUERY });
  const { data } = result;
  React.useEffect(() => void console.log(data), [data]);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default withPokemonGraphQL(Client, false, true);

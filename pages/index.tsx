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

// Urql is handling SSR for us (the default)
const Home: NextPage<WithUrqlProps> = () => {
  const [result] = useQuery({ query: QUERY });
  const { data } = result;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default withPokemonGraphQL(Home);

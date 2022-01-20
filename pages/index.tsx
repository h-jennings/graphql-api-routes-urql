import type { NextPage } from 'next';
import { WithUrqlProps } from 'next-urql';
import React from 'react';
import { useQuery } from 'urql';
import { GetNamesDocument } from '../graphql/generated/types.generated';
import { withPokemonGraphQL } from '../graphql/urql/urql';

// Urql is handling SSR for us (the default)
const Home: NextPage<WithUrqlProps> = () => {
  const [result] = useQuery({ query: GetNamesDocument });
  const { data } = result;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default withPokemonGraphQL(Home);

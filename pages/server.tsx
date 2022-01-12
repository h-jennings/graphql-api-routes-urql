import type { NextPage } from 'next';
import { initUrqlClient, WithUrqlProps } from 'next-urql';
import React from 'react';
import {
  cacheExchange,
  dedupExchange,
  fetchExchange,
  gql,
  ssrExchange,
  useQuery,
} from 'urql';
import { withPokemonGraphQL } from '../graphql/urql/urql';

const QUERY = gql`
  {
    pokemons(limit: 50) {
      id
      name
    }
  }
`;

const Server: NextPage<WithUrqlProps> = () => {
  const [result] = useQuery({ query: QUERY });
  const { data } = result;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const getServerSideProps = async () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: 'https://trygql.formidable.dev/graphql/basic-pokedex',
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(QUERY).toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withPokemonGraphQL(Server, false, false);

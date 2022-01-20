import type { NextPage } from 'next';
import { initUrqlClient, WithUrqlProps } from 'next-urql';
import React from 'react';
import {
  cacheExchange,
  dedupExchange,
  fetchExchange,
  ssrExchange,
  useQuery,
} from 'urql';
import { GetNamesDocument } from '../graphql/generated/types.generated';
import { withPokemonGraphQL } from '../graphql/urql/urql';

const Static: NextPage<WithUrqlProps> = () => {
  const [result] = useQuery({ query: GetNamesDocument });
  const { data } = result;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const getStaticProps = async () => {
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
  await client?.query(GetNamesDocument).toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

export default withPokemonGraphQL(Static, false, false);

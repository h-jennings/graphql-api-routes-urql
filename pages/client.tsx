import type { NextPage } from 'next';
import { WithUrqlProps } from 'next-urql';
import React from 'react';
import { useQuery } from 'urql';
import { GetNamesDocument } from '../graphql/generated/types.generated';
import { withPokemonGraphQL } from '../graphql/urql/urql';

// Fetching data from the client via api route
const Client: NextPage<WithUrqlProps> = () => {
  const [result] = useQuery({ query: GetNamesDocument });
  const { data } = result;
  React.useEffect(() => void console.log(data), [data]);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default withPokemonGraphQL(Client, false, true);

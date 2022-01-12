import { NextPage } from 'next';
import { withUrqlClient, WithUrqlProps } from 'next-urql';

const isSSR = typeof window === 'undefined';

/**
 * @param page - Pass a Next page here
 * @param ssr - whether or not urql to automatically handle SSR for us (uses `getInitialProps`)
 * @param suspense - we need to opt out of Suspense for SSR
 */
export const withPokemonGraphQL = (
  page: NextPage<WithUrqlProps>,
  ssr = true,
  suspense = true
) => {
  return withUrqlClient(
    () => ({
      // We'll use an api route on the client
      url: isSSR
        ? 'https://trygql.formidable.dev/graphql/basic-pokedex'
        : 'api/graphql',
      fetchOptions: {
        headers: {
          // ctx is only available on the initial server-side render and not on client side navigation
          Authorization: isSSR ? `Bearer ${process.env.TOKEN}` : '',
        },
      },
    }),
    { ssr, neverSuspend: !suspense }
  )(page);
};

import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient } from 'graphql-request';

const graphQLClient = new GraphQLClient(
  'https://trygql.formidable.dev/graphql/basic-pokedex',
  {
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`,
    },
  }
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, variables } = req.body;
  try {
    const data = await graphQLClient.rawRequest(query, variables);
    res.status(200).send(data);
  } catch (error) {
    console.error('error:', error);
    res.status(200).send('Server Error');
  }
};

export default handler;

module.exports = {
  projects: {
    app: {
      schema: ['./schema.generated.graphql'],
      documents: ['./graphql/queries/**/*.{ts,graphql}'],
      extensions: {
        endpoints: {
          default: {
            url: 'https://trygql.formidable.dev/graphql/basic-pokedex',
          },
        },
      },
    },
  },
};

module.exports = factory

function factory({ importSchema }) {
  const exports = getSchema

  function getSchema() {
    return importSchema('app/graphql/gql/schema.graphql')
  }

  return exports
}

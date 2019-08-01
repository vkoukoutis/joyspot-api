module.exports = factory

function factory() {
  const exports = {
    Mutation: { games },
    Query: {}
  }
  async function games(parent, { name }, ctx) {
    if (!name) {
      throw Error('Please fill all fields.')
    }

    const { data } = await ctx.util
      .Api('games', {
        data: `search "${name}"; fields *; fields cover.*; fields genres.*;`
      })
      .get()

    if (data.length === 0) throw Error(`No games found for ${name}`)

    const games = data.map(game => ({
      name: game.name,
      summary: game.summary,
      cover: game.cover.url.replace('//', ''),
      genres: game.genres && game.genres.map(genre => genre.name),
      rating: Math.round(game.rating) || 0
    }))

    await ctx.model.product.insertMany(games)

    return games
  }

  return exports
}

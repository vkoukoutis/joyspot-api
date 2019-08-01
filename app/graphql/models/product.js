module.exports = factory

function factory({ model, Schema }) {
  const exports = Product

  function Product() {
    return model('products', productSchema)
  }

  const productSchema = new Schema({
    name: {
      type: String,
      trim: true,
      minLength: 1
    },
    summary: {
      type: String
    },
    cover: {
      type: String
    },
    rating: {
      type: Number
    },
    genres: [
      {
        type: String
      }
    ]
  })

  return exports
}

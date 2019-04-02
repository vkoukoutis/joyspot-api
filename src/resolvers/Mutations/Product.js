export const Product = {
  async searchProduct(parent, { title, number = 50, offset = 0 }, ctx) {
    if (!ctx.req.userId) {
      throw Error('Please signin first');
    }

    const { data } = await ctx.util.Api.get(
      `/food/products/search?offset=${offset}&number=${number}&query=${title}`
    );

    if (data.products.length === 0) {
      throw Error(`No products found with name ${title}.`);
    }

    const filteredData = await ctx.model.Product.find({
      title: { $in: data.products.map(product => product.title) }
    });

    if (filteredData.length) return false;

    await ctx.model.Product.insertMany(data.products);

    return true;
  }
};

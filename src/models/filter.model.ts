export const populate = {
  image: {
    populate: ["data"],
  },
  thumbnail: {
    populate: ["data"],
  },
  categories: {
    populate: ["data"],
  },
  brand: {
    populate: ["data"],
  },
  product_colors: {
    populate: ["data"],
  },
  prices: {
    populate: {
      product_colors: {
        populate: ["data"],
      },
      model: {
        populate: ["data"],
      },
      size: {
        populate: ["category"],
      },
    },
  },
};

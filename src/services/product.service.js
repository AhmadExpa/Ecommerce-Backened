const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(productInfo) {
  let topLevel = await Category.findById({
    name: productInfo.topLevelCategory,
  });
  if (!topLevel) {
    topLevel = new Category({
      name: productInfo.topLevelCategory,
      level: 1,
    });
  }
  let secondLevel = await Category.findById({
    name: productInfo.secondLevelCategory,
    parentCategory: topLevel._id,
  });
  if (!secondLevel) {
    secondLevel = new Category({
      name: productInfo.secondLevelCategory,
      level: 2,
    });
  }
  let thirdLevel = await Category.findById({
    name: productInfo.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });
  if (!thirdLevel) {
    thirdLevel = new Category({
      name: productInfo.thirdLevelCategory,
      level: 3,
    });
  }
  const product = new Product({
    title: productInfo.title,
    color: productInfo.color,
    description: productInfo.description,
    price: productInfo.price,
    size: productInfo.size,
    imageUrl: productInfo.imageUrl,
    discountedPrice: productInfo.discountedPrice,
    discountedPercent: productInfo.discountedPercent,
    quantity: productInfo.quantity,
    brand: productInfo.brand,
    thirdCategory: thirdLevel._id,
  });
  const createdProduct = await product.save();
  return createdProduct;
}

async function deleteProduct(productID) {
  const product = await getProductByID(productID);
  if (!product) {
    throw new Error("Product Not Found");
  }
  await Product.findByIdAndDelete(productID);
  return "Product Deleted";
}
async function updateProduct(productID, productInfo) {
  const product = await getProductByID(productID);

  product.title = productInfo.title;
  product.color = productInfo.color;
  product.description = productInfo.description;
  product.price = productInfo.price;
  product.size = productInfo.size;
  product.imageUrl = productInfo.imageUrl;
  product.discountedPrice = productInfo.discountedPrice;
  product.discountedPercent = productInfo.discountedPercent;
  product.quantity = productInfo.quantity;
  product.brand = productInfo.brand;
  const updatedProduct = await product.save();
  return updatedProduct;
}
async function getProductByID(productID) {
  const product = await Product.findById(productID).populate("category").exec();
  if (!product) {
    throw new Error("Product Not Found");
  }
  return product;
}
async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    size,
    brand,
    minPrice,
    maxPrice,
    minDiscountedPrice,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;
  pageSize = pageSize || 10;
  let query = Product.find().populate("category");
  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }
  if (color) {
    const colorSet = new Set(
      color.split(",").map((c) => c.trim().toLowerCase())
    );
    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query = query.where("color").regex(colorRegex);
  }
  if (size) {
    const sizeSet = new Set(sizes);
    query = query.where("sizes.name").in([sizeSet]);
  }
  if (brand) {
    query = query.where("brand").equals(brand);
  }
  if (minPrice && maxPrice) {
    query = await query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscountedPrice) {
    query = query.where("discountedPrice").gt(minDiscountedPrice);
  }
  if (stock) {
    if (stock == "inStock") {
      query = query.where("quantity").gt(0);
    } else if (stock == "outOfStock") {
      query = query.where("quantity").lte(0);
    }
  }
  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }
  const totalProducts = await Product.countDocuments(query);
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);
  const products = await query.exec();
  const totalPages = Math.ceil(totalProducts / pageSize);
  return { content: products, currentPage: pageNumber, totalPages };
}
async function createMultipleProducts(products) {
  for (const product of products) {
    const newProduct = new Product(product);
    await newProduct.save();
  }
}
module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductByID,
  getAllProducts,
  createMultipleProducts,
};

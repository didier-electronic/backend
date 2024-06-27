import path from "path";
import multer from "multer";
import * as status from "../../constants/httpStatusCodes";
import * as successMessages from "../../constants/successMessages";
import * as errorMessages from "../../constants/errorMessages";

import db from "../../database/models";

const assetsFolder = path.join(__dirname, "assets");
const cloudinary = require("../../helpers/cloudinary");
const { Product } = db;

const upload = multer({ dest: "public/uploads/" }).single("productImage");

export default class ProductController {
  /**
   * @description user product function
   * @param {object} req request from user
   * @param {object} res response from server
   * @return {object} user book information
   */
  static async create(req, res) {
    const imageUrls = [];
    const cloudinaryImageIds = [];

    if (req?.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file?.path);

        imageUrls.push(result.secure_url);
        cloudinaryImageIds.push(result.public_id);
      }
    }

    const { title, description, price } = req.body;

    const newProduct = await Product.create({
      title,
      description,
      price,
      productImage: imageUrls,
      cloudinaryImageId: cloudinaryImageIds,
    });

    return res.status(status.HTTP_CREATED).json({
      status: status.HTTP_CREATED,
      message: successMessages.PRODUCT_CREATED,
      product: { ...newProduct.get() },
    });
  }

  /**
   * @description method to find one book
   * @param {object} req user request object
   * @param {object} res response object from server
   * @returns {object} return a book
   */
  static async getOne(req, res) {
    const id = Number.parseInt(req.params.id, 10);

    const fetchProduct = await Product.findOne({
      where: { id },
    });

    return fetchProduct?.get()
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          product: { ...fetchProduct.get() },
        })
      : res
          .status(status.HTTP_NOT_FOUND)
          .json({ errors: { book: errorMessages.PRODUCT_NOT_FOUND } });
  }

  /**
   * @description method to find all Products
   * @param {object} res response object from server
   * @returns {object} return a user object
   */
  static async getAll(req, res) {
    const fetchProducts = await Product.findAll();

    return fetchProducts.length
      ? res.status(status.HTTP_OK).json({
          status: status.HTTP_OK,
          products: fetchProducts,
        })
      : res
          .status(status.HTTP_NO_CONTENT)
          .json({ errors: { products: errorMessages.PRODUCTS_NOT_FOUND } });
  }

  /**
   * @description Product update function
   * @param {object} req
   * @param {object} res
   * @return {Promise} response object
   */
  static async update(req, res) {
    const id = req.params.id;

    // Fetch Product by id
    const fetchProduct = await Product.findOne({
      where: { id },
    });

    const cloudinayImageIds = fetchProduct.cloudinaryImageId;

    await cloudinayImageIds.map((imageIds) => {
      return cloudinary.uploader.destroy(imageIds);
    });

    let result;

    if (req?.file?.path) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    const { title, description, price } = req.body;

    const updateProduct = await Product.update(
      {
        title: title || fetchProduct.title,
        description: description || fetchProduct.description,
        price: price || fetchProduct.price,
        productImage: result?.secure_url || fetchProduct.bookImage,
        cloudinaryImageId: result?.public_id || fetchProduct.cloudinaryImageId,
      },
      {
        where: { id },
        returning: true,
        plain: true,
      }
    );

    return res.status(status.HTTP_OK).json({
      status: status.HTTP_OK,
      message: successMessages.UPDATED,
      product: { ...updateProduct[1].dataValues },
    });
  }

  /**
   * @description delete Book
   * @param {object} req
   * @param {object} res
   * @return {Promise} response object
   */
  static async delete(req, res) {
    const id = req.params.id;

    // Fetch Product by id
    const fetchProduct = await Product.findOne({
      where: { id },
    });

    const cloudinayImageIds = fetchProduct.cloudinaryImageId;

    await cloudinayImageIds.map((imageIds) => {
      return cloudinary.uploader.destroy(imageIds);
    });

    // Delete Product from DB
    await Product.destroy({ where: { id } });

    return res.status(status.HTTP_OK).json({
      status: status.HTTP_OK,
      message: successMessages.PRODUCT_DELETED,
    });
  }
}

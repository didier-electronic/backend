import * as status from "../../constants/httpStatusCodes";
import * as successMessages from "../../constants/successMessages";
import * as errorMessages from "../../constants/errorMessages";

import db from "../../database/models";

const { cloudinary } = require("../../helpers/cloudinary");
const { Product } = db;

export default class ProductController {
  /**
   * @description user product function
   * @param {object} req request from user
   * @param {object} res response from server
   * @return {object} user book information
   */
  static async create(req, res) {
    const result = await cloudinary.uploader.upload(req.file.path);

    const { title, description, price } = req.body;

    const newProduct = await Product.create({
      title,
      description,
      price,
      productImage: result.secure_url,
      cloudinaryImageId: result.public_id,
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
          book: { ...fetchProduct.get() },
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
          books: fetchProducts,
        })
      : res
          .status(status.HTTP_NO_CONTENT)
          .json({ errors: { books: errorMessages.BOOKS_NOT_FOUND } });
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

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(fetchProduct.cloudinaryImageId);

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
      user: { ...updateProduct[1].dataValues },
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

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(fetchProduct.cloudinaryImageId);

    // Delete Product from DB
    await Product.destroy({ where: { id } });

    return res.status(status.HTTP_OK).json({
      status: status.HTTP_OK,
      message: successMessages.PRODUCT_DELETED,
    });
  }
}

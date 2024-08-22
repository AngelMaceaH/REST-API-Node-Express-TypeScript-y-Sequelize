import { Router } from "express";
import { getHome } from "./Controllers/home";
import {
  getProducts,
  getProductsById,
  putProducts,
  postProducts,
  deleteProducts,
  patchProducts,
} from "./Controllers/products";
import {
  handleInputErrorsPostProducts,
  handleInputErrorsGetProductsById,
  handleInputErrorsPutProducts,
  handleInputErrorsPatchProducts,
} from "./middleware";
const router = Router();
// Routing
router.get("/", getHome);
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The Product Name
 *           example: "Product 1"
 *         price:
 *           type: number
 *           description: The Product Price
 *           example: 100
 *         availability:
 *           type: boolean
 *           description: The Product Availability
 *           example: true
 *
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     description: Return a list of all products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *        description: Bad Request
 *       500:
 *        description: Internal Server Error
 */
router.get("/productos/", getProducts);
/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Return a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *        description: Bad Request
 */
router.get("/productos/:id", handleInputErrorsGetProductsById, getProductsById);
/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: A product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *        description: Bad Request
 */
router.post("/productos/", handleInputErrorsPostProducts, postProducts);
/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Products
 *     description: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: A product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *        description: Bad Request
 *       404:
 *        description: Not Found
 */
router.put("/productos/:id", handleInputErrorsPutProducts, putProducts);


/**
 * @swagger
 * /productos/{id}:
 *   patch:
 *     summary: Update availability of a product by ID
 *     tags:
 *       - Products
 *     description: Update availability of a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               availability:
 *                 type: boolean
 *                 description: The Product Availability
 *                 example: true
 *     responses:
 *       200:
 *         description: A product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *        description: Bad Request
 *       404:
 *        description: Not Found
 */

router.patch("/productos/:id", patchProducts);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     description: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *        description: Bad Request
 *       404:
 *        description: Not Found
 */
router.delete(
  "/productos/:id",
  handleInputErrorsGetProductsById,
  deleteProducts
);

export default router;

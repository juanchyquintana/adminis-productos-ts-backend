import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateAvailability,
  updateProduct,
} from "../controllers/product";
import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const router = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *        Product:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *                description: The Product ID
 *                example: 1
 *              name:
 *                type: string
 *                description: The Product Name
 *                example: Monitor Curco de 49 Pulgadas
 *              price:
 *                type: number
 *                description: The Product Price
 *                example: 300
 *              availability:
 *                type: boolean
 *                description: The Product Availability
 *                example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *        summary: Get a list of products
 *        tags:
 *          - Products
 *        description: Return a list of products
 *        responses:
 *          200:
 *            description: Successful Response
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Product'
 */

router.get("/", getProduct);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *        summary: Get a products by ID
 *        tags:
 *          - Products
 *        description: Return a single product based on its unique ID
 *        parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *        responses:
 *          200:
 *            description: Successful Response
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Product'
 *          404:
 *            description: Not Found
 *          400:
 *            description: Bad Request - Invalid ID
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new Products
 *    tags:
 *      - Products
 *    description: Return a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo 50 Pulgadas"
 *              price:
 *                type: number
 *                example: 500
 *    responses:
 *      201:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - invalid input data
 */

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio de Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo 50 Pulgadas"
 *              price:
 *                type: number
 *                example: 500
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID or Invalid data
 *      404:
 *        description: Product Not Found
 */

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre de Producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio de Producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no válido"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Updates a Product Availability
 *    tags:
 *      - Products
 *    description: Returns the updated availability
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product Not Found
 */

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Deleted a product by a given ID
 *    tags:
 *      - Products
 *    description: Return a confirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to delete
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Product Eliminated
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: 'Producto Eliminado'
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product Not Found
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  deleteProduct
);

export default router;

import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Product from "../models/Productos.model";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name", "price", "availability"],
      order: [["id", "ASC"]],
    });
    const response = {
      message: "Listado de productos",
      data: products,
      length: products.length,
    };
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: `Error Controller: ${error.message}` });
  }
};
const getProductsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    const response = {
      message: "Producto encontrado",
      data: product,
    };
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: `Error Controller: ${error.message}` });
  }
};
const postProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    const response = {
      message: "Producto creado",
      data: product,
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: `Error Controller: ${error.message}` });
  }
};
const putProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await product.update(req.body);
    const response = {
      message: "Producto actualizado",
      data: product,
    };
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: `Error Controller: ${error.message}` });
  }
};
const patchProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await product.update(req.body);
    const response = {
      message: "Producto actualizado",
      data: product,
    };
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: `Error Controller: ${error.message}` });
  }
}


const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await product.destroy();
    const response = {
      message: "Producto eliminado",
      data: product,
    };
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: `Error Controller: ${error.message}` });
  }
};

export {
  getProducts,
  getProductsById,
  postProducts,
  putProducts,
  patchProducts,
  deleteProducts,
};

import { Request, Response, NextFunction } from "express";

const validateFields = (
  fields: {
    name: string;
    type: "params" | "body";
    isNumber?: boolean;
    minValue?: number;
    isBoolean?: boolean;
  }[],
  req: Request,
  res: Response,
  next: NextFunction
) => {
  for (const field of fields) {
    const value =
      field.type === "params" ? req.params[field.name] : req.body[field.name];

    if (value === undefined) {
      return res.status(400).json({ message: `${field.name} es obligatorio` });
    }
    if (field.isNumber && isNaN(value)) {
      return res
        .status(400)
        .json({ message: `${field.name} debe ser un número` });
    }
    if (field.minValue !== undefined && Number(value) <= field.minValue) {
      return res
        .status(400)
        .json({ message: `${field.name} debe ser mayor a ${field.minValue}` });
    }
    if (field.isBoolean && typeof value !== "boolean") {
      return res
        .status(400)
        .json({ message: `${field.name} debe ser un booleano` });
    }
  }
  next();
};

export const handleInputErrorsGetProductsById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateFields(
    [{ name: "id", type: "params", isNumber: true }],
    req,
    res,
    next
  );
};

export const handleInputErrorsPostProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateFields(
    [
      { name: "name", type: "body" },
      { name: "price", type: "body", isNumber: true, minValue: 0 },
    ],
    req,
    res,
    next
  );
};

export const handleInputErrorsPutProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateFields(
    [
      { name: "name", type: "body" },
      { name: "price", type: "body", isNumber: true, minValue: 0 },
    ],
    req,
    res,
    next
  );
};
export const handleInputErrorsPatchProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateFields(
    [
      { name: "availability", type: "body", isBoolean: true},
    ],
    req,
    res,
    next
  );
};
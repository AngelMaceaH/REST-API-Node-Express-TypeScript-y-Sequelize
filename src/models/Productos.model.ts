import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "products",
})
class Product extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    defaultValue: "Producto",
  })
  declare name: string;

  @Column({
    type: DataType.DECIMAL(6, 2),
    allowNull: false,
    defaultValue: 100.0,
  })
  declare price: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare availability: boolean;
}
export default Product;

import client from "../database";

export type ProductsInOder = {
  name: string;
  price: number;
  order_id: number;
  product_id: number;
};

export class DashboardQueries {
  //Get all products that have been included in orders
  async productsInOrders(): Promise<ProductsInOder[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id=order_products.id";
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get products and orders: ${err}`);
    }
  }
}

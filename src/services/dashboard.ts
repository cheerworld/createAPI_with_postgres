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
  //Get users that have been included in orders
  async usersWithOrders(): Promise<{ username: string; status: string }[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT username, status FROM users INNER JOIN orders ON users.id=orders.user_id";
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get users with orders: ${err}`);
    }
  }

  //Get 5 most expensive products in products
  async fiveMostExpensive(): Promise<{ name: string; price: number }[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT name, price FROM products ORDER BY price DESC LIMIT 5";
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get products by price: ${err}.`);
    }
  }
}

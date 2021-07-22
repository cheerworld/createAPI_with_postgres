import client from "../database";

export type Plant = {
  id: Number;
  name: string;
  type: string;
  weight: number;
};

export class RarePlantStore {
  async index(): Promise<Plant[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM rare_plants";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get plants ${err}`);
    }
  }
}

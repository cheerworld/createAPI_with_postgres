import client from "../database";

export type Plant = {
  id: number;
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
      throw new Error(`Cannot get plants. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Plant> {
    try {
      const sql = "SELECT * FROM rare_plants where id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find plant ${id}. Error: ${err}`);
    }
  }

  async create(p: Plant): Promise<Plant> {
    try {
      const sql =
        "INSERT INTO rare_plants (name, type, weight) VALUES ($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [p.name, p.type, p.weight]);
      const rare_plant = result.rows[0];
      conn.release();
      return rare_plant;
    } catch (err) {
      throw new Error(`Cannot add new plant ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Plant> {
    try {
      const sql = "DELETE FROM rare_plants WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const plant = result.rows[0];
      conn.release();
      return plant;
    } catch (err) {
      throw new Error(`Cannot delete plant ${id}. Error: ${err}`);
    }
  }
}

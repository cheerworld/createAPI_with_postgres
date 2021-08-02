import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  username: string;
  password_digest: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users where id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *";
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        u.password_digest + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as unknown as string)
      );
      const result = await conn.query(sql, [u.username, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Cannot add new user ${u.username}. Error: ${err}`);
    }
  }

  async update(u: User): Promise<User> {
    try {
      const sql =
        "UPDATE users SET username=($1), password_digest=($2) WHERE id=($3) RETURNING *";
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        u.password_digest + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as unknown as string)
      );

      const result = await conn.query(sql, [u.username, hash, u.id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Cannot update user ${u.username}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Cannot delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE username=($1)";
      const result = await conn.query(sql, [username]);

      if (result.rows.length) {
        const user = result.rows[0];

        if (
          bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password_digest)
        ) {
          return user;
        }
      }

      return null;
    } catch (err) {
      throw new Error(`Cannot authenticate user ${username}. Error: ${err}.`);
    }
  }
}

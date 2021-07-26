import { Plant, RarePlantStore } from "../rare_plant";
//import client from "../../database";

const store = new RarePlantStore();

describe("Rare Plant Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a plant", async () => {
    const result = await store.create({
      name: "monstera",
      type: "love sun",
      weight: 4,
    });
    expect(result).toEqual({
      id: 1,
      name: "monstera",
      type: "love sun",
      weight: 4,
    });
  });

  it("index method should return a list of plants", async () => {
    const result = await store.index();
    console.log(result);
    expect(result).toEqual([
      {
        id: 1,
        name: "monstera",
        type: "love sun",
        weight: 4,
      },
    ]);
  });

  it("show method should return the correct plant", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: "monstera",
      type: "love sun",
      weight: 4,
    });
  });

  it("delete method should remove the selected plant", async () => {
    store.delete(1);
    const result = await store.index();
    expect(result).toEqual([]);
    /*
    const conn = await client.connect();
    const sql = "TRUNCATE TABLE rare_plants RESTART IDENTITY";
    const deleteAll = await conn.query(sql);
    conn.release();
    */
  });
});

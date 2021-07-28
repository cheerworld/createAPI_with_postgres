import { Plant, RarePlantStore } from "../rare_plant";

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

  it("update method should return the updated plant", async () => {
    const result = await store.update({
      id: 1,
      name: "cactus",
      type: "less water",
      weight: 2,
    });
    console.log(result);
    expect(result).toEqual({
      id: 1,
      name: "cactus",
      type: "less water",
      weight: 2,
    });
  });

  it("delete method should remove the selected plant", async () => {
    store.delete(1);
    const result = await store.index();
    expect(result).toEqual([]);
  });
});

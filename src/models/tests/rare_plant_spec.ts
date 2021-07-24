import { Plant, RarePlantStore } from "../rare_plant";

const store = new RarePlantStore();

describe("Rare Plant Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("index method should return a list of plants", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});

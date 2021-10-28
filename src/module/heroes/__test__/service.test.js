import Hero from "../entity/heroEntity";
import { HeroesService } from "../module";
import HeroesNotFoundError from "../service/error/HeroesNotFoundError";
import HeroIdNotDefined from "../service/error/HeroIdNotDefinedError";
import HeroNotFoundError from "../service/error/HeroNotFoundError";

const heroMock = {
  id: 123,
  powerstats: {
    combat: 0,
    power: 0,
    durability: 0,
    speed: 0,
    strength: 0,
    intelligence: 0,
  },
  appearance: {
    height: "0 cm",
    weight: "0 kg",
  },
};

describe("HeroesService", () => {
  test("findByName function should call the API and return a mapped array of heroes", async () => {
    const axiosMock = {
      get: jest.fn(() => Promise.resolve({ data: { results: [heroMock] } })),
    };

    const service = new HeroesService(axiosMock);
    const value = await service.findByName("name");

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(value).toMatchObject([new Hero(heroMock)]);
  });

  test("findByName should throw an error if no heroes found", () => {
    const axiosMock = {
      get: jest.fn(() => Promise.resolve({ data: { results: undefined } })),
    };

    const service = new HeroesService(axiosMock);

    expect(service.findByName("name")).rejects.toThrow(HeroesNotFoundError);
  });

  test("findById should fetch a hero from API and return it mapped", async () => {
    const axiosMock = {
      get: jest.fn(() => Promise.resolve({ data: heroMock })),
    };

    const service = new HeroesService(axiosMock);
    const value = await service.findById(1);

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(value).toMatchObject(new Hero(heroMock));
  });

  test("findById should throw an error if id is not defined", async () => {
    const service = new HeroesService();

    expect(service.findById()).rejects.toThrow(HeroIdNotDefined);
  });

  test("findById should throw an error if hero not found", async () => {
    const axiosMock = {
      get: jest.fn(() => Promise.resolve({ data: undefined })),
    };

    const service = new HeroesService(axiosMock);

    expect(service.findById(1)).rejects.toThrow(HeroNotFoundError);
  });
});

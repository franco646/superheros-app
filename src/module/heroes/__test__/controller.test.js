import Hero from "../entity/heroEntity";
import { HeroesController } from "../module";

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

const authMiddlewareMock = {
  verifyToken: jest.fn(),
};

const serviceMock = {
  findByName: jest.fn(() => Promise.resolve([{}, {}, {}, {}, {}])),
  findById: jest.fn(() => Promise.resolve(heroMock)),
};

const controller = new HeroesController(authMiddlewareMock, serviceMock);

describe("HeroesController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call findByName service with the search params as argument", async () => {
    const requestMock = {
      params: {
        searchParam: "param",
      },
      query: {
        limit: 1,
        offset: 0,
      },
    };

    await controller.search(requestMock, {}, () => {});

    expect(serviceMock.findByName).toHaveBeenCalledTimes(1);
    expect(serviceMock.findByName).toHaveBeenCalledWith("param");
  });

  it("should limit the number of heroes depending query parameters", async () => {
    const endMock = jest.fn();
    const jsonMock = jest.fn(() => ({ end: endMock }));
    const statusMock = jest.fn(() => ({ json: jsonMock }));

    const requestMock = {
      params: {
        searchParam: "param",
      },
      query: {
        limit: 3,
        offset: 0,
      },
    };

    const responseMock = {
      status: statusMock,
      json: jsonMock,
      end: endMock,
    };

    await controller.search(requestMock, responseMock, () => {});

    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(jsonMock).toHaveBeenCalledWith({ count: 5, heroes: [{}, {}, {}] });
  });

  it("should call findById service with the id as argument", async () => {
    const requestMock = {
      params: {
        id: 123,
      },
    };

    await controller.findById(requestMock, {}, () => {});

    expect(serviceMock.findById).toHaveBeenCalledTimes(1);
    expect(serviceMock.findById).toHaveBeenCalledWith(123);
  });

  it("should return a hero", async () => {
    const endMock = jest.fn();
    const jsonMock = jest.fn(() => ({ end: endMock }));
    const statusMock = jest.fn(() => ({ json: jsonMock }));

    const requestMock = {
      params: {
        id: 123,
      },
    };

    const responseMock = {
      status: statusMock,
      json: jsonMock,
      end: endMock,
    };

    await controller.findById(requestMock, responseMock, () => {});

    expect(serviceMock.findById).toHaveBeenCalledTimes(1);
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(jsonMock).toHaveBeenCalledWith({ hero: new Hero(heroMock) });
  });
});

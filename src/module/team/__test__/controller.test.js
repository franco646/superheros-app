import Team from "../entity/teamEntity.js";
import { TeamController } from "../module.js";

const authMiddlewareMock = jest.fn();

const repositoryMock = {
  save: jest.fn(),
  getAll: jest.fn(() => Promise.resolve([])),
  findById: jest.fn(() => Promise.resolve({})),
  delete: jest.fn(),
};

const serviceMock = {
  findByName: jest.fn(() => Promise.resolve([])),
  findById: jest.fn(() => Promise.resolve({})),
};

const controller = new TeamController(
  authMiddlewareMock,
  repositoryMock,
  serviceMock
);

describe("TeamController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("save function should fetch heroes and call save team", async () => {
    await controller.save({ body: { heroes: [{}], id: 1 } }, {}, () => {});

    expect(serviceMock.findById).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    expect(repositoryMock.save).toHaveBeenCalledWith(
      new Team({ heroes: [{}], id: 1 })
    );
  });

  test("findAll should call getAll function from repository and return it", async () => {
    const endMock = jest.fn();
    const jsonMock = jest.fn(() => ({ end: endMock }));
    const statusMock = jest.fn(() => ({ json: jsonMock }));

    const responseMock = {
      status: statusMock,
      json: jsonMock,
      end: endMock,
    };

    await controller.findAll({}, responseMock, () => {});

    expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(jsonMock).toHaveBeenCalledWith({ teams: []});
  });

  test('findById should find hero by id and return it', async () => {
    const endMock = jest.fn();
    const jsonMock = jest.fn(() => ({ end: endMock }));
    const statusMock = jest.fn(() => ({ json: jsonMock }));

    const responseMock = {
      status: statusMock,
      json: jsonMock,
      end: endMock,
    };

    await controller.findById({ params: { id: 1 } }, responseMock, () => {});

    expect(repositoryMock.findById).toHaveBeenCalledTimes(1)
    expect(repositoryMock.findById).toHaveBeenCalledWith(1) // id
    expect(jsonMock).toHaveBeenCalledTimes(1)
    expect(jsonMock).toHaveBeenCalledWith({ team: {} })

  })

  test('delete should call delete function from repository', async () => {
    await controller.delete({ params: { id: 1 } }, {}, () => {});

    expect(repositoryMock.delete).toHaveBeenCalledTimes(1)
    expect(repositoryMock.delete).toHaveBeenCalledWith(1) // id
  })
});

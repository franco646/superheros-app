import { TeamModel, TeamRepository } from "../module";
import { Sequelize } from "sequelize";
import Team from "../entity/teamEntity";
import TeamNotDefinedError from "../repository/errors/TeamNotDefinedError";
import TeamsNotFoundError from "../repository/errors/TeamsNotFoundError";
import TeamIdNotDefinedError from "../repository/errors/TeamIdNotDefinedError";
import TeamNotFoundError from "../repository/errors/teamNotFoundError";

const sequelizeInstance = new Sequelize('sqlite::memory:', { logging: false });

let repository;

const teamMock = {
    id: 1,
    name: '',
    averages: {},
    heroes: [{}]
}

describe('TeamRepository', () => {
    beforeAll(() => {
        const team = TeamModel.setup(sequelizeInstance);

        repository = new TeamRepository(team);
    });

    beforeEach(async () => {
        await sequelizeInstance.sync({ force: true });
    });

    test('save should create a new team in database if id is not defined', async () => {
        const teamWithoutId = new Team({...teamMock, id: undefined})

        const { id } = await repository.save(teamWithoutId)

        expect(id).toBe(1)
    })

    test('save should update a  team in database if id is defined', async () => {
        const teamWithoutId = new Team({...teamMock, id: undefined})
        await repository.save(teamWithoutId) // crate a new team

        const teamWithId = new Team({ ...teamMock, name: 'new name' })
        const { id, name } = await repository.save(teamWithId) // update team created

        expect(id).toBe(1)
        expect(name).toBe('new name')
    })

    test('save should throw an error if team is not defined', async () => {
        await expect(repository.save()).rejects.toThrow(TeamNotDefinedError)
    })

    test('getAll should find all teams from database', async () => {
        const teamWithoutId = new Team({...teamMock, id: undefined})
        await repository.save(teamWithoutId) // crate a new team

        const teams = await repository.getAll()

        expect(teams).toMatchObject([new Team(teamMock)])
    })

    test('getAll should throw an error if not teams are found', async () => {
        await expect(repository.getAll()).rejects.toThrow(TeamsNotFoundError)
    })

    test('findById should throw an error if id is not defined', async () => {
        await expect(repository.findById()).rejects.toThrow(TeamIdNotDefinedError)
    })

    test('findById should find a team by id', async () => {
        const teamWithoutId = new Team({...teamMock, id: undefined})
        await repository.save(teamWithoutId) // crate a new team

        const team = await repository.findById(1)

        await expect(team).toMatchObject(new Team({ ...teamWithoutId, id: 1 }))
    })

    test('findById should throw an error if no team is found', async () => {
        await expect(repository.findById(1)).rejects.toThrow(TeamNotFoundError)
    })

    test('delete should throw an error if id is not defined', async () => {
        await expect(repository.delete()).rejects.toThrow(TeamIdNotDefinedError)
    })

    test('delete should delete a team', async () => {
        const teamWithoutId = new Team({...teamMock, id: undefined})
        await repository.save(teamWithoutId) // crate a new team

        await repository.delete(1)

        await expect(repository.findById(1)).rejects.toThrow(TeamNotFoundError)
    })
})
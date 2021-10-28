import Team from "../entity/teamEntity.js";
import TeamNotDefinedError from "./errors/TeamNotDefinedError.js";
import TeamIdNotDefinedError from "./errors/TeamIdNotDefinedError.js";
import TeamNotFoundError from "./errors/teamNotFoundError.js";
import TeamsNotFoundError from "./errors/TeamsNotFoundError.js";
import { dataToEntity } from "../mapper/teamMapper.js";

export default class TeamRepository {
  constructor(teamModel) {
    this.teamModel = teamModel;
  }

  async save(team) {
    if (!(team instanceof Team)) {
      throw new TeamNotDefinedError("Team not defined.");
    }
    const teamInstance = this.teamModel.build(team, {
      isNewRecord: !team.id,
    });
    return await teamInstance.save();
  }

  async getAll() {
    const teams = await this.teamModel.findAll();
    if (!teams || teams.length < 1) {
      throw new TeamsNotFoundError("Teams not found.");
    }
    return teams.map(team => dataToEntity(team))
  }

  async findById(id) {
    if (!id) {
      throw new TeamIdNotDefinedError("Team id not defined.");
    }

    const team = await this.teamModel.findByPk(id);
    if (!team) {
      throw new TeamNotFoundError("Team not found.");
    }

    return dataToEntity(team);
  }

  async delete(id) {
    if (!id) {
      throw new TeamIdNotDefinedError("Team id not defined.");
    }
    return await this.teamModel.destroy({ where: { id } });
  }
}

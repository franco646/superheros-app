import pkg from "sequelize";
const { DataTypes, Model } = pkg;

export default class TeamModel extends Model {
  static setup(sequelizeInstance) {
    TeamModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        averages: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        heroes: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: "Team",
      }
    );
    return TeamModel;
  }
}

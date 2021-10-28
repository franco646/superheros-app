import { DataTypes, Model } from "sequelize";

export default class HeroModal extends Model {
  static setup(sequelizeInstance) {
    HeroModal.init(
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
        powerstats: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        año: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        kms: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        color: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        imagen: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        aireAcondicionado: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pasajeros: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        manualAutomatico: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        precioAlquilerPorDia: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: "Auto",
      }
    );
    return AutoModel;
  }
}

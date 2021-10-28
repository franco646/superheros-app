import Team from "../entity/teamEntity.js";

const dataToEntity = ({ id, name, averages, heroes }) =>
  new Team({ id: Number(id), name, averages, heroes });

export { dataToEntity };

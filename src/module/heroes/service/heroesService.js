import { fromDataToEntity } from "../mapper/heroMapper.js";
import HeroIdNotDefinedError from "./error/HeroIdNotDefinedError.js";
import HeroesNotFoundError from "./error/HeroesNotFoundError.js";
import HeroNotFoundError from "./error/HeroNotFoundError.js";

export default class HeroesService {
  constructor(axios) {
    this.axios = axios;
  }

  async findByName(name) {
    const response = await this.axios.get(
      `${process.env.SUPER_HERO_API_ROUTE_BASE}${process.env.SUPER_HERO_API_ACCESS_TOKEN}/search/${name}`
    );
    const heroes = response.data.results;
    if (!heroes) {
      throw new HeroesNotFoundError("Heroes not found.");
    }
    return heroes.map((hero) => fromDataToEntity(hero));
  }

  async findById(id) {
    if (!Number(id)) {
      throw new HeroIdNotDefinedError("Hero id not defined.");
    }

    const response = await this.axios.get(
      `${process.env.SUPER_HERO_API_ROUTE_BASE}${process.env.SUPER_HERO_API_ACCESS_TOKEN}/${id}`
    );

    const hero = response.data;
    if (!hero) {
      throw new HeroNotFoundError("Hero not found.");
    }

    return fromDataToEntity(hero);
  }
}

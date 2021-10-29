import { fromDataToEntity } from "../mapper/heroMapper.js";
import HeroesNotFoundError from "../service/error/HeroesNotFoundError.js";

export default class HeroesController {
  constructor(authMiddleware, heroesService) {
    this.authMiddleware = authMiddleware;
    this.heroesService = heroesService;
  }

  configureRoutes(app) {
    const ROUTE = "/heroes";

    app.get(
      `${ROUTE}/search/:searchParam?`,
      this.authMiddleware.verifyToken.bind(this.authMiddleware),
      this.search.bind(this)
    );
    app.get(
      `${ROUTE}/:id`,
      this.authMiddleware.verifyToken.bind(this.authMiddleware),
      this.findById.bind(this)
    );
  }

  async search(req, res, next) {
    const { limit, offset } = req.query;
    const { searchParam } = req.params;
    try {
      const fetchedHeroes = await this.heroesService.findByName(searchParam);
      const countOfHeroes = fetchedHeroes.length;
      const limitedHeroes =
        countOfHeroes > limit
          ? fetchedHeroes.slice(+offset, +offset + +limit)
          : fetchedHeroes;
      res
        .status(200)
        .json({
          heroes: limitedHeroes,
          count: countOfHeroes,
        })
        .end();
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    const { id } = req.params;
    try {
      const hero = await this.heroesService.findById(id);
      res.status(200).json({ hero }).end();
    } catch (error) {
      next(error);
    }
  }
}

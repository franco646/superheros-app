import { dataToEntity } from "../mapper/teamMapper.js";

export default class TeamController {
  constructor(authMiddleware, teamRepository, heroesService) {
    this.authMiddleware = authMiddleware;
    this.teamRepository = teamRepository;
    this.heroesService = heroesService;
  }

  configureRoutes(app) {
    const ROUTE = "/teams";

    app.post(
      `${ROUTE}/save`,
      this.authMiddleware.verifyToken.bind(this.authMiddleware),
      this.save.bind(this)
    );
    app.get(
      ROUTE,
      this.authMiddleware.verifyToken.bind(this.authMiddleware),
      this.findAll.bind(this)
    );
    app.get(
      `${ROUTE}/:id`,
      this.authMiddleware.verifyToken.bind(this.authMiddleware),
      this.findById.bind(this)
    );
    app.delete(
      `${ROUTE}/delete/:id`,
      this.authMiddleware.verifyToken.bind(this.authMiddleware),
      this.delete.bind(this)
    );
  }

  async save(req, res, next) {
    const { heroes } = req.body;
    const fetchedHeroes = [];
    try {
      await Promise.all(
        heroes.map(async (hero) => {
          const fetchedHero = await this.heroesService.findById(hero.id);
          fetchedHeroes.push(fetchedHero);
        })
      );
      const team = dataToEntity({ ...req.body, heroes: fetchedHeroes });
      team.calculateTeamAverages();

      await this.teamRepository.save(team);

      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const teams = await this.teamRepository.getAll();
      res.status(200).json({ teams }).end();
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    const { id } = req.params;
    try {
      const team = await this.teamRepository.findById(id);
      res.status(200).json({ team }).end();
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await this.teamRepository.delete(id);
      res.status(200).json({ message: "Equipo eliminado con exito" }).end();
    } catch (error) {
      next(error);
    }
  }
}

export default class Team {
  constructor({ id, name, averages, heroes }) {
    this.id = id;
    this.name = name;
    this.averages = averages;
    this.heroes = heroes;
  }

  calculatePowerstatAverage(powerstat) {
    const total = this.heroes.reduce((a, b) => a + +b.powerstats[powerstat], 0);
    const average = Math.round(total / this.heroes.length);
    return average;
  }

  calculateAppearanceAverage(appearance) {
    const total = this.heroes.reduce(
      (a, b) => a + +b.appearance[appearance][1].split(" ")[0],
      0
    );
    const average = Math.round(total / this.heroes.length);
    return average;
  }

  calculateAverage(array) {
    const total = array.reduce((a, b) => a + +b, 0);
    const average = Math.round(total / array.length);
    return average;
  }

  calculateTeamAverages() {
    const intelligence = this.calculatePowerstatAverage("intelligence");
    const strength = this.calculatePowerstatAverage("strength");
    const speed = this.calculatePowerstatAverage("speed");
    const durability = this.calculatePowerstatAverage("durability");
    const power = this.calculatePowerstatAverage("power");
    const combat = this.calculatePowerstatAverage("combat");
    const height = this.calculateAppearanceAverage("height");
    const weight = this.calculateAppearanceAverage("weight");
    const total = this.calculateAverage([
      intelligence,
      strength,
      speed,
      durability,
      power,
      combat,
    ]);
    const averages = {
      intelligence,
      strength,
      speed,
      durability,
      power,
      combat,
      height,
      weight,
      total,
    };
    this.averages = averages;
  }
}

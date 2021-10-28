const calculatePowerstatAverage = (array, powerstat) => {
  const total = array.reduce((a, b) => a + +b.powerstats[powerstat], 0);
  const average = Math.round(total / array.length);
  return average || 0;
};

const calculateAppearanceAverage = (array, appearance) => {
  const total = array.reduce(
    (a, b) => a + +b.appearance[appearance].split(" ")[0],
    0
  );
  const average = Math.round(total / array.length);
  return average || 0;
};

const calculateAverage = (array) => {
  const total = array.reduce((a, b) => a + +b, 0);
  const average = Math.round(total / array.length);
  return average || 0;
};

const calculateAverages = (team) => {
  const heroes = team.heroes;

  const intelligence = calculatePowerstatAverage(heroes, "intelligence");
  const strength = calculatePowerstatAverage(heroes, "strength");
  const speed = calculatePowerstatAverage(heroes, "speed");
  const durability = calculatePowerstatAverage(heroes, "durability");
  const power = calculatePowerstatAverage(heroes, "power");
  const combat = calculatePowerstatAverage(heroes, "combat");

  const height = calculateAppearanceAverage(heroes, "height");
  const weight = calculateAppearanceAverage(heroes, "weight");

  const total = calculateAverage([
    intelligence,
    strength,
    speed,
    durability,
    power,
    combat,
  ]);

  return {
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
};

export { calculateAverages };

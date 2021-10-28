import Hero from "../entity/heroEntity.js";

const fromDataToEntity = ({
  id,
  name,
  powerstats,
  biography,
  appearance,
  work,
  connections,
  image,
}) =>
  new Hero({
    id: Number(id),
    name,
    powerstats: {
      intelligence:
        powerstats.intelligence === "null"
          ? 0
          : Number(powerstats.intelligence),
      strength:
        powerstats.strength === "null" ? 0 : Number(powerstats.strength),
      speed: powerstats.speed === "null" ? 0 : Number(powerstats.speed),
      durability:
        powerstats.durability === "null" ? 0 : Number(powerstats.durability),
      power: powerstats.power === "null" ? 0 : Number(powerstats.power),
      combat: powerstats.combat === "null" ? 0 : Number(powerstats.combat),
    },
    biography,
    appearance: {
      ...appearance,
      height:
        appearance.height.length === 2
          ? appearance.height[1].split(" ")[1] === "meters" // heights in meters are converted to centrimeters
            ? `${appearance.height[1].split(" ")[0] * 100} cm`
            : appearance.height[1]
          : "0 cm",
      weight:
        appearance.height.length === 2
          ? appearance.weight[1].split(" ")[1] === "tons" // weights in tons are converted to kilograms
            ? `${appearance.weight[1].split(" ")[0].replace(",", "") * 1000} kg`
            : appearance.weight[1]
          : "0 kg",
    },
    work,
    connections,
    image,
  });

export { fromDataToEntity };

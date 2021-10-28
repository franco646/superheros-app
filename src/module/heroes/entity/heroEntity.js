export default class Hero {
  constructor({
    id,
    name,
    powerstats,
    biography,
    appearance,
    work,
    connections,
    image,
  }) {
    this.id = id;
    this.name = name;
    this.powerstats = powerstats;
    this.biography = biography;
    this.appearance = appearance;
    this.work = work;
    this.connections = connections;
    this.image = image;
  }
}

export type CharacterData = {
    name: string;
    id: number;
    ki: number;
    maxKi: number;
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation: string;
    originPlanet: object;
    transformations: any;
};

export type CharacterResponse = {
    items: CharacterData[];
}

export class Character {
    name: string;
    id: number;
    ki: number;
    maxKi: number;
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation: string;
    originPlanet: object;
    transformations: any;

    constructor(data: CharacterData) {
        this.name = data.name;
        this.id = data.id;
        this.ki = data.ki;
        this.maxKi = data.maxKi;
        this.race = data.race
        this.gender = data.gender
        this.description = data.description;
        this.image = data.image;
        this.affiliation = data.affiliation;
        this.originPlanet = data.originPlanet;
        this.transformations = data.transformations || [];
    }

}
import { heroes } from "../data/herores"

export const getHeroById = (id = '') => {
    return heroes.find(hero => hero.id === id);
}
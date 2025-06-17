import './style.css';
import { Toolbox } from './toolbox';
import { Character } from './character';
import type { CharacterData } from './character';

const url = new URL(window.location.href);
const characterId = url.searchParams.get('id');

const fullChar = document.getElementById('fullChar') as HTMLElement;

async function fetchCharacterByHisId(id: string) {
    try {
        const res = await fetch (`https://dragonball-api.com/api/characters/${id}`);
        const data: CharacterData = await res.json();

        const character = new Character(data);
        
        const characterContainer = Toolbox.createDiv();
        
        const name = Toolbox.createH1(character.name);
        
    } catch (error) {
        console.error('Error fetching character:', error);
    }
}

if (characterId) {
    fetchCharacterByHisId(characterId)
} else {
    console.error('No character ID provided in the URL');
}
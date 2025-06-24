import './style.css';
import { Toolbox } from './toolbox';
import { Character } from './character';
import type { CharacterData } from './character';

type CharacterAPIResponse = {
  items: CharacterData[];
};

const app = document.getElementById('app') as HTMLElement;

// Classes utilitaires pour le layout
Toolbox.addClass(app, [
  'grid',
  'grid-cols-[repeat(auto-fit,minmax(150px,1fr))]',
  'p-4',
  'gap-40',
  'justify-items-center',
  'ml-25',
  'mr-25',
]);

let selectedRace = '';
let selectedGender = '';
let selectedAffiliation = '';
let allCharacters: CharacterData[] = [];

document.getElementById('race-select')?.addEventListener('change', (e) => {
  selectedRace = (e.target as HTMLSelectElement).value;
  renderCharacters();
});

document.getElementById('gender-select')?.addEventListener('change', (e) => {
  selectedGender = (e.target as HTMLSelectElement).value;
  renderCharacters();
});

document.getElementById('affiliation-select')?.addEventListener('change', (e) => {
  selectedAffiliation = (e.target as HTMLSelectElement).value;
  renderCharacters();
});

async function fetchCharacters() {
  try {
    const res = await fetch('https://dragonball-api.com/api/characters/?limit=100');
    const data: CharacterAPIResponse = await res.json();

    if (data && data.items) {
      allCharacters = data.items;
      renderCharacters();
    } else {
      console.error("Aucun personnage trouvé dans la réponse de l'API.");
    }

  } catch (error) {
    console.error("Erreur lors du fetch des personnages :", error);
  }
}

function renderCharacters() {
  app.innerHTML = '';

  const filtered = allCharacters.filter(char => {
    const matchRace = !selectedRace || char.race?.toLowerCase() === selectedRace.toLowerCase();
    const matchGender = !selectedGender || char.gender?.toLowerCase() === selectedGender.toLowerCase();
    const matchAffiliation = !selectedAffiliation || (char.affiliation && char.affiliation.toLowerCase().includes(selectedAffiliation.toLowerCase()));

    return matchRace && matchGender && matchAffiliation;
  });

  filtered.forEach((item: CharacterData) => {
    const character = new Character(item);

    const characterContainer = Toolbox.createDiv();
    characterContainer.addEventListener('click', () => {
      window.location.href = `/fullcharacter.html?id=${character.id}`;
    });

    const characterBackground = Toolbox.createDiv();
    Toolbox.addClass(characterBackground, [
      'mt-20',
      'relative',
      'w-64',
      'h-80',
      'overflow-visible',
      'flex',
      'flex-col',
      'items-center',
    ]);

    const characterDiv = Toolbox.createDiv();
    Toolbox.addClass(characterDiv, [
      'absolute',
      'top-0',
      'left-0',
      'w-full',
      'h-full',
      'rounded-t-lg',
      'bg-amber-100/35',
      'shadow-lg',
      'z-10',
    ]);

    Toolbox.append(characterDiv, characterBackground);
    Toolbox.append(characterBackground, characterContainer);

    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;
    Toolbox.addClass(img, [
      'absolute',
      '-top-16',
      'left-1/2',
      '-translate-x-1/2',
      'h-96',
      'z-20',
      'hover:scale-115',
      'transition-transform',
      'duration-300',
    ]);
    Toolbox.append(img, characterDiv);

    const characterInfos = Toolbox.createDiv();
    Toolbox.addClass(characterInfos, [
      'w-full',
      'h-40',
      'bg-amber-100',
      'shadow-lg',
      'p-4',
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'rounded-b-lg',
    ]);
    Toolbox.append(characterInfos, characterContainer);

    const name = Toolbox.createH1(character.name);
    Toolbox.addClass(name, ['text-lg', 'font-bold']);
    Toolbox.append(name, characterInfos);

    const typeGender = Toolbox.createH1(character.race + ' - ' + character.gender);
    Toolbox.addClass(typeGender, ['text-amber-700']);
    Toolbox.append(typeGender, characterInfos);

    const ki = Toolbox.createH1('Ki de base :');
    Toolbox.addClass(ki, ['text-lg', 'font-bold']);
    Toolbox.append(ki, characterInfos);

    const kiValue = Toolbox.createH1(character.ki);
    Toolbox.addClass(kiValue, ['text-amber-700']);
    Toolbox.append(kiValue, characterInfos);

    const kiMax = Toolbox.createH1('Ki potentiel :');
    Toolbox.addClass(kiMax, ['text-lg', 'font-bold']);
    Toolbox.append(kiMax, characterInfos);

    const kiMaxValue = Toolbox.createH1(character.maxKi);
    Toolbox.addClass(kiMaxValue, ['text-amber-700']);
    Toolbox.append(kiMaxValue, characterInfos);

    Toolbox.append(characterContainer, app);
  });
}

fetchCharacters();

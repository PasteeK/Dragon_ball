import './style.css';
import { Toolbox } from './toolbox';
import { Character } from './character';
import type { CharacterData } from './character';

const url = new URL(window.location.href);
const characterId = url.searchParams.get('id');

const fullChar = document.getElementById('fullChar') as HTMLElement;
Toolbox.addClass(fullChar, [
    'grid',
    'gap-x-4',
    'justify-items-center',
])

async function fetchCharacterByHisId(id: string) {
    try {
        const res = await fetch (`https://dragonball-api.com/api/characters/${id}`);
        const data: CharacterData = await res.json();

        
        const character = new Character(data);
        

        const previousChar = Toolbox.createImg('/src/img/assets/left_arrow.png');
        Toolbox.addClass(previousChar, [
            'w-[48px]',
            'h-[48px]',
            'cursor-pointer',
            'absolute',
            'top-1/2',
            'left-[50px]',
            'fixed',
        ])
        Toolbox.append(previousChar, fullChar)
        if (character.id == 1) {
            previousChar.src = '/src/img/assets/left_arrow_gray.png';
        }
        
        previousChar.addEventListener('click', () => {
            if (character.id >= 2) {
                window.location.href = `/fullcharacter.html?id=${character.id -1}`;
            }
        })


        const nextChar = Toolbox.createImg('/src/img/assets/right_arrow.png');
        Toolbox.addClass(nextChar, [
            'w-[48px]',
            'h-[48px]',
            'cursor-pointer',
            'absolute',
            'top-1/2',
            'right-[50px]',
            'fixed',
        ])
        Toolbox.append(nextChar, fullChar)
        if (character.id == 40) {
            nextChar.src = '/src/img/assets/right_arrow_gray.png';
        }
        
        nextChar.addEventListener('click', () => {
            if (character.id <= 39) {
                window.location.href = `/fullcharacter.html?id=${character.id +1}`;
            }
        })

        const characterContainer = Toolbox.createDiv();
        Toolbox.addClass(characterContainer, [
            'mt-15',
            'flex',
        ]);

        const imageBackground = Toolbox.createDiv();
        switch (character.affiliation) {
            case 'Z Fighter': imageBackground.classList.add('bg-[url(/src/img/backgrounds/earth.gif)]'); break;
            case 'Army of Frieza': imageBackground.classList.add('bg-[url(/src/img/backgrounds/friezaShip.gif)]'); break;
            case 'Other' : imageBackground.classList.add('bg-[url(/src/img/backgrounds/other.png)]'); break;
            case 'Villain' : imageBackground.classList.add('bg-[url(/src/img/backgrounds/androids.png)]'); break;
            case 'Assistant of Beerus' : imageBackground.classList.add('bg-[url(/src/img/backgrounds/beerusAssistant.png)]'); break;
        }
        if (character.name == "Celula") {
            imageBackground.classList.add('bg-[url(/src/img/backgrounds/cellArena.png)]')
        }
        Toolbox.addClass(imageBackground, [
            'w-[480px]',
            'h-[480px]',
            'flex',
            'items-center',
            'justify-center',
            'rounded-tl-lg',
            'gap-10',
        ])
        Toolbox.append(imageBackground, characterContainer);


        let transfoCounter: any = 0;
        
        const leftArrow = Toolbox.createImg('/src/img/assets/left_arrow.png');
        if (Array.isArray(character.transformations) && character.transformations.length > 0) {
            if (transfoCounter == 0) {
                leftArrow.src = '/src/img/assets/left_arrow_gray.png';
            }
            leftArrow.addEventListener('click', () => {
                if (transfoCounter == 0) {
                    return;
                }
                transfoCounter--;
                console.log('transfoCounter', transfoCounter);
                if (transfoCounter == 0) {
                    img.src = character.image;
                    leftArrow.src = '/src/img/assets/left_arrow_gray.png';
                    return;
                }
                img.src = character.transformations[transfoCounter - 1].image;
                if (transfoCounter == -1) {
                    leftArrow.src = '/src/img/assets/left_arrow_gray.png';
                } else {
                    leftArrow.src = '/src/img/assets/left_arrow.png';
                }
            });
            Toolbox.addClass(leftArrow, [
                'w-[50px]',
                'h-[50px]',
                'cursor-pointer',
            ]);
            Toolbox.append(leftArrow, imageBackground);
        }

        const img = document.createElement('img');
        img.src = character.image;
        img.alt = character.name;
        Toolbox.append(img, imageBackground);
        Toolbox.addClass(img, [
            'h-[400px]',
        ])

        if (Array.isArray(character.transformations) && character.transformations.length > 0) {
            const rightArrow = Toolbox.createImg('/src/img/assets/right_arrow.png');
            Toolbox.addClass(rightArrow, [
                'w-[50px]',
                'h-[50px]',
                'cursor-pointer',
            ]);
            rightArrow.addEventListener('click', () => {
                if (transfoCounter == character.transformations.length) {
                    return;
                }
                transfoCounter++;
                console.log('transfoCounter', transfoCounter);
                img.src = character.transformations[transfoCounter - 1].image;
                if (transfoCounter == 0) {
                    leftArrow.src = '/src/img/assets/left_arrow_gray.png';
                } else {
                    leftArrow.src = '/src/img/assets/left_arrow.png';
                }
                if (transfoCounter == character.transformations.length) {
                    rightArrow.src = '/src/img/assets/right_arrow_gray.png';
                    return;
                }
            });
            Toolbox.append(rightArrow, imageBackground);
        }

        const characterInfo = Toolbox.createDiv();
        Toolbox.addClass(characterInfo, [
            'flex',
            'flex-col',
            'items-center',
            'justify-center',
            'text-center',
            'w-[480px]',
            'h-[480px]',
            'bg-amber-100/35',
            'rounded-tr-lg',
        ]);

        const name = Toolbox.createH1(character.name);
        Toolbox.addClass(name, [
            'text-2xl',
            'font-bold',
            'mb-4',
        ]);
        Toolbox.append(name, characterInfo);

        const description = Toolbox.createP(character.description);
        Toolbox.addClass(description, [
            'text-sm',
            'mb-4',
        ]);
        Toolbox.append(description, characterInfo);

        Toolbox.append(characterInfo, characterContainer);
        Toolbox.append(characterContainer, fullChar);

        const characterStats = Toolbox.createDiv();
        Toolbox.addClass(characterStats, [
            'w-[960px]',
            'bg-amber-100/50',
            'shadow-lg',
            'p-4',
            'rounded-b-lg',
            'text-center',
        ]);

        Toolbox.append(characterStats, fullChar);

        const statsListe = Toolbox.createUl();
        Toolbox.addClass(statsListe, [
            'list-none',
            'p-0',
            'm-0',
            'grid',
            'grid-cols-2',
            'gap-4',
        ]);

        // RACE

        const raceLi = Toolbox.createLi(statsListe);
        Toolbox.addClass(raceLi, [
            'flex',
            'justify-center',
            'items-center',
            'gap-6',
        ]);
        const race = Toolbox.createH1(`Race :`);
        Toolbox.append(race, raceLi);
        Toolbox.addClass(race, [
            'text-lg',
            'font-bold',
        ]);
        const raceValue = Toolbox.createP(character.race);
        Toolbox.append(raceValue, raceLi);
        Toolbox.append(raceLi, statsListe);

        // GENRE

        const genderLi = Toolbox.createLi(statsListe);
        Toolbox.addClass(genderLi, [
            'flex',
            'justify-center',
            'items-center',
            'gap-6',
        ]);
        const gender = Toolbox.createH1(`Genre :`);
        Toolbox.append(gender, genderLi);
        Toolbox.addClass(gender, [
            'text-lg',
            'font-bold',
        ]);
        const genderValue = Toolbox.createP(character.gender);
        Toolbox.append(genderValue, genderLi);
        Toolbox.append(genderLi, statsListe);
        
        // ORIGINE

        const originLi = Toolbox.createLi(statsListe);
        Toolbox.addClass(originLi, [
            'flex',
            'justify-center',
            'items-center',
            'gap-6',
        ]);
        const origin = Toolbox.createH1(`Planète d'origine :`);
        Toolbox.append(origin, originLi);
        Toolbox.addClass(origin, [
            'text-lg',
            'font-bold',
        ]);
        const originValue = Toolbox.createP((character.originPlanet as { name: string }).name);
        Toolbox.append(originValue, originLi);
        Toolbox.append(originLi, statsListe);

        Toolbox.append(statsListe, characterStats);

        // AFFILIATION

        const affiliationLi = Toolbox.createLi(statsListe);
        Toolbox.addClass(affiliationLi, [
            'flex',
            'justify-center',
            'items-center',
            'gap-6',
        ]);
        const affiliation = Toolbox.createH1(`Affiliation :`);
        Toolbox.append(affiliation, affiliationLi);
        Toolbox.addClass(affiliation, [
            'text-lg',
            'font-bold',
        ]);
        const affiliationValue = Toolbox.createP(character.affiliation);
        Toolbox.append(affiliationValue, affiliationLi);
        Toolbox.append(affiliationLi, statsListe);

        // KI

        const kiLi = Toolbox.createLi(statsListe);
        Toolbox.addClass(kiLi, [
            'flex',
            'justify-center',
            'items-center',
            'gap-6',
        ]);
        const ki = Toolbox.createH1(`Ki :`);
        Toolbox.append(ki, kiLi);
        Toolbox.addClass(ki, [
            'text-lg',
            'font-bold',
        ]);
        const kiValue = Toolbox.createP(character.ki);
        Toolbox.append(kiValue, kiLi);
        Toolbox.append(kiLi, statsListe);

        // MaxKI

        const maxkiLi = Toolbox.createLi(statsListe);
        Toolbox.addClass(maxkiLi, [
            'flex',
            'justify-center',
            'items-center',
            'gap-6',
        ]);
        const maxki = Toolbox.createH1(`Ki potentiel :`);
        Toolbox.append(maxki, maxkiLi);
        Toolbox.addClass(maxki, [
            'text-lg',
            'font-bold',
        ]);
        const maxkiValue = Toolbox.createP(character.maxKi);
        Toolbox.append(maxkiValue, maxkiLi);
        Toolbox.append(maxkiLi, statsListe);

        // TRANSFORMATIONS

        const transformationsLi = Toolbox.createLi(statsListe);
        Toolbox.addClass(transformationsLi, [
            'flex',
            'flex-col',
            'items-center',
            'gap-4',
        ]);
        const transformations = Toolbox.createH1(`Transformations :`);
        Toolbox.append(transformations, transformationsLi);
        Toolbox.addClass(transformations, [
            'text-lg',
            'font-bold',
        ]);

        const transformationsContainer = Toolbox.createDiv();
        Toolbox.addClass(transformationsContainer, [
            'grid',
            'grid-cols-3',
            'gap-4',
        ]);

        character.transformations.forEach((t: { name: string, image: string }) => {
            const transformationDiv = Toolbox.createDiv();
            Toolbox.addClass(transformationDiv, [
                'flex',
                'flex-col',
                'items-center',
                'bg-white/35',
                'p-2',
                'rounded',
                'shadow-md',
                'hover:shadow-lg',
                'hover:scale-105',
                'transition',
                'duration-300',
                'cursor-pointer',
            ]);
            transformationDiv.addEventListener('click', () => {
                img.src = t.image;
            })

            const img = document.createElement('img');
            img.src = t.image;
            img.alt = t.name;
            Toolbox.addClass(img, ['h-[150px]', 'object-contain']);
            Toolbox.append(img, transformationDiv);

            const name = Toolbox.createP(t.name);
            Toolbox.addClass(name, ['mt-2', 'font-semibold']);
            Toolbox.append(name, transformationDiv);

            Toolbox.append(transformationDiv, transformationsContainer);
        });

        Toolbox.append(transformationsLi, statsListe);
        Toolbox.append(transformationsContainer, statsListe);



        Toolbox.append(statsListe, characterStats);
        

        
    } catch (error) {
        console.error('Error fetching character:', error);
    }
}

if (characterId) {
    fetchCharacterByHisId(characterId)
} else {
    console.error('No character ID provided in the URL');
}
export class Toolbox {
    constructor() {
    }

    static createH1(text: any): any {
        const h1 = document.createElement('h1');
        h1.textContent = text;
        return h1;
    }

    static createP(text: any): any {
        const p = document.createElement('p');
        p.textContent = text;
        return p;
    }

    static createUl(): HTMLUListElement {
        return document.createElement('ul');
    }

    static createLi(ul: HTMLUListElement): HTMLLIElement {
        const li = document.createElement('li');
        ul.appendChild(li);
        return li;
    }

    static createDiv(): HTMLDivElement {
        return document.createElement('div');
    }

    static createImg(path: string): HTMLImageElement {
        const img = document.createElement('img');
        img.src = path;
        return img;
    }

    static append(el1: any, el2: HTMLElement): void {
        if (el1 && el2) {
            el2.appendChild(el1);
        } else {
            console.error('Both elements must be defined to append.');
        }
    }

    static addClass(el: HTMLElement, className: any): void {
        if (el && className) {
            if (typeof className === 'string') {
                el.classList.add(className);
            }
            else if (Array.isArray(className)) {
                className.forEach(cls => {
                    if (typeof cls === 'string') {
                        el.classList.add(cls);
                    } else {
                        console.error('Class name must be a string.');
                    }
                });
            }
        }
        else {
            console.error('Element and class name must be defined to add a class.');
        }
    }
}
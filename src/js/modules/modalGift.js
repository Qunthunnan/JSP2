import { Modal } from "./modal";
export class OneTimeModal extends Modal {
    constructor(entries, modalClass, activityClass, contentClass, closeBtnClass, customAnimation) {
        super(entries, modalClass, activityClass, contentClass, closeBtnClass, customAnimation);
    }
    showModal() {
        const modalElement = document.querySelector(`.${this.modalClass}`);
        const modalContent = document.querySelector(`.${this.modalClass} .${this.contentClass}`);
        let entryElemens = [];
        for(let i in this.entries) {
            entryElemens.push(document.querySelectorAll(`.${this.entries[i]}`));
            entryElemens[i].forEach(element => {
                element.remove();
            });
        }

        modalElement.classList.add(this.activityClass);
        const animationOpen = modalContent.animate([
            {
                transform: 'translateX(-50%) scale(0.1)',
                top: '-22%',
                opacity: 0,
                borderRadius: '170px',
            },
            {
                transform: 'translateX(-50%) scale(1)',
                top: '10%',
                opacity: 1,
                borderRadius: '20px',
            }
        ], { duration: 400, iterations: 1, easing: 'ease', fill: 'forwards' });

        setTimeout(()=> {
            modalElement.addEventListener('click', this.closeModal);
        }, 400); 
    }
}
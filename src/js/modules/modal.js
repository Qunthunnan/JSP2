export class Modal {
    constructor(entries, modalClass, activityClass, contentClass, closeBtnClass, customAnimation) {
        this.entries = entries;
        this.modalClass = modalClass;
        this.activityClass = activityClass;
        this.contentClass = contentClass;
        this.closeBtnClass = closeBtnClass;

        for (let i in entries) {
            this.setModalLink(entries[i]);
        }
    }

    setModalLink(link) {
        const linkElements = document.querySelectorAll(`.${link}`);

        linkElements.forEach(element => {
            element.addEventListener('click', e => {
                this.showModal();
            });
        });
    }

    closeModal  = (e = {target:this.closeBtnClass}) => {
        if (e.target.matches(`.${this.closeBtnClass}`) || !e.target.matches(`.${this.contentClass}`) && !e.target.closest(`.${this.contentClass}`) && e.target.classList[0] !== 'ripple') {
            const modalElement = document.querySelector(`.${this.modalClass}`);
            const modalContent = document.querySelector(`.${this.modalClass} .${this.contentClass}`);
            const amimationClose = modalContent.animate([
                {
                    transform: 'translateX(-50%) scale(1)',
                    top: '10%',
                    opacity: 1,
                    borderRadius: '20px',
                },
                {
                    transform: 'translateX(-50%) scale(0.1)',
                    top: '-22%',
                    opacity: 0,
                    borderRadius: '170px',
                }
            ], { duration: 400, iterations: 1, easing: 'ease', fill: 'forwards' });

            amimationClose.finished.then( result => {
                modalElement.classList.remove(this.activityClass);
                modalElement.removeEventListener('click', close);
            });
        }
    }

    showModal() {
        const modalElement = document.querySelector(`.${this.modalClass}`);
        const modalContent = document.querySelector(`.${this.modalClass} .${this.contentClass}`);

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

    shake() {
        const modalContent = document.querySelector(`.${this.modalClass} .${this.contentClass}`);
        modalContent.animate([
            {
                transform: 'translate(-52%, 2%)'
            },
            {
                transform: 'translate(-48%, -2%)'
            },
            {
                transform: 'translateX(-52%)'
            },
            {
                transform: 'translateX(-48%)'
            }
        ], {duration: 200, easing: 'ease'});
    }
}
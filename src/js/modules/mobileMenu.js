export class MobileMenu {
    constructor(buttonClass, menuClass) {
        this.buttonClass = buttonClass;
        this.menuClass = menuClass;
        
        this.isOpened = false;
        
        this.button = document.querySelector(`.${this.buttonClass}`);
        this.menu = document.querySelector(`.${this.menuClass}`);

    }

    buildMobile() {
        this.button.addEventListener('click', this.showMenu);
    }

    showMenu = (e) => {
        this.menu.style.display = 'block';
        this.isOpened = true;
        e.key = true;
        
        this.button.removeEventListener('click', this.showMenu);
        document.addEventListener('click', this.hideMenu);
    }

    hideMenu = (e) => {
        if(!e.key) { 
            this.menu.style.display = 'none';
            this.isOpened = false;

            document.removeEventListener('click', this.hideMenu);
            this.button.addEventListener('click', this.showMenu);
        }
    }

    buildDefault() {
        if(this.isOpened) {
            document.removeEventListener('click', this.hideMenu);
            this.menu.style.display = 'none';
            this.isOpened = false;
        } else {
            this.button.removeEventListener('click', this.showMenu);
        }
    }
}

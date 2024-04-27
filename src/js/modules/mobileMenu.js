export class mobileMenu {
    constructor(buttonClass, menuClass, parentDefaultClasses, subMenusClass) {
        this.buttonClass = buttonClass;
        this.menuClass = menuClass;
        this.subMenusClass = subMenusClass;
        this.parentDefaultClasses = parentDefaultClasses;
        
        this.button = document.querySelector(`.${this.buttonClass}`);
        this.menu = document.querySelector(`.${this.menuClass}`);
        this.subMenus = document.querySelectorAll(`.${this.subMenusClass}`);

        this.mobileMenuParentStyles = 'display: none; z-index: 1; background: white; left: 110px; position: absolute; top: 62px;';
        this.mobileMenuStyles = 'flex-direction: column; display: flex;';
        this.mobileElementsStyles = 'position: relative';
    }

    buildMobile() {
        this.menu.parentElement.classList.remove(...this.parentDefaultClasses);
        this.menu.parentElement.cssText = this.mobileMenuParentStyles;

        this.subMenus.forEach(subMenu => {
            
        });
        
        this.button.addEventListener('click', this.showMenu);
    }

    showMenu = (e) => {
        document.addEventListener('click', this.hideMenu)
    }

    hideMenu = (e) => {
        if(!e.target.closest(this.menuClass)) {
            this.menu.style.display = 'none';
        }
    }

    showSubMenu() {

    }

    buildDefault() {

    }
}

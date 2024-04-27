export default class Filters {
    constructor(menuClass, wrapperClass, blocksClass, notFoundClass) {
        this.menuClass = menuClass;
        this.wrapperClass = wrapperClass;
        this.notFoundClass = notFoundClass;

        this.menu = document.querySelector(`.${this.menuClass}`);
        this.wrapper = document.querySelector(`.${this.wrapperClass}`);
        this.blocks = this.wrapper.querySelectorAll(`.${blocksClass}`);
        this.notFound = document.querySelector(`.${this.notFoundClass}`);

        this.menu.addEventListener('click', this.changeFilter);
        if(this.menu.querySelector('.active')) {
            this.menu.children[0].classList.add('active');
        }

        this.contentUpdate(this.menu.querySelector('.active').classList[0]);
    }

   changeFilter = (e) => {
    if(e.target.matches('li') && !e.target.classList.contains('active')) {
        this.menu.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');

        const targetFilter = e.target.classList[0];
        this.contentUpdate(targetFilter);
    }
   }

   contentUpdate(filter) {
    if(!this.wrapper.querySelector(`.${filter}`))
        this.notFound.style.display = 'block';
    else
        this.notFound.style.display = 'none';

    this.blocks.forEach(block => {
        if(block.classList.contains(filter)) 
            block.style.display = 'block';
         else 
            block.style.display = 'none';
    });
   }
}
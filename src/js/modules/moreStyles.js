export default (buttonClass) => {
    const button = document.querySelector(`.${buttonClass}`);
    const targetWrapper = button.parentElement.querySelector('.row');
    const showClasses = [ 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1'];
    const hidenClasses = ['hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs', 'styles-2'];

    const addBlocks = (e) => {
        for(let block of targetWrapper.children) {
            if(block.matches(`.${hidenClasses[0]}`)) {
                block.classList.remove(...hidenClasses);
                block.classList.add(...showClasses);
            }
        }
        
        button.remove();
    }

    button.addEventListener('click', addBlocks, {
        once: true
    });
}
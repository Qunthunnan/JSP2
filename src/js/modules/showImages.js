export default function showImages (blocksClass, imagesPath) {
    const blocks = document.querySelectorAll(`.${blocksClass}`);
    const plugImages = [];
    const images = imagesPath;

    function getImageId(target) {
        const image = target.querySelector('img');
        const id = -1 + +image.classList[0].replace(/\D/g, '');
        return id;
    }

    const hideImage = (e) => {
        for(let child of e.target.children) {
            if(child.nodeName === 'IMG')
                child.setAttribute('src', `${plugImages[getImageId(e.target)]}`);
            else
                child.style.display = 'block';
        }
    }

    const showImage = (e) => {
        for(let child of e.target.children) {
            if(child.nodeName === 'IMG')
                child.setAttribute('src', `${images[getImageId(e.target)]}`);
            else
                if(!child.classList.contains('sizes-hit'))
                    child.style.display = 'none';
        }

        e.target.addEventListener('mouseleave', hideImage, {
            once: true
        });
    }

    blocks.forEach(block => {
        block.addEventListener('mouseenter', showImage);
        plugImages.push(block.querySelector('img').getAttribute('src'));
    });
}
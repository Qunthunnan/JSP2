export default function () {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', e => {
            if(link.hash[0] === '#') {
                e.preventDefault();
                goToElement(link.hash);
            }
        });
    });

    function goToElement(hash) {
        const targetElement = document.querySelector(hash);
        if(targetElement) {
            const speed = 150;

            const rects = targetElement.getBoundingClientRect();
    
            requestAnimationFrame(scrollFrame);
    
            function scrollFrame(time) {
                if(Math.round(rects.top) > Math.round(document.documentElement.scrollTop) && 
                Math.round(rects.top) > Math.round(document.documentElement.scrollTop + speed) &&
                document.documentElement.scrollTop < document.documentElement.scrollHeight - window.innerHeight) {
                    document.documentElement.scrollTop += speed;
    
                    requestAnimationFrame(scrollFrame);
                }
    
                if(Math.round(rects.top) < Math.round(document.documentElement.scrollTop) && 
                Math.round(rects.top) < Math.round(document.documentElement.scrollTop - speed) &&
                document.documentElement.scrollTop > 0) {
                    document.documentElement.scrollTop -= speed;
    
                    requestAnimationFrame(scrollFrame);
                }
            }
        }
    }
}
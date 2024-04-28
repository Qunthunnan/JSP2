import {feedbackSlider, mobileMenu} from '../main';

export default function adaptation() {
    const displaySizes = [
           window.matchMedia('(min-width: 1400px)'), 
           window.matchMedia('(max-width: 1399px)'),
           window.matchMedia('(max-width: 1199px)'),
           window.matchMedia('(max-width: 991px)'),
           window.matchMedia('(max-width: 767px)'),
           window.matchMedia('(max-width: 575px)')
        ];

    for (let display of displaySizes) {
        display.addEventListener('change', (e) => {
            adapt(display);
        });

        if(display.matches) {
            adapt(display);
        }
    }

    function adapt(display) {
        if(+display.media.replace(/\D/g, '') < 992) {
            feedbackSlider.removeButtons();

            mobileMenu.buildMobile();
        } else {
            feedbackSlider.generateButtons();

            mobileMenu.buildDefault();
        }
    }
}


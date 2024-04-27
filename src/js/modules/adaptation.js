import {feedbackSlider, mainSlider} from '../main';

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
            if(display.matches) {
                feedbackSlider.rebuildSlider();
                mainSlider.rebuildSlider();
                if(+display.media.replace(/\D/g, '') < 992) {
                    feedbackSlider.removeButtons();
                } else {
                    feedbackSlider.generateButtons();
                }
            }
        });
    }
}
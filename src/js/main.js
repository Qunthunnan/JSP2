import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import '@/assets/less/main.less';
import { Modal } from './modules/modal';
import { OneTimeModal } from './modules/modalGift';
import { Slider } from './modules/slider';

const designModal = new Modal(['button-design'], 'popup-design', 'active', 'popup-content', 'popup-close'),
      consultationModal = new Modal(['button-consultation'], 'popup-consultation', 'active', 'popup-content', 'popup-close'),
      giftModal = new OneTimeModal(['fixed-gift'], 'popup-gift', 'active', 'popup-content', 'popup-close'),
      mainSlider = new Slider({
        sliderClass: 'main-slider',
        vertical: true,
        scrolling: true,
        arrows: true,
        autoplay: false,
        dragging: false,
        autoplay: 1000,
        buttonsImage: require('../assets/img/right-arr.png'),
      });
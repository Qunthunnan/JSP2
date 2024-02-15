import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import '@/assets/less/main.less';
import { Modal } from './modules/modal';
import { OneTimeModal } from './modules/modalGift';

const designModal = new Modal(['button-design'], 'popup-design', 'active', 'popup-content', 'popup-close'),
      consultationModal = new Modal(['button-consultation'], 'popup-consultation', 'active', 'popup-content', 'popup-close'),
      giftModal = new OneTimeModal(['fixed-gift'], 'popup-gift', 'active', 'popup-content', 'popup-close');

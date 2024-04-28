import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import '@/assets/less/main.less';
import { Modal } from './modules/modal';
import { OneTimeModal } from './modules/modalGift';
import { Slider } from './modules/slider';
import { Form } from './modules/form';
import { ModalMessage } from './modules/formMessageModal';
import { Calculator } from './modules/calculator';
import mobileMaskInput from './modules/mobileMask';
import {numberValidation} from './modules/mobileMask';
import moreStyles from './modules/moreStyles';
import Filters from './modules/filters';
import showImages from './modules/showImages';
import faqList from './modules/faqList';
import timerModal from './modules/timerModal';
import adaptation from './modules/adaptation';
import { MobileMenu } from './modules/mobileMenu';

let appState = {
  curentOpenedModal: undefined,
}

const modals = {
  'popup-design': new Modal(['button-design'], 'popup-design', 'active', 'popup-content', 'closeModal'),
  'popup-consultation': new Modal(['button-consultation'], 'popup-consultation', 'active', 'popup-content', 'closeModal'),
  'popup-gift': new OneTimeModal(['fixed-gift'], 'popup-gift', 'active', 'popup-content', 'closeModal'),
  messageDone : new ModalMessage('messageDone', 'active', 'popup-content', 'closeModal'),
  messageError : new ModalMessage('messageError', 'active', 'popup-content', 'closeModal'),
},

mainSlider = new Slider({
  sliderClass: 'main-slider',
  vertical: true,
  scrolling: true,
  arrows: false,
  dragging: true,
  autoplay: 10000,
}),
feedbackSlider = new Slider({
  sliderClass: 'feedback-slider',
  vertical: false,
  arrows: true,
  autoplay: false,
  buttonsImage: require('../assets/img/right-arr.png')
}),

defaultRules = {
  name: {
    min: 2,
    max: 256,
    reg: /^[А-яЎўїІіҐґЄєЁё ]*$/
  },
  phone: {
    customInputValidator: numberValidation
      },
  email: {
    reg: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
  },
  message: {
    max: 2000,
    reg: /^[А-яЎўїІіҐґЄєЁё ]*$/
  }
},
shortRules = {
  name: {
    min: 2,
    max: 256,
    reg: /^[А-яЎўїІіҐґЄєЁё ]*$/
  },
  phone: {
    customInputValidator: numberValidation
  },
},
calculatorRules = {
  size: {
    requiredSelect: 'data-value'
  },
  material: {
    requiredSelect: 'data-value'
  },
  promo: {
    reg: /^[A-z0-9]*$/
  }
},
defaultMessages = {
  name: {
    min: 'Треба ввести як мінімум 2 символи',
    max: 'Максимальна кількість символів у імені: 256',
    reg: "Введіть ім'я, використовуючи кирилицю"
  },
  phone: {
    customInputValidator: 'Перевірте, чи правильно ввели номер телефону'
  },
  email: {
    reg: 'Перевірте, чи правильно ввели пошту'
  },
  message: {
    max: 'Максимальна можлива кількість символів у комментарі: 2000',
    reg: 'Якщо хочете залишити коментар до замовлення, напишіть його кирилицею'
  }
},
shortMessages = {
  name: {
    min: 'Треба ввести як мінімум 2 символи',
    max: 'Максимальна кількість символів у імені: 256',
    reg: "Введіть ім'я, використовуючи кирилицю"
  },
  phone: {
    customInputValidator: 'Перевірте, чи правильно ввели номер телефону'
  },
},
calculatorMessages = {
  size: {
    requiredSelect: 'Для розрахунку ціни, треба обрати розмір картини'
  },
  material: {
    requiredSelect: 'Для розрахунку ціни, треба обрати матеріал картини'
  },
  promo: {
    reg: 'Перевірте, чи правильно ввели промокод'
  }
},

prices = {
  size: [undefined, 500, 1000, 1500, 2000],
  material: [undefined, 1500, 2000, 3000],
  extra: [undefined, 500, 500, 250],
},

promo = {
  'IWANTPOPART': 0.7
},

designForm = new Form('designForm', defaultRules, defaultMessages),
consultationForm = new Form('consultationForm', defaultRules, defaultMessages),
mainForm = new Form('mainForm', shortRules, shortMessages),
calculatorForm = new Calculator ('calculatorForm', calculatorRules, calculatorMessages, prices, promo, 'calc-price');

mobileMaskInput('mobilePhone');

moreStyles('button-styles');

const filterPorfolio = new Filters('portfolio-menu', 'portfolio-wrapper', 'portfolio-block', 'portfolio-no');

showImages('sizes-block', [
  'images/sizes-1-1.png',
  'images/sizes-2-1.png',
  'images/sizes-3-1.png',
  'images/sizes-4-1.png'
]);

faqList('accordion-heading', 'ui-accordion-header-active', 'accordion-block');

timerModal('popup-gift', 'popup-consultation', 60000);

const mobileMenu = new MobileMenu('burger', 'burger-menu');

adaptation();


export { appState, modals, mainSlider, feedbackSlider, mobileMenu }
      
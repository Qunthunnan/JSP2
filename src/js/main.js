import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import '@/assets/less/main.less';
import { Modal } from './modules/modal';
import { OneTimeModal } from './modules/modalGift';
import { Slider } from './modules/slider';
import { Form } from './modules/form';
import { ModalMessage } from './modules/formMessageModal';

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

  designForm = new Form('designForm', {
    name: {
      min: 2,
      max: 256,
      reg: /^[А-яЎўїІіҐґЄєЁё ]*$/
    },
    phone: {
      reg: /\S/
        },
    email: {
      reg: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
    },
    message: {
      max: 2000,
      reg: /^[А-яЎўїІіҐґЄєЁё ]*$/
    }
  },
    {
      name: {
        min: 'Треба ввести як мінімум 2 символи',
        max: 'Максимальна кількість символів у імені: 256',
        reg: "Введіть ім'я, використовуючи кирилицю"
      },
      phone: {
        reg: 'Перевірте, чи правильно ввели номер телефону'
      },
      email: {
        reg: 'Перевірте, чи правильно ввели пошту'
      },
      message: {
        max: 'Максимальна можлива кількість символів у комментарі: 2000',
        reg: 'Якщо хочете залишити коментар до замовлення, напишіть його кирилицею'
      }
    }),
    
    consultationForm = new Form('consultationForm', {
      name: {
        min: 2,
        max: 256,
        reg: /^[А-яЎўїІіҐґЄєЁё ]*$/
      },
      phone: {
        reg: /\S/
          },
      email: {
        reg: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
      },
      message: {
        max: 2000,
        reg: /^[А-яЎўїІіҐґЄєЁё ]*$/
      }
    },
    {
      name: {
        min: 'Треба ввести як мінімум 2 символи',
        max: 'Максимальна кількість символів у імені: 256',
        reg: "Введіть ім'я, використовуючи кирилицю"
      },
      phone: {
        reg: 'Перевірте, чи правильно ввели номер телефону'
      },
      email: {
        reg: 'Перевірте, чи правильно ввели пошту'
      },
      message: {
        max: 'Максимальна можлива кількість символів у комментарі: 2000',
        reg: 'Якщо хочете залишити коментар до замовлення, напишіть його кирилицею'
      }
    }
  ),
  
  mainForm = new Form('mainForm', {
    name: {
      min: 2,
      max: 256,
      reg: /^[А-яЎўїІіҐґЄєЁё ]*$/
    },
    phone: {
      reg: /\S/
        },
  },
  {
    name: {
      min: 'Треба ввести як мінімум 2 символи',
      max: 'Максимальна кількість символів у імені: 256',
      reg: "Введіть ім'я, використовуючи кирилицю"
    },
    phone: {
      reg: 'Перевірте, чи правильно ввели номер телефону'
    },
  });

    export { appState, modals }
      
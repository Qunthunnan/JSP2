import { appState } from '../main';
import { modals } from '../main';
export default function timerModal(bottomModalClass, timerModal, timerOffset) {
    const showBottomModal = (e) => {
        if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && !appState.curentOpenedModal) {
            modals[bottomModalClass].showModal();

            window.removeEventListener('scroll', showBottomModal);
        }
    }

    window.addEventListener('scroll', showBottomModal); 

    setTimeout(() => {
        if(!appState.curentOpenedModal) {
            modals[timerModal].showModal();
        }
    }, timerOffset);
}
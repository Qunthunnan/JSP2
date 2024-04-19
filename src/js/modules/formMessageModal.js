import { Modal } from "./modal.js";

export class ModalMessage extends Modal {
    constructor(modalClass, activityClass, contentClass, closeBtnClass, customAnimation) {
        super(undefined, modalClass, activityClass, contentClass, closeBtnClass, customAnimation)
        this.modalClass = modalClass;
        this.activityClass = activityClass;
        this.contentClass = contentClass;
        this.closeBtnClass = closeBtnClass;
    }

    setModalLink() {
        
    }
}
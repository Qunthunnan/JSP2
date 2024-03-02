export class Slider {
    constructor(sliderClass, vertical = false, arrows = true) {
        this.sliderClass = sliderClass;
        this.slider = document.querySelector(`.${sliderClass}`);
        this.sliderFrame = document.createElement('div');
        this.sliderFrame.style.cssText = 'overflow-y: hiden';
    }
}
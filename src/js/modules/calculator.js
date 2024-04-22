import { Form } from "./form";
export class Calculator extends Form {
    constructor(formClass, rules, messages, prices, promo, resultBlockClass) {
        super(formClass, rules, messages);
        this.prices = prices;
        this.promo = promo;
        this.resultBlockClass = resultBlockClass;
        this.resultBlock = this.formElement.querySelector(`.${this.resultBlockClass}`);
        this.resultBlockContent = this.resultBlock.innerHTML;
    }

    submitForm() {
        if(this.validateForm()) {
            if(this.isListenedInputs)
                this.removeInputListeners();
            this.sendForm();
        } else {
            this.resultBlock.innerHTML = this.resultBlockContent;
            if(!this.isListenedInputs) {
                this.addInputListeners();
            }
        }
    }


    sendForm() {
        this.resultBlock.innerHTML = '';

        const form = new FormData(this.formElement);
        let userData = Object.fromEntries(form.entries());

        for(let element of this.formElement) {
            if(element.nodeName === 'SELECT') {
                const selectedElement = element[element.selectedIndex];
                if(selectedElement.getAttribute(`data-value`)) {
                    userData[element.getAttribute('name')] = selectedElement.getAttribute(`data-value`);
                }
            }
        }

        let resultPrice = 0;

        for(let i in this.prices) {
            const select = this.formElement.querySelector(`[name=${i}]`);
            if(this.prices[i][select.selectedIndex]) {
                resultPrice += this.prices[i][select.selectedIndex];
            }
        }

        if(userData.promo && this.promo[userData.promo]) {
            const priceNoPromoElement = document.createElement('h4');
            priceNoPromoElement.textContent = `${resultPrice}₴`;
            priceNoPromoElement.style.cssText = 'text-decoration: line-through;'

            resultPrice*=this.promo[userData.promo];

            const pricePromoElement = document.createElement('h3');
            pricePromoElement.textContent = `${resultPrice}₴`;

            this.resultBlock.append(priceNoPromoElement);
            this.resultBlock.append(pricePromoElement);
        } else {
            const price = document.createElement('h3');
            price.textContent = `${resultPrice}₴`;
            
            this.resultBlock.append(price);
        }
    }
}


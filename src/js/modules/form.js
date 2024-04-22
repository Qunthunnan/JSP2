import { appState, modals } from "../main";
import loader from "../../assets/img/tube-spinner.svg";

export class Form {
    constructor(formClass, rules, messages) {
        this.formClass = formClass;
        this.formElement = document.querySelector(`.${formClass}`);
        this.rules = rules;
        this.messages = messages;
        this.inputs = [];
        for (let input in rules) {
            this.inputs.push(input);
        }
        this.results = {}
        this.errors = {}
        for (let i in this.inputs) {
            this.results[this.inputs[i]] = true;
            this.errors[this.inputs[i]] = '';
        }

        this.isListenedInputs = false;

        this.formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    }

    addInputListeners() {
        this.isListenedInputs = true;
        for(let i in this.inputs) {
            const input = this.formElement.querySelector(`[name=${this.inputs[i]}]`);
            input.addEventListener('input', this.inputListenerFunction);
        }
    }

    removeInputListeners() {
        this.isListenedInputs = false;
        for(let i in this.inputs) {
            const input = this.formElement.querySelector(`[name=${this.inputs[i]}]`);
            input.removeEventListener('input', this.inputListenerFunction);
        }
    }

    inputListenerFunction = (event) => {
        const listenedInput = event.target;
        const inputName = listenedInput.getAttribute('name');
        this.validateInput(inputName);
    }

    submitForm() {
        if(this.validateForm()) {
            if(this.isListenedInputs)
                this.removeInputListeners();
            this.sendForm();
        } else {
            if(!this.isListenedInputs) {
                this.addInputListeners();
            }
        }
    }

    validateForm() {
        for(let i in this.inputs) {
            this.validateInput(this.inputs[i]);
        }

        if(Object.values(this.results).some(result => result === false))
            return false;
        return true;
    }

    validateInput(inputName) {
        this.results[inputName] = true;
        this.errors[inputName] = '';

        if(this.rules[inputName].min) {
            if(!this.validateMin(inputName)) {
                this.results[inputName] = false;
                this.errors[inputName] = this.messages[inputName].min;
            }
        }

        if(this.rules[inputName].max) {
            if(!this.validateMax(inputName)) {
                this.results[inputName] = false;
                this.errors[inputName] = this.messages[inputName].max;
            }
        }

        if(this.rules[inputName].reg) {
            if(!this.validateReg(inputName)) {
                this.results[inputName] = false;
                this.errors[inputName] = this.messages[inputName].reg;
            }
        }

        if(this.rules[inputName].requiredSelect) {
            if(!this.validateRequiredSelect(inputName)) {
                this.results[inputName] = false;
                this.errors[inputName] = this.messages[inputName].requiredSelect;
            }
        }

        this.updateErrors(inputName);
        return this.results[inputName];
    }

    validateMin(inputName) {
        const validatedInput = this.formElement.querySelector(`[name=${inputName}]`);
        if(validatedInput.value.length < this.rules[inputName].min) {
            return false;
        } 
        return true;
    }

    validateMax(inputName) {
        const validatedInput = this.formElement.querySelector(`[name=${inputName}]`);
        if(validatedInput.value.length > this.rules[inputName].max) {
            return false;
        } 
        return true;
    }

    validateReg(inputName) {
        const validatedInput = this.formElement.querySelector(`[name=${inputName}]`);
        if(this.rules[inputName].reg.test(validatedInput.value)) {
            return true;
        } 
        return false;
    }

    validateRequiredSelect(selectName) {
        const validatedSelect = this.formElement.querySelector(`[name=${selectName}]`);
        if(validatedSelect.options[validatedSelect.selectedIndex].getAttribute(this.rules[selectName].requiredSelect)) {
            return true;
        }
        return false;
    }

    updateErrors(name) {
        const errorUpdater = (inputName) => {
            let errorLabel = this.formElement.querySelector(`[data-error=${inputName}]`);
            const errorInput = this.formElement.querySelector(`[name=${inputName}]`);
            if(this.errors[inputName].length > 0) {
                if(!errorLabel) {
                    errorLabel = document.createElement('label');
                    errorLabel.setAttribute('data-error', inputName);
                    errorLabel.classList.add('errorLabel');
                    errorInput.after(errorLabel);
                }
                if(!errorInput.classList.contains('errorInput')) {
                    errorInput.classList.add('errorInput');
                }
                errorLabel.textContent = this.errors[inputName];
            } else {
                if(errorLabel) {
                    errorLabel.remove();
                }
                if(errorInput.classList.contains('errorInput')) {
                    errorInput.classList.remove('errorInput');
                }
            }
        }

        if(name) {
            errorUpdater(name);
        } else {
            for (let inputName in this.errors) {
                errorUpdater(inputName);
            }
        }
    }

    async sendForm() {
        if(appState.curentOpenedModal) {
            modals[appState.curentOpenedModal].closeModal();
        }

        const loaderOverlay = document.createElement('div');
        loaderOverlay.classList.add('loaderOverlay');
        loaderOverlay.style.cssText = 'height: 100vh;  width: 100vw; background: rgba(178, 80, 188, 0.8); position: fixed; top: 0px; left: 0px; display: flex; align-items: center; justify-content: center';
        loaderOverlay.innerHTML = `<img style="height: 100px" src="${await loader}" alt="loader">`;
        document.documentElement.append(loaderOverlay);

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
        
        const response = await fetch('/server.php', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(userData)
        }).then(response => {
            loaderOverlay.remove();
            if(response.ok) {
                this.formElement.reset();
                modals.messageDone.showModal();
            } else {
                console.error(response.status, response.statusText);
                modals.messageError.showModal();
            }
        })
    }
}
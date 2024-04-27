import matrixes from './matrix.json';

export const recursiveSearch = (searchValue) => {
    if(searchValue === '') {
        return undefined;
    }

    for (let mask of matrixes.countries) {
        if(searchValue && mask.replace(/\D/g, '').slice(0, 6).search(new RegExp(`^${searchValue}`)) !== -1) {
            let i = 0;
            return mask.replace(/./g, char => {
                if(/\d/.test(char)) {
                    if(i >= searchValue.length) {
                        i++;
                        return '_';
                    }
                    i++;
                    return char;
                }
                return char;
            });
        }
    }

    return recursiveSearch(searchValue.slice(0, -1));
}

export const numberValidation = (input) => {
    const searchValue = input.value.replace(/\D/g, '');
    const targetMask = recursiveSearch(searchValue);

    if (targetMask && targetMask.replace(/[\(\)\-\+]/g, '').length === searchValue.length )
        return true;
    return false;
}

export default (inputsClass) => {

    const inputs = document.querySelectorAll(`.${inputsClass}`);
    let previusValue = '';

    const maskFunction = (event) => {
        const searchValue = event.target.value.replace(/\D/g, '');
        const targetMask = recursiveSearch(searchValue);
        previusValue = searchValue;
        let i = 0;

        if(targetMask) {
            event.target.value = targetMask.replace(/./g, (char) => {
                if(char === '_' && searchValue.length > i) {
                    const result = searchValue[i];
                    i++;
                    return result;
                } else {
                    if(/\d/.test(char) && targetMask.replace(/\D/g, '')[i] === searchValue[i]) {
                        i++;
                        return char;
                    }
                    return char;
                }
            });

        } else
            event.target.value = '+';

        setActualPosition(event.target);
    }

    const getActualCursorPosition = (value) => {
        for(let i = value.length - 1; i >= 0; i--) {
            if(/\d/.test(value[i]) || value[i] === '+') {
                return i + 1;
            }
        }
    } 

    const setActualPosition = (input) => {
        const actualPosition = getActualCursorPosition(input.value);
        setTimeout(()=>{
            input.setSelectionRange(actualPosition, actualPosition);
        }, 0);
    }

    const focusFunction = (event) => {
        setActualPosition(event.target);
    }

    inputs.forEach(input => {
        input.addEventListener('input', maskFunction);
        input.addEventListener('click', focusFunction);
    }); 
}
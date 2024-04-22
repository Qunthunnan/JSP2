import matrixes from './matrix.json';
export const mobileMaskInput = (inputsClass) => {

    const inputs = document.querySelectorAll(`.${inputsClass}`);
    let previusValue = '';

    const recursiveSearch = (searchValue) => {
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

    const maskFunction = (event) => {
        const searchValue = event.target.value.replace(/\D/g, '').slice(0, 6);
        const targetMask = recursiveSearch(searchValue);
        previusValue = searchValue;
        let i = 0;
        console.log(targetMask);

        if(targetMask) {
            event.target.value = targetMask.replace(/./, (char) => {
                if(char === '_' && searchValue.length > i) {
                    return searchValue[i];
                    i++;
                } else 
                    return char;
            });

            setActualPosition(event.target);
        }

        //Починає введення з плюсу
        //Починає без плюсу
        //Стирає символи від маски + - () (треба перезаписувати назад ці символи)
    }

    const getActualCursorPosition = (value) => {
        for(let i = value.length - 1; i >= 0; i--) {
            if(/\d/.test(value[i])) {
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
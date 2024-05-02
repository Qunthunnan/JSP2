import { appState } from "../main";

const inputs = document.querySelectorAll('input[type=file]');
let inputsComments = [];
let inputsStyles = [];

inputs.forEach(input => {
    inputsComments.push(input.previousElementSibling.textContent);
    inputsStyles.push(getComputedStyle(input));
});

export function uploadImages () {

    function setFile(file) {
        appState.file = file;
        let fileName;

        if(file.name.replace(/(.*)(\.[A-z0-9]*)/, '$1').length > 7) {
            fileName = `${file.name.replace(/(.*)(\.[A-z0-9]*)/, '$1').substring(0, 7)}...${file.name.replace(/(.*)(\.[A-z0-9]*)/, '$2')}`; 
        } else {
            fileName = file.name;
        }
        inputs.forEach(input => {
            input.previousElementSibling.textContent = fileName;
        });
    }

    function checkaFileType(file) {
        if(file && file.type.split('/')[0] === 'image')
            return true;
        else
            return false;
    }

    inputs.forEach(input => {
        const inputStyles = getComputedStyle(input);
        input.addEventListener('input', e => {
            const file = input.files[0];
            setFile(file);
        });


        input.addEventListener('dragenter', e => {
            input.parentElement.querySelector('button').style.cssText += 'transition: all 0.5s; -webkit-box-shadow: 0px 0px 59px 12px rgba(171,255,150,1); -moz-box-shadow: 0px 0px 59px 12px rgba(171,255,150,1); box-shadow: 0px 0px 59px 12px rgba(171,255,150,1);';
        });
    
        input.addEventListener('dragleave', e =>  {
            input.parentElement.querySelector('button').style.cssText = '0';
        });

        input.addEventListener('drop', e => {
            e.preventDefault();
            e.stopPropagation();

            console.log(e.dataTransfer.files);
            console.log(e.dataTransfer.files[0].type.split('/')[0]);
            if(checkaFileType(e.dataTransfer.files[0])) {
                setFile(e.dataTransfer.files[0]);
                input.parentElement.querySelector('button').style.cssText = 'transition: all 5s;';
            } else {
                input.parentElement.querySelector('button').style.cssText = 'transition: unset; -webkit-box-shadow: 0px 0px 59px 12px rgba(237,64,64,1); -moz-box-shadow: 0px 0px 59px 12px rgba(237,64,64,1); box-shadow: 0px 0px 59px 12px rgba(237,64,64,1);';
                setTimeout(() => {
                    input.parentElement.querySelector('button').style.cssText = 'transition: all 5s;';
                });
            }
        });
    });
}

export function fileValidator() {
    if(appState.file)
        return true;
    else return false;
}

export function resetImageComments() {
    inputs.forEach((input, i) => {
        input.previousElementSibling.textContent = inputsComments[i];
    });
}
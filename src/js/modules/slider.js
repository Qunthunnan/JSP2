export class Slider {
    constructor(sliderClass, vertical = false, arrows = true, autoplay = 10000) {
        this.sliderClass = sliderClass;
        this.slider = document.querySelector(`.${sliderClass}`);
        this.slider.style.overflow = 'hidden';
        this.slidesRealCount = this.slider.childElementCount;
        this.slidesFakeCount = this.slidesRealCount + 2;
        this.curentFakeIndex = 1;
        this.curentTrueIndex = 0;
        this.sliderTrack = document.createElement('div');
        this.sliderTrack.classList.add('slider-track');
        while (this.slider.childElementCount > 0) {
            this.sliderTrack.append(this.slider.children[0]);
        }
        this.sliderTrack.prepend(this.sliderTrack.children[this.sliderTrack.childElementCount - 1].cloneNode(true));
        this.sliderTrack.append(this.sliderTrack.children[1].cloneNode(true));

        this.slider.append(this.sliderTrack);
        this.sizeMap = [];
        this.sliderHeight = 0;
        for(let i of this.sliderTrack.children) {
            this.sizeMap.push(i.clientHeight);
            if(this.sliderHeight < i.clientHeight) {
                this.sliderHeight = i.clientHeight;
            }
        } 
        this.slider.style.height = `${this.sliderHeight}px`;

        this.go(this.curentFakeIndex);

        if(arrows) {
            this.generateButtons();
        }

        this.generateDragging();
    }

    next() {
        if(this.curentFakeIndex === this.slidesFakeCount - 2) {
            this.curentFakeIndex = 1;
            this.go(0).finished.then(()=>{
                this.go(this.curentFakeIndex, true);
            });
        } else {
            this.curentFakeIndex++;
            this.go(this.curentFakeIndex, true);
        }
    }

    prev() {
        if(this.curentFakeIndex === 1) {
            this.curentFakeIndex = this.slidesFakeCount - 2;
            this.go(this.slidesFakeCount - 1).finished.then(()=>{
                this.go(this.curentFakeIndex, true);
            });
        } else {
            this.curentFakeIndex--;
            this.go(this.curentFakeIndex, true);
        }
    }

    go(index, isAnimated) {
        let offset = 0;
        for(let i = 0; i < index; i++) {
            offset+= this.sizeMap[i];
        }
        let animDuration = 0;
        if(isAnimated) {
            animDuration = 500;
        }
        const goAnimation = this.sliderTrack.animate([
            {
                transform: `translateY(-${offset}px)`
            }
        ], {fill: 'forwards', duration: animDuration, easing: 'ease'});
        return goAnimation;
    }

    generateAutoplay() {

    }

    generateDragging() {

        const mouseMove = (e) => {
            const y = startY - e.clientY;
            const x = e.clientX + startX;

            this.setPosition(this.getCurentPosition() - y);
            console.log(`y: ${y}`);
        };

        const mouseDown = (e) => {
            e.preventDefault();
            startY = e.clientY;
            startX = e.clientX;
            console.log(`startY: ${startY}`);
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', ()=>{
                document.removeEventListener('mousemove', mouseMove);
            });
        };

        this.slider.addEventListener('mouseenter', e => {
            this.slider.style.border = '1px solid green';
            this.slider.addEventListener('mousedown', mouseDown);
        });
        this.slider.addEventListener('mouseleave', e => {
            this.slider.style.border = '1px solid red';
            this.slider.removeEventListener('mousedown', mouseDown)
        });

        let startY = 0;
        let startX = 0;
    }

    generateButtons() {
        this.slider.style.position = 'relative';
        const nextBtn = document.createElement('button');
        const prevBtn = document.createElement('button');
        nextBtn.style.cssText = prevBtn.style.cssText = 'position: absolute; display: block; left: 50%; transform: translateX(-50%)';
        nextBtn.textContent = '>';
        nextBtn.classList.add('next-btn');
        nextBtn.style.cssText += 'top: 100%; transform: translate(-50%, -100%)';
        prevBtn.textContent = '<';
        nextBtn.classList.add('prev-btn');
        prevBtn.style.cssText += 'top: 0px;';

        nextBtn.addEventListener('click', () => {
            this.next();
        });
        prevBtn.addEventListener('click', () => {
            this.prev();
        });

        this.slider.append(prevBtn);
        this.slider.append(nextBtn);
    }

    getCurentPosition() {
        let position = 0;
        for(let i = 0; i < this.curentFakeIndex; i++) {
            position -= this.sizeMap[i];
        }
        return position;
    }

    setPosition(position) {
        this.sliderTrack.style.transform = `translateY(${position})`;
    }
}
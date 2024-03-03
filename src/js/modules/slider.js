export class Slider {
	constructor(sliderClass, vertical = false, arrows = true, autoplay = 10000) {
		this.sliderClass = sliderClass;
		this.slider = document.querySelector(`.${sliderClass}`);
		this.slider.style.overflow = 'hidden';
		this.slidesFakeCount = this.slider.childElementCount + 2;
		this.curentFakeIndex = 1;
		this.curentPosition = 0;
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
		this.generateScrolling();
	}

	next(offset) {
		if(this.curentFakeIndex === this.slidesFakeCount - 2) {
			this.curentFakeIndex = 1;
			this.go(0, undefined, offset).finished.then(()=>{
				this.go(this.curentFakeIndex, true);
			});
		} else {
			this.curentFakeIndex++;
			this.go(this.curentFakeIndex, true, offset);
		}
	}

	prev(offset) {
		if(this.curentFakeIndex === 1) {
			this.curentFakeIndex = this.slidesFakeCount - 2;
			this.go(this.slidesFakeCount - 1, undefined, offset).finished.then(()=>{
				this.go(this.curentFakeIndex, true);
			});
		} else {
			this.curentFakeIndex--;
			this.go(this.curentFakeIndex, true, offset);
		}
	}

	go(index, isAnimated, addOffset) {
		let offset = 0;
		for(let i = 0; i < index; i++) {
			offset+= this.sizeMap[i];
		}
		if(addOffset) {
			offset -= addOffset;
		}
		let animDuration = 0;
		if(isAnimated) {
			animDuration = 500;
		}
		const goAnimation = this.sliderTrack.animate([
			{
				transform: `translateY(-${offset}px)`
			}
		], {duration: animDuration, easing: 'ease'});

		goAnimation.finished.then(()=>{
			this.sliderTrack.style.transform = `translateY(-${offset}px)`;
		});
		this.curentPosition = offset * -1;
		return goAnimation;
	}

	generateAutoplay() {

	}

	generateScrolling() {
		let sumDelta = 0;
		let resetDeltaId;
		const scrolling = (e) => {
			console.log(e);
			console.log(`sumDelta: ${sumDelta}`);
			sumDelta += e.deltaY;

			if(resetDeltaId) {
				clearTimeout(resetDeltaId);
			}

			resetDeltaId = setTimeout(()=>{
				sumDelta = 0;
			}, 1000);

			if (Math.abs(sumDelta) >= 200) {
				if(sumDelta > 0) {
					this.next();
				} else {
					this.prev();
				}

				sumDelta = 0;
				clearTimeout(resetDeltaId);
			}
		}

		// left: 37, up: 38, right: 39, down: 40,
		// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
		var keys = {37: 1, 38: 1, 39: 1, 40: 1};

		function preventDefault(e) {
			e.preventDefault();
		}

		function preventDefaultForScrollKeys(e) {
			if (keys[e.keyCode]) {
				preventDefault(e);
				return false;
			}
		}

		var supportsPassive = false;
		try {
		window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
			get: function () { supportsPassive = true; } 
		}));
		} catch(e) {}
		var wheelOpt = supportsPassive ? { passive: false } : false;
		var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

		// call this to Disable
		function disableScroll() {
			window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
			window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
			window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
			window.addEventListener('keydown', preventDefaultForScrollKeys, false);
		}

		// call this to Enable
		function enableScroll() {
			window.removeEventListener('DOMMouseScroll', preventDefault, false);
			window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
			window.removeEventListener('touchmove', preventDefault, wheelOpt);
			window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
		}

		this.slider.addEventListener('mouseenter', e => {
			disableScroll();
			this.slider.addEventListener('wheel', scrolling, {passive: true});
		});
		this.slider.addEventListener('mouseleave', e => {
			enableScroll();
			this.slider.addEventListener('wheel', scrolling, {passive: true});
		});
	}

	generateDragging() {
		this.slider.style.cursor = 'grab';
		
		const mouseMove = (e) => {
			console.log(`startY: ${startY}`);
			let range = y - (startY - e.clientY);

			if(y !== 0) {
				this.setPosition(this.getCurentPosition() + range);
			}
			y = startY - e.clientY;
			x = e.clientX + startX;
			console.log(`y: ${y}`);
		};

		const mouseUp = (e) => {
			if(!e.target.matches('.next-btn') && !e.target.matches('.prev-btn')) {
				const calculateOffset = () => {
					let sum = 0;
					for(let i = 0; i < this.curentFakeIndex; i++) {
						sum += this.sizeMap[i];
					}
					return sum - Math.abs(this.curentPosition);
				}

				this.slider.style.cursor = 'grab';

				if(y < 0) {
					if(this.curentFakeIndex === 1) {
						this.prev(calculateOffset());
					} else {
						this.prev();
					}
				}

				if(y > 0) {
					if(this.curentFakeIndex === this.slidesFakeCount - 2) {
						this.next(calculateOffset());
					} else {
						this.next();
					}
				}

				y = 0;
				document.removeEventListener('mousemove', mouseMove);
			}
		}

		const mouseDown = (e) => {
			e.preventDefault();
			if(!e.target.matches('.next-btn') && !e.target.matches('.prev-btn')) {
				this.slider.style.cursor = 'grabbing';
				startY = e.clientY;
				startX = e.clientX;
				console.log(`startY: ${startY}`);
				document.addEventListener('mousemove', mouseMove);
				document.addEventListener('mouseup', mouseUp);
			}
		};

		this.slider.addEventListener('mouseenter', e => {
			this.slider.addEventListener('mousedown', mouseDown);
		});
		this.slider.addEventListener('mouseleave', e => {
			this.slider.removeEventListener('mousedown', mouseDown);
		});

		let startY = 0;
		let startX = 0;
		let x = 0;
		let y = 0;
	}

	generateButtons() {
		this.slider.style.position = 'relative';
		const nextBtn = document.createElement('button');
		const prevBtn = document.createElement('button');
		nextBtn.style.cssText = prevBtn.style.cssText = 'position: absolute; display: block; left: 50%; transform: translateX(-50%); cursor: pointer;';
		nextBtn.textContent = '>';
		nextBtn.classList.add('next-btn');
		nextBtn.style.cssText += 'top: 100%; transform: translate(-50%, -100%)';
		prevBtn.textContent = '<';
		prevBtn.classList.add('prev-btn');
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
		return this.curentPosition;
	}

	setPosition(position) {
		console.log(`position: ${position}`);
		this.sliderTrack.style.transform = `translateY(${position}px)`;
		this.curentPosition = position;
	}
}
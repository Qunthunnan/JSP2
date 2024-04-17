export class Slider {
	constructor({sliderClass, vertical = false, dragging = true, arrows = true, scrolling = true, autoplay = 10000, buttonsImage}) {
		this.sliderClass = sliderClass;
		this.autoplayTimerId;
		this.autoplayTime = autoplay;
		this.isVertical = vertical;
		this.slider = document.querySelector(`.${sliderClass}`);
		
		this.sliderWidth = 9999999999999;

		this.images = this.slider.querySelectorAll('img');
		this.images.forEach(image => {
			const imageWidth = +getComputedStyle(image).width.replace(/(\d*)px/, '$1');
			if(imageWidth < this.sliderWidth) {
				this.sliderWidth = imageWidth;
			}
			image.style.width = '100%';
		});

		this.slidesFakeCount = this.slider.childElementCount + 2;
		this.curentFakeIndex = 1;
		this.curentPosition = 0;
		this.isPlayedAnimation = false;


		this.sliderTrack = document.createElement('div');
		this.sliderTrack.style.cssText = 'overflow: hidden; height: 100%; width: 100%';
		this.sliderTrack.classList.add('slider-track');

		this.sliderList = document.createElement('div');
		//horizontal
		if(!vertical) {
			this.sliderList.style.cssText = 'display: flex; height: 100%';
			for(let listItem of this.slider.children) {
				listItem.style.cssText = 'flex-shrink: 0';
			}
		}
		this.sliderList.classList.add('slider-list');
		while (this.slider.childElementCount > 0) {
			this.sliderList.append(this.slider.children[0]);
		}
		this.sliderList.prepend(this.sliderList.children[this.sliderList.childElementCount - 1].cloneNode(true));  //fake slides
		this.sliderList.append(this.sliderList.children[1].cloneNode(true)); //fake slides
		this.sliderTrack.append(this.sliderList);
		this.slider.append(this.sliderTrack);

		this.sizeMap = [];
		this.sliderHeight = 0;

		for(let i of this.sliderList.children) {
			if(this.isVertical)
				this.sizeMap.push(i.clientHeight);
			else
				this.sizeMap.push(i.clientWidth);

			if(this.sliderHeight < i.clientHeight) { //calculating slider height
				this.sliderHeight = i.clientHeight;
			}
		} 
		this.slider.style.cssText = `height: ${this.sliderHeight}px;`;

		if(arrows) {
			this.generateButtons(buttonsImage);
		}

		if(dragging) {
			this.generateDragging();
		}

		if(scrolling) {
			this.generateScrolling();
		}

		if(autoplay) {
			this.generateAutoplay();
		}

		this.go(this.curentFakeIndex);
	}

	async next(offset) {
		if(this.curentFakeIndex === this.slidesFakeCount - 2) {
			this.curentFakeIndex = 1;
			await this.go(0, undefined, offset);
			await this.go(this.curentFakeIndex, true);
		} else {
			this.curentFakeIndex++;
			await this.go(this.curentFakeIndex, true, offset);
		}
	}

	async prev(offset) {
		if(this.curentFakeIndex === 1) {
			this.curentFakeIndex = this.slidesFakeCount - 2;
			await this.go(this.slidesFakeCount - 1, undefined, offset);
			await this.go(this.curentFakeIndex, true);
		} else {
			this.curentFakeIndex--;
			await this.go(this.curentFakeIndex, true, offset);
		}
	}

	async go(index, isAnimated, addOffset) {
		let offset = 0;
		let axis = this.isVertical ? 'Y' : 'X'; //vertical / horizontal ?
		for(let i = 0; i < index; i++) {
			offset+= this.sizeMap[i];
			offset++;
		}
		if(addOffset) {
			offset -= addOffset;
		}
		let animDuration = 0;
		if(isAnimated) {
			animDuration = 500;
		}
		this.isPlayedAnimation = true;
		const goAnimation = this.sliderList.animate([
			{
				transform: `translate${axis}(-${offset}px)`
			}
		], {duration: animDuration, easing: 'ease'});

		
		await goAnimation.finished.then(()=>{
			this.sliderList.style.transform = `translate${axis}(-${offset}px)`;
			this.curentPosition = offset * -1;
			this.isPlayedAnimation = false;
			return goAnimation;
		});
	}

	generateAutoplay() {
		if(this.autoplayTime) {
			this.autoplayTimerId = setInterval(() => {
				this.next();
			}, this.autoplayTime);
		}
	}

	resetAutoplay() {
		if(this.autoplayTime) { 
			this.stopAutoplay();
			this.generateAutoplay();
		}
	}

	stopAutoplay() {
		if(this.autoplayTime) {
			clearInterval(this.autoplayTimerId);
		}
	}

	generateScrolling() {
		let sumDelta = 0;
		let resetDeltaId;
		const scrolling = (e) => {
			this.resetAutoplay();
			sumDelta += e.deltaY;
			if(resetDeltaId) {
				clearTimeout(resetDeltaId);
			}

			resetDeltaId = setTimeout(()=>{
				sumDelta = 0;
			}, 1000);

			if (Math.abs(sumDelta) >= 200 && !this.isPlayedAnimation) {
				if(sumDelta > 0) {
					this.next();
				} else {
					this.prev();
				}

				sumDelta = 0;
				clearTimeout(resetDeltaId);
			}
		}
		//for switching scrolling on mouseenter mouseleave events
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

		function disableScroll() {
			window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
			window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
			window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
			window.addEventListener('keydown', preventDefaultForScrollKeys, false);
		}

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
			let rangeY = y - (startY - e.clientY);
			let rangeX = x - (startX - e.clientX);

			if(this.isVertical) {
				if(y !== 0) {
					this.setPosition(this.getCurentPosition() + rangeY);
				}
			} else {
				if(x !== 0) {
					this.setPosition(this.getCurentPosition() + rangeX);
				}
			}

			y = startY - e.clientY;
			x = startX - e.clientX;
		};

		const mouseUp = (e) => {
			if(!e.target.closest('.next-btn') && !e.target.closest('.prev-btn')) {
				this.generateAutoplay();

				const calculateOffset = () => {
					let sum = 0;
					for(let i = 0; i < this.curentFakeIndex; i++) {
						sum += this.sizeMap[i];
					}
					return sum - Math.abs(this.curentPosition);
				}

				this.slider.style.cursor = 'grab';

				let target = this.isVertical ? y : x; //What is target direction horizontal or vertical?

				if(target < 0) {
					if(this.curentFakeIndex === 1) {
						this.prev(calculateOffset());
					} else {
						this.prev();
					}
				}

				if(target > 0) {
					if(this.curentFakeIndex === this.slidesFakeCount - 2) {
						this.next(calculateOffset());
					} else {
						this.next();
					}
				}

				y = x = 0;
				document.removeEventListener('mousemove', mouseMove);
			}
		}

		const mouseDown = (e) => {
			e.preventDefault();
			if(!e.target.closest('.next-btn') && !e.target.closest('.prev-btn')) {
				this.stopAutoplay();
				this.slider.style.cursor = 'grabbing';
				startY = e.clientY;
				startX = e.clientX;
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

	generateButtons(image) {
		this.slider.style.position = 'relative';
		const nextBtn = document.createElement('button');
		const prevBtn = document.createElement('button');
		const buttonImage = image ? `<img src="${image}" style="height: inherit; width: inherit;">` : `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 640 640">
		<title></title>
		<g id="icomoon-ignore">
		</g>
		<path fill="#717171c7" d="M320 0c176.731 0 320 143.269 320 320s-143.269 320-320 320v0c-176.731 0-320-143.269-320-320s143.269-320 320-320v0zM64 320c0 141.385 114.615 256 256 256s256-114.615 256-256v0c0-141.385-114.615-256-256-256s-256 114.615-256 256v0zM401.28 342.4l-113.28 113.6-45.12-45.12 89.92-90.88-89.6-90.56 44.8-45.12 135.68 135.68-22.4 22.4z"></path>
		</svg>`;
		const absoluteStyles = this.isVertical ? 'left: 50%;' : 'top: 50%;';
		const prevBtnStyles = this.isVertical ? 'top: -7%; transform: translateX(-50%) rotate(270deg);' : 'left: -7%; transform: translateY(-50%) rotate(180deg)';
		const nextBtnStyles = this.isVertical ? 'top: 107%; transform: translate(-50%, -100%) rotate(90deg);' : 'left: 107%; transform: translate(-100%, -50%);';
		nextBtn.style.cssText = prevBtn.style.cssText = `height: 30px; width: 30px; position: absolute; z-index: 5; display: block; line-height: 0; padding: 0; border: none; background: #00000000; border-radius: 100%; ${absoluteStyles} cursor: pointer;`;
		nextBtn.innerHTML = prevBtn.innerHTML = buttonImage;
		nextBtn.classList.add('next-btn');
		nextBtn.style.cssText += nextBtnStyles;
		prevBtn.classList.add('prev-btn');
		prevBtn.style.cssText += prevBtnStyles;

		nextBtn.addEventListener('click', async () => {
			if(!this.isPlayedAnimation) {
				await this.next();
				this.resetAutoplay();
			}
		});
		prevBtn.addEventListener('click', async () => {
			if(!this.isPlayedAnimation) {
				await this.prev();
				this.resetAutoplay();
			}
		});

		this.slider.append(prevBtn);
		this.slider.append(nextBtn);
	}

	getCurentPosition() {
		return this.curentPosition;
	}

	setPosition(position) {
		const axis = this.isVertical ? 'Y' : 'X';
		this.sliderList.style.transform = `translate${axis}(${position}px)`;
		this.curentPosition = position;
	}
}
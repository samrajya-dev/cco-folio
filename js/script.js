/*
 * Copyright (c) 2024 Samrajya Pujari
 * Title site Samrajya Dev
 * Website : https://samrajya.dev
 */
// ------------------------------------ Message ------------------------------------
window.onload = function() {

  var messagesEl = document.querySelector('.messages');
  var typingSpeed = 20;
  var loadingText = '<b>•</b><b>•</b><b>•</b>';
  var messageIndex = 0;

  var getCurrentTime = function() {
    var date = new Date();
    var hours =  date.getHours();
    var minutes =  date.getMinutes();
    var current = hours + (minutes * .01);
    if (current >= 5 && current < 19) return 'Have a nice day';
    if (current >= 19 && current < 22) return 'Have a nice evening';
    if (current >= 22 || current < 5) return 'Have a good night';
  }

  var messages = [
    'Welcome! I\'m Samrajya, a data analyst.',
    'Curious mind. Outside-the-box thinking.💡',
    'Let\'s Unlock Insights. 📊👁️🧩',
    'Visit my portfolio to see my work in <a href="#" class="">action.</a>'
    // getCurrentTime()+'👀 S.'
  ]

  var getFontSize = function() {
    return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
  }

  var pxToRem = function(px) {
    return px / getFontSize() + 'rem';
  }

  var createBubbleElements = function(message, position) {
    var bubbleEl = document.createElement('div');
    var messageEl = document.createElement('span');
    var loadingEl = document.createElement('span');
    bubbleEl.classList.add('bubble');
    bubbleEl.classList.add('is-loading');
    bubbleEl.classList.add('cornered');
    bubbleEl.classList.add(position === 'right' ? 'right' : 'left');
    messageEl.classList.add('message');
    loadingEl.classList.add('loading');
    messageEl.innerHTML = message;
    loadingEl.innerHTML = loadingText;
    bubbleEl.appendChild(loadingEl);
    bubbleEl.appendChild(messageEl);
    bubbleEl.style.opacity = 0;
    return {
      bubble: bubbleEl,
      message: messageEl,
      loading: loadingEl
    }
  }

  var getDimentions = function(elements) {
    return dimensions = {
      loading: {
        w: '4rem',
        h: '2.25rem'
      },
      bubble: {
        w: pxToRem(elements.bubble.offsetWidth + 4),
        h: pxToRem(elements.bubble.offsetHeight)
      },
      message: {
        w: pxToRem(elements.message.offsetWidth + 4),
        h: pxToRem(elements.message.offsetHeight)
      }
    }
  }

  var sendMessage = function(message, position) {
    var loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 500;
    var elements = createBubbleElements(message, position);
    messagesEl.appendChild(elements.bubble);
    messagesEl.appendChild(document.createElement('br'));
    var dimensions = getDimentions(elements);
    elements.bubble.style.width = '0rem';
    elements.bubble.style.height = dimensions.loading.h;
    elements.message.style.width = dimensions.message.w;
    elements.message.style.height = dimensions.message.h;
    elements.bubble.style.opacity = 1;
    var bubbleOffset = elements.bubble.offsetTop + elements.bubble.offsetHeight;
    if (bubbleOffset > messagesEl.offsetHeight) {
      var scrollMessages = anime({
        targets: messagesEl,
        scrollTop: bubbleOffset,
        duration: 750
      });
    }
    var bubbleSize = anime({
      targets: elements.bubble,
      width: ['0rem', dimensions.loading.w],
      marginTop: ['2.5rem', 0],
      marginLeft: ['-2.5rem', 0],
      duration: 800,
      easing: 'easeOutElastic'
    });
    var loadingLoop = anime({
      targets: elements.bubble,
      scale: [1.05, .95],
      duration: 1100,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });
    var dotsStart = anime({
      targets: elements.loading,
      translateX: ['-2rem', '0rem'],
      scale: [.5, 1],
      duration: 400,
      delay: 25,
      easing: 'easeOutElastic',
    });
    var dotsPulse = anime({
      targets: elements.bubble.querySelectorAll('b'),
      scale: [1, 1.25],
      opacity: [.5, 1],
      duration: 300,
      loop: true,
      direction: 'alternate',
      delay: function(i) {return (i * 100) + 50}
    });
    setTimeout(function() {
      loadingLoop.pause();
      dotsPulse.restart({
        opacity: 0,
        scale: 0,
        loop: false,
        direction: 'forwards',
        update: function(a) {
          if (a.progress >= 65 && elements.bubble.classList.contains('is-loading')) {
            elements.bubble.classList.remove('is-loading');
            anime({
              targets: elements.message,
              opacity: [0, 1],
              duration: 300,
            });
          }
        }
      });
      bubbleSize.restart({
        scale: 1,
        width: [dimensions.loading.w, dimensions.bubble.w ],
        height: [dimensions.loading.h, dimensions.bubble.h ],
        marginTop: 0,
        marginLeft: 0,
        begin: function() {
          if (messageIndex < messages.length) elements.bubble.classList.remove('cornered');
        }
      })
    }, loadingDuration - 50);
  }

  var sendMessages = function() {
    var message = messages[messageIndex];
    if (!message) return;
    sendMessage(message);
    ++messageIndex;
    setTimeout(sendMessages, (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + anime.random(900, 1200));
  }

  sendMessages();

}

// ------------------------------------ Clock ------------------------------------
window.addEventListener("DOMContentLoaded",() => {
	const c = new Clock30(".clock");
});

class Clock30 {
	time = [];

	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.timeUpdate();
	}
	get timeAsObject() {
		const date = new Date();
		const h = date.getHours();
		const m = date.getMinutes();

		return {h,m};
	}
	get timeInWords() {
		let {h} = this.timeAsObject;
		const {m} = this.timeAsObject;
		// hour
		if (h > 12) h -= 12;
		else if (h === 0) h = 12;

		const hrDigits = `${h}`.split("");
		if (h < 10) hrDigits.unshift("0");
		// minute
		const minDigits = `${m}`.split("");
		if (m < 10) minDigits.unshift("0");

		const numbers = {
			_1: "one",
			_2: "two",
			_3: "three",
			_4: "four",
			_5: "five",
			_6: "six",
			_7: "seven",
			_8: "eight",
			_9: "nine",
			_10: "ten",
			_11: "eleven",
			_12: "twelve",
			_13: "thirteen",
			_14: "fourteen",
			_15: "fifteen",
			_16: "sixteen",
			_17: "seventeen",
			_18: "eighteen",
			_19: "nineteen",
			_20: "twenty"
		};

		let words = "";
		const hour = numbers[`_${h}`];
		let nextHourProp = h + 1;
	
		if (nextHourProp > 12) nextHourProp %= 12;
	
		const nextHour = numbers[`_${nextHourProp}`];

		if (m === 0) {
			words = `${hour} o’clock`;
		} else if (m === 15) {
			words = `quarter past ${hour}`;
		} else if (m < 30) {
			let min = numbers[`_${m}`];
			// values higher than 20 won’t be found
			if (!min) {
				const minFirstDigit = +minDigits[0];
				const minLastDigit = +minDigits[1];
				const firstWord = numbers[`_${minFirstDigit}0`];
				const lastWord = numbers[`_${minLastDigit}`];
				min = `${firstWord}-${lastWord}`;
			}
			words = `${min} minutes past ${hour}`;
		} else if (m === 30) {
			words = `half past ${hour}`;
		} else if (m === 45) {
			words = `quarter to ${nextHour}`;
		} else if (m > 30) {
			const minsLeft = 60 - m;
			let min = numbers[`_${minsLeft}`];
			// values higher than 20 won’t be found
			if (!min) {
				const digitString = `${minsLeft}`;
				const minsLeftFirstDigit = +digitString[0];
				const minsLeftLastDigit = +digitString[1];
				const firstWord = numbers[`_${minsLeftFirstDigit}0`];
				const lastWord = numbers[`_${minsLeftLastDigit}`];
				min = `${firstWord}-${lastWord}`;
			}
			words = `${min} minutes to ${nextHour}`;
		}

		return words;
	}
	timeUpdate() {
		const flyInClass = "clock__word--fade-fly-in";
		const time = this.timeInWords.split(" ");
		// if half past, insert a space between “half” and “past” so “past” is boldfaced
		if (time.indexOf("half") > -1) {
			time.splice(1,0,"");
		}
		// display the time
		const timeWordEls = Array.from(this.el.querySelectorAll(".clock__word"));

		for (let i = 0; i < timeWordEls.length; ++i) {
			const wordEl = timeWordEls[i];
			wordEl.innerText = time[i] || "";

			if (time[i] !== this.time[i]) {
				wordEl.classList.add(flyInClass);
			} else {
				wordEl.classList.remove(flyInClass);
			}
		}

		this.time = time;
		// loop
		clearTimeout(this.timeUpdateLoop);
		this.timeUpdateLoop = setTimeout(this.timeUpdate.bind(this),1e3);
	}
}

//------------------------------------ About/Contact ------------------------------------

(function($) { "use strict";	
	
	$(".contact-text").on('click', function () {
		$("body").addClass("contact-on");
	});
	$(".contact-close").on('click', function () {
		$("body").removeClass("contact-on");
	});

	$(".ab-text").on('click', function () {
		$("body").addClass("ab-on");
	});
	$(".ab-close").on('click', function () {
		$("body").removeClass("ab-on");
	});
	
})(jQuery); 

var clip = new ClipboardJS('.emailcp');

clip.on('success', function(e) {
    $('.copied').show();
		$('.copied').fadeOut(1000);
});

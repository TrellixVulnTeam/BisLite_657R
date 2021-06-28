export const circleSlider = () => {
    const slides = document.querySelectorAll('.js-carouselItem'),       
            arrowPrev = document.getElementById('js-carouselBtnPrev'),
            arrowNext = document.getElementById('js-carouselBtnNext'),
            circleBtns = document.querySelector('.js-circleBtns');
      let   totalSlides = slides.length,
            slidePosition = 0,
            timer = setInterval(autoPlay,3000);
  
          /**
            * In this function we are creating circles for the slider and appending them to the empty parent in index.html file
            */
            function circleIndicator() {
              if (totalSlides && circleBtns) {
                for (let i = 0; i < totalSlides; i++) {
                  let circle = document.createElement('div');
                    circle && circle.classList.add('circleButton');
                      circle.id = i;
                      if (i == 0) {
                        circle.classList.add('active');
                      }
                  circleBtns.appendChild(circle);
                }
              }
            }
            circleIndicator();
  
            const circleButton = [...circleBtns.children];
  
            /**
              * We are making our circles clikable and changing slides when we do click them
              * Updating active circle onCLick
              * Stoping the slider onclick
              */
             if (circleBtns) {
              circleBtns.addEventListener('click', (e) => {
                if (e.target === circleBtns) return;
                    const targetCircle = e.target;
                  if (targetCircle && circleButton) {
                      const targetCircleIndex = findIndex(targetCircle, circleButton);
                      slidePosition = targetCircleIndex;
                      updateSlidePosition();
                      updateCircleIndicator();
                      resetTimer();
                  }    
              });
             }
  
          /**
            * Updating the active circle when the slideshow is either clicked or autoplayed
            */
          function updateCircleIndicator() {
            if (circleBtns.children) {
              for (let i = 0; i < circleButton.length; i++) {
                circleButton[i].classList.remove('active');
              }
              circleButton[slidePosition].classList.add('active');
            }
          }
          
          /**
            * Statements if we click the prev arrow
            */
          if (arrowPrev) {
            arrowPrev.addEventListener('click', () => {
              moveToPrevSlide();
              updateCircleIndicator();
              resetTimer();
            });
          }
  
          /**
            * Statements of we click the next arrow
            */
          if (arrowNext) {
            arrowNext.addEventListener('click', () => {
              moveToNextSlide();
              updateCircleIndicator();
              resetTimer();
            });
          }
  
          /**
            * Gives the class of active to the visible slide
            */
          function updateSlidePosition() {
            if (slides && totalSlides) {
              for(var i=0; i<totalSlides; i++){
                     slides[i].classList.remove("active");
               }
               slides[slidePosition].classList.add("active");
            }
          }
  
          /**
            * onClick move to the next slide
            */
          function moveToNextSlide() {
            if (slidePosition === totalSlides - 1) {
              slidePosition = 0;
            } else {
              slidePosition++;
            }
            updateSlidePosition();
          }
  
          /**
            * onCLick move to the previous slide
            */
          function moveToPrevSlide() {
            if (slidePosition === 0) {
              slidePosition = totalSlides - 1;
            } else {
              slidePosition--;
            }
            updateSlidePosition();
          }
  
          /**
            * when we are hovering over the slide stop the timer
            */
          for (let slide of slides) {
            if (slide) {
              slide.addEventListener('mouseover', () => {
                resetTimer();
              });
            }
          }
  
          /**
            * Resets the timer and starts it after 3 seconds
            */
          function resetTimer() {
            if (timer) {
              clearInterval(timer);
              timer = setInterval(autoPlay,3000);
            }
          }
  
          /**
            * Functions that make the slider automove and updates the active circle
            */
          function autoPlay() {
            moveToNextSlide();
            updateCircleIndicator();
          }
  
          /**
            * Here we are giving indexes to all the items inside of an array
            * @param item, item we are targeting in an array
            * @param items, the array wich we are giving the indexes
            */
          function findIndex(item, items) {
            for (let index = 0; index < items.length; index++) {
            if (item === items[index]) {
                return index;
              }
            }
          }//END OF CAROUSEL FUNCTION
}
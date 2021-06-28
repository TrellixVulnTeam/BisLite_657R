export const slideShow = () => {
    const sliderWrapp = document.querySelector('.js-worksWrapp'),
          arrowRight = document.getElementById('js-sliderRight'),
          arrowLeft = document.getElementById('js-sliderLeft'),
          sliderWrappChildren = sliderWrapp.children,
          containerWidth = sliderWrapp.offsetWidth;
    let totalSliderWidth = 0,
        margin = 60,
        photo = 0,
        jumpSlideWidth = 0,
        totalSlides = 0;

      /**
        *Making the SlideShow responsive
        */
      let responsive = [
        {breakPoint:{width:0,photo:1}},
        {breakPoint:{width:600,photo:2}},
        {breakPoint:{width:1000,photo:3}},
        {breakPoint:{width:1200,photo:4}}
      ];

      /**
        *Aranging slideshow at window load
        */
      function load(){
        if (responsive) {
          for (let i = 0; i < responsive.length; i++) {
            if(window.innerWidth > responsive[i].breakPoint.width) {
              photo = responsive[i].breakPoint.photo;
            }
          }
          start();
        }
      }

      /**
        *Calculating the Slideshow To be in one line overwflowing with margin
        */
      function start() {
        if (sliderWrappChildren) {
          for (let i = 0; i < sliderWrappChildren.length; i++) {
              sliderWrappChildren[i].style.width = (containerWidth / photo) - margin + "px";
              sliderWrappChildren[i].style.margin = (margin / 2) + "px";
              totalSliderWidth += containerWidth / photo;
              totalSlides++;
          }
            sliderWrapp.style.width = totalSliderWidth + "px";
        }

        /**
          *Adding Functions to arrow left and right
          */
        if (arrowLeft) {
          arrowLeft.addEventListener('click', () => {
            moveToPrevSlide();
          });
        }

        if (arrowRight) {
            arrowRight.addEventListener('click',  () => {
            moveToNextSlide();
          });
        }

        const allSlides = Math.ceil(totalSlides / photo);

        for (let i = 1 ; i <= allSlides; i++) {
          const currentSlide = i

          if (currentSlide <= 1) {
              arrowLeft.classList.add('disabled');
          }
        }

        /**
          * When we click arrow move to the right, and when there is no more we disable it
          */
        function moveToNextSlide() {
          if (jumpSlideWidth < 1900) {
              jumpSlideWidth = jumpSlideWidth + containerWidth;
              sliderWrapp.style.marginLeft = -jumpSlideWidth +"px";
              sliderWrapp.style.transition = "0.5s";
            if (arrowRight && arrowLeft) {
                arrowRight.classList.remove('disabled');
                arrowLeft.classList.remove('disabled');
            }
          } else {
            if (arrowRight) {
                arrowRight.classList.add('disabled');
            }
          }
        }

        /**
          * When we click arrow move to the left, and when there is no more we disable it
          */
        function moveToPrevSlide() {
          if (jumpSlideWidth > 0) {
              jumpSlideWidth = jumpSlideWidth - containerWidth;
              sliderWrapp.style.marginLeft = -jumpSlideWidth + "px";
              sliderWrapp.style.transition = "0.5s";
            if (arrowLeft && arrowRight) {
                arrowLeft.classList.remove('disabled');
                arrowRight.classList.remove('disabled');
            }
          } else {
            if (arrowLeft) {
                arrowLeft.classList.add('disabled');
            }
          }
        }
      }

      window.onload = load();
      //SLIDESHOW FUNCTION
  
}
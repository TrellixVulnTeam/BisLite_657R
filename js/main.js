(function (){
  var parentContainer = document.querySelector('.js-aboutContainer');
  if (parentContainer) {
    parentContainer.addEventListener('click', function(e) {

      var current = e.target,
          readBtn = current.className.includes('js-readBtn'),
          readBtnParentNode = current.parentNode,
          isReadBtnParent = current.closest('.js-readBtn'),
          readBtnTrigger = isReadBtnParent ? readBtnParentNode : readBtn;

          var triggerParent = readBtnTrigger.parentNode,
              readBtnText = readBtnTrigger.querySelector('#js-readTextBtn');

          if (readBtnText) {
            if (triggerParent.className.includes('active')) {
                triggerParent.classList.remove('active');
                readBtnText.innerHTML = "Read More";
            } else {
                triggerParent.classList.add('active');
                readBtnText.innerHTML = "Read Less";
          }
        }
    })
  }//READ MORE/LESS FUNCTION



  var controls = document.querySelector('.js-worksArrows'),
      sliderWrapp = document.querySelector('.js-worksWrapp'),
      arrowRight = document.getElementById('js-sliderRight'),
      arrowLeft = document.getElementById('js-sliderLeft'),
      sliderWrappChildren = sliderWrapp.children,
      containerWidth = sliderWrapp.offsetWidth,
      totalSliderWidth = 0,
      margin = 60,
      photo = 0,
      totalSlides = 0,
      jumpSlideWidth = 0;

      /**
        *Making the SlideShow responsive
        */
      responsive = [
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
          for (var i = 0; i < responsive.length; i++) {
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
          for (var i = 0; i < sliderWrappChildren.length; i++) {
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
          arrowLeft.addEventListener('click', function() {
            moveToPrevSlide();
          });
        }

        if (arrowRight) {
            arrowRight.addEventListener('click', function () {
            moveToNextSlide();
          });
        }

        var allSlides = Math.ceil(totalSlides / photo);

        for ( i = 1 ; i <= allSlides; i++) {
          var currentSlide;
              currentSlide = i;

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


      var username = document.querySelector('.js-username');
          password = document.querySelector('.js-password'),
          email = document.querySelector('.js-email'),
          submit = document.querySelector('.js-submit'),
          myForm  = document.querySelector('.js-form'),
          passwordRepeat = document.querySelector('.js-passRepeat'),
          checkBox = document.getElementById('js-checkbox'),
          successText = document.querySelector('.js-successText'),
          regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/;

      if (submit) {
          submit.addEventListener('click',formValidation);

        /**
          * Stops submiting without checking the form content first
          */
      function formValidation(e) {
        e.preventDefault();

          var userData = {
            uv : username.value,
            pv : password.value,
            ev : email.value,
            pvr : passwordRepeat.value,
          }

          /**
            * We push errors into this array to check if all inputs are valid
            */
          var numOfErrors = [];

          /**
            * We are checking if all the conditions are met before the submit
            */
          if (username) {
            if (userData.uv.length < 6) {
                numOfErrors.push(setError(username, 'Your username must have at least 6 Characters'));
            } else if (userData.uv.length >= 20) {
                numOfErrors.push(setError(username, 'Your username must be less than 20 Characters'));
            } else {
                setValid(username);
            }
          }

          if (password) {
            if (regex.test(userData.pv)) {
                setValid(password);
            } else {
                numOfErrors.push(setError(password, 'Must have one Uppercase, Lowercase and Num, 8 to 20 char'));
            }
          }

          if (passwordRepeat) {
            if (userData.pvr == '') {
                numOfErrors.push(setError(passwordRepeat, 'This field is required!'));
            } else if (userData.pvr != userData.pv) {
                numOfErrors.push(setError(passwordRepeat, 'Passwords must match'));
            } else {
                setValid(passwordRepeat);
            }
          }

          if (email) {
            if (userData.ev == '') {
                numOfErrors.push(setError(email, 'This field is required!'));
            } else if (userData.ev.indexOf('@gmail.com') == -1) {
                numOfErrors.push(setError(email, 'Email must contain @gmail.com'));
            } else {
                setValid(email);
            }
          }

          if (checkBox) {
            var isChecked = checkBox.checked;
            if (isChecked) {
              setValid(checkBox);
            } else {
              numOfErrors.push(setError(checkBox, 'You must click agree to continue'));
            }
          }

          /**
            * Here we check number of errors to disable submiting before the input is valid
            */
          if (numOfErrors.length !== 0) {
              console.log(numOfErrors.length);
          } else {
            myForm.reset();
            if (successText) {
              successText.classList.add('active');
            }
          }

          /**
            * Message if the input is incorrect
            * @param input - the input we want to affect
            * @param message - the message we want to present when there is an error
            */
          function setError(input, message) {
            var formControl = input.parentElement,
                error = formControl && formControl.querySelector('small');
            if (error) {
                error.classList.add('error');
                input.classList.add('errorBorder');
                error.innerHTML = message;
            }
          }

          /**
            * Message if the input is correct
            * @param input - the input we want to affect
            */
          function setValid(input) {
            var formControl = input.parentElement,
                error = formControl && formControl.querySelector('small');
            if (error) {
                input.classList.add('succesBorder');
                error.classList.remove('error');
            }
          }
        }
      }//FORM FUNCTION


    var slides = document.querySelectorAll('.js-carouselItem'),
        totalSlides = slides.length,
        slidePosition = 0,
        arrowPrev = document.getElementById('js-carouselBtnPrev'),
        arrowNext = document.getElementById('js-carouselBtnNext'),
        timer = setInterval(autoPlay,3000),
        circleBtns = document.querySelector('.js-circleBtns');

        /**
          * In this function we are creating circles for the slider and appending them to the empty parent in index.html file
          */
          function circleIndicator() {
            if (totalSlides && circleBtns) {
              for (var i = 0; i < totalSlides; i++) {
                var circle = document.createElement('div');
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

          var circleButton = [...circleBtns.children];

          /**
            * We are making our circles clikable and changing slides when we do click them
            * Updating active circle onCLick
            * Stoping the slider onclick
            */
          circleBtns.addEventListener('click',function(e) {
            if (circleBtns) {
              if (e.target === circleBtns) return;
                  var targetCircle = e.target;
                if (targetCircle && circleButton) {
                    var targetCircleIndex = findIndex(targetCircle, circleButton);
                    slidePosition = targetCircleIndex;
                    updateSlidePosition();
                    updateCircleIndicator();
                    resetTimer();
                }
              }
          });

        /**
          * Updating the active circle when the slideshow is either clicked or autoplayed
          */
        function updateCircleIndicator() {
          if (circleBtns.children) {
            for (var i = 0; i < circleButton.length; i++) {
              circleButton[i].classList.remove('active');
            }
            circleButton[slidePosition].classList.add('active');
          }
        }

        /**
          * Statements if we click the prev arrow
          */
        if (arrowPrev) {
          arrowPrev.addEventListener('click',function () {
            moveToPrevSlide();
            updateCircleIndicator();
            resetTimer();
          });
        }

        /**
          * Statements of we click the next arrow
          */
        if (arrowNext) {
          arrowNext.addEventListener('click',function () {
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
        for (var slide of slides) {
          if (slide) {
            slide.addEventListener('mouseover', function() {
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
          for (var index = 0; index < items.length; index++) {
          if (item === items[index]) {
              return index;
            }
          }
        }//END OF CAROUSEL FUNCTION
})()

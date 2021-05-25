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
  }
})();//SHOW MORE/LESS FUNCTION


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
            }
            sliderWrapp.style.width = totalSliderWidth + "px";

            /**
              *Adding Functions to arrow left and right
              */
            if (arrowLeft) {
              arrowLeft.addEventListener('click', function() {
                moveToPrevSlide();
              });
            }

            if (arrowRight)
              arrowRight.addEventListener('click', function () {
              moveToNextSlide();
            });

            var allSlides = Math.ceil(totalSlides / photo);
            for ( i = 1 ; i <= allSlides; i++) {
                  var currentSlide;
                  currentSlide = i;

                  if (currentSlide <= 1) {
                    arrowLeft.classList.add('disabled');
                  }
                }


            function moveToNextSlide() {
              if (jumpSlideWidth < 1900) {
                  jumpSlideWidth = jumpSlideWidth + containerWidth;
                  sliderWrapp.style.marginLeft = -jumpSlideWidth +"px";
                  sliderWrapp.style.transition = "0.5s";
                  arrowRight.classList.remove('disabled');
                  arrowLeft.classList.remove('disabled');
              } else {
                  arrowRight.classList.add('disabled');
              }
            }

            function moveToPrevSlide() {
              if (jumpSlideWidth > 0) {
                  jumpSlideWidth = jumpSlideWidth - containerWidth;
                  sliderWrapp.style.marginLeft = -jumpSlideWidth + "px";
                  sliderWrapp.style.transition = "0.5s";
                  arrowLeft.classList.remove('disabled');
                  arrowRight.classList.remove('disabled');
              } else {
                  arrowLeft.classList.add('disabled');
              }
            }
          }
      window.onload = load();


      var username = document.querySelector('.js-username');
          password = document.querySelector('.js-password'),
          email = document.querySelector('.js-email'),
          submit = document.querySelector('.js-submit'),
          myForm  = document.querySelector('.js-form'),
          passwordRepeat = document.querySelector('.js-passRepeat'),
          checkbox = document.getElementById('js-checkbox'),
          regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/;

      if (submit) {
        submit.addEventListener('click',formValidation);

        function formValidation(e) {
          e.preventDefault();

          var userData = {
            uv : username.value,
            pv : password.value,
            ev : email.value,
            pvr : passwordRepeat.value
          }


          if (userData.uv.length < 6) {
              setError(username, 'Your username must have at least 6 Characters');
          } else if (userData.uv.length >= 20) {
              setError(username, 'Your username must be less than 20 Characters');
          } else {
              setValid(username);
          }

          if (regex.test(userData.pv)) {
              setValid(password);
          } else {
              setError(password, 'Must have one Uppercase, Lowercase and Num, 8 to 20 char');
          }

          if (userData.pvr == '') {
              setError(passwordRepeat, 'This field is required!');
          } else if (userData.pvr != userData.pv) {
              setError(passwordRepeat, 'Passwords must match');
          } else {
              setValid(passwordRepeat);
          }

          if (userData.ev == '') {
              setError(email, 'This field is required!');
          } else if (userData.ev.indexOf('@gmail.com') == -1) {
              setError(email, 'Email must contain @gmail.com');
          } else {
              setValid(email);
          }

          if (setError != 0) {
              console.log(setError);
          } else {
              myForm.submit();
          }

          function setError(input, message) {
            var formControl = input.parentElement,
                error = formControl.querySelector('small');
                error.style.visibility = "visible";
                input.style.border = "3px solid red";
                error.innerHTML = message;
              }

          function setValid(input) {
            var formControl = input.parentElement,
                error = formControl.querySelector('small');
                input.style.border = "3px solid lightgreen";
                error.style.visibility = "hidden";
              }
            }
          }

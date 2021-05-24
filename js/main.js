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


      /*
        Making the SlideShow responsive
      */
      responsive = [
        {breakPoint:{width:0,photo:1}},
        {breakPoint:{width:600,photo:2}},
        {breakPoint:{width:1000,photo:4}}
      ];

      /*
        Aranging slideshow at window load
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

      /*
        Calculating the Slideshow To be in one line overwflowing with margin
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

            if (arrowLeft) {
              arrowLeft.addEventListener('click', function() {
                moveToPrevSlide();
              });
            }

            if (arrowRight)
              arrowRight.addEventListener('click', function () {
              moveToNextSlide();
            });


            function moveToNextSlide() {
              if (jumpSlideWidth < 2280) {
                  jumpSlideWidth = jumpSlideWidth + containerWidth;
                  sliderWrapp.style.marginLeft = -jumpSlideWidth +"px";
                  sliderWrapp.style.transition = "0.5s";
                  arrowRight.classList.remove('disabled');
                  arrowLeft.classList.remove('disabled');
                  console.log(jumpSlideWidth);
              } else {
                  arrowRight.classList.add('disabled');
              }
            }

            function moveToPrevSlide() {
              if (jumpSlideWidth > 0) {
                  jumpSlideWidth = jumpSlideWidth - containerWidth;
                  sliderWrapp.style.marginLeft = -jumpSlideWidth +"px";
                  sliderWrapp.style.transition = "0.5s";
                  arrowLeft.classList.remove('disabled');
                  arrowRight.classList.remove('disabled');
                  console.log(jumpSlideWidth);
              } else {
                  arrowLeft.classList.add('disabled');
              }
            }
          }
      window.onload = load();

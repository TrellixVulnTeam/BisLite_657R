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

(function(){
  var controls = document.querySelector('.js-worksArrows'),
      sliderWrapp = document.querySelector('.js-worksWrapp'),
      allBox = sliderWrapp.children,
      containerWidth = sliderWrapp.offsetWidth,
      margin = 60,
      photo = 0,
      totalSlides = 0,
      jumpSlideWidth = 0;


    if (controls && sliderWrapp) {
      responsive = [
        {breakPoint:{width:0,photo:1}},
        {breakPoint:{width:600,photo:2}},
        {breakPoint:{width:1000,photo:4}}
      ];

      function load(){
        for (var i = 0; i < responsive.length; i++) {
          if(window.innerWidth > responsive[i].breakPoint.width) {
            photo = responsive[i].breakPoint.photo;
          }
        }
        start();
      }

      function start() {
        var totalSliderWidth = 0;
        for (var i = 0; i < allBox.length; i++) {
              allBox[i].style.width = (containerWidth / photo)-margin + "px";
              allBox[i].style.margin = (margin / 2) + "px";
              totalSliderWidth += containerWidth / photo;
              totalSlides++;
            }

            sliderWrapp.style.width = totalSliderWidth + "px";

            sliderLeft = document.getElementById('js-sliderLeft');
            if (sliderLeft) {
              sliderLeft.addEventListener('click', function() {
                moveToPrevSlide();
              });
            }

            sliderRight = document.getElementById('js-sliderRight');
            if (sliderRight)
              sliderRight.addEventListener('click', function () {
              moveToNextSlide();
            });

            function moveToNextSlide() {
              if (jumpSlideWidth <2280) {
                  jumpSlideWidth = jumpSlideWidth + containerWidth;
                  sliderWrapp.style.marginLeft = -jumpSlideWidth +"px";
                  sliderWrapp.style.transition = "0.5s";
                  sliderRight.classList.remove('disabled');
                  sliderLeft.classList.remove('disabled');
                  console.log(jumpSlideWidth);
              } else {
                  sliderRight.classList.add('disabled');
              }
            }

            function moveToPrevSlide() {
              if (jumpSlideWidth > 0) {
                  jumpSlideWidth = jumpSlideWidth - containerWidth;
                  sliderWrapp.style.marginLeft = -jumpSlideWidth +"px";
                  sliderWrapp.style.transition = "0.5s";
                  sliderLeft.classList.remove('disabled');
                  sliderRight.classList.remove('disabled');
                  console.log(jumpSlideWidth);
              } else {
                  sliderLeft.classList.add('disabled');
              }
            }
          }
        }
      window.onload = load();
})();

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
})()//SHOW MORE/LESS FUNCTION

var controls = document.querySelector('.js-worksArrows'),
    sliderWrapp = document.querySelector('.js-worksWrapp'),
    allBox = sliderWrapp.children,
    containerWidth = sliderWrapp.offsetWidth,
    margin = 55,
    photo = 0,
    totalSlides = 0;
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

      var allSlides = Math.ceil(totalSlides / photo),
          sliderLeft = document.querySelector('#js-sliderLeft'),
          sliderRight = document.querySelector('#js-sliderRight'),
          bothSliders = document.querySelector('.sliderArrow');
          if (sliderLeft && sliderRight) {
            for (var i = 1; i < allSlides; i++) {
              var li = document.createElement("li");
                  li.id = i;
                  li.innerHTML = i;
                  // console.log(li);
                  li.setAttribute('onclick', 'controlSlides(this)');
                  bothSliders.appendChild(li);
                  if (i == 1) {
                    li.className = "active";

                  }
              }
            }

                function controlSlides(ele) {
                    var li = bothSliders[0].children,
                        active;
                        // console.log(li);
                    for (var i = 0; i < li.length; i++) {
                      if (li[i].className == "") {

                        active = i;

                        li[i].className = "";
                      }
                    }
                  ele.className = "active";
                  var numb = (ele.id-1)-active;

                }
              }


    }

    window.onload = load();

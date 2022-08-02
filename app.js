function addClassOpen(e) {
    e.classList.toggle('open')
}

const burger = document.querySelector('#nav__burger')
const menu = document.querySelector('#menu')
const bodyHidden = document.querySelector('body')

burger.addEventListener('click', () => {
    addClassOpen(burger)
    addClassOpen(menu)
})

burger.addEventListener('click',()=>{
  if (burger.classList[1]) {
    bodyHidden.style.overflow = 'hidden'
  } else {
    bodyHidden.style.overflow = ''
  }
})



// slider


function scrollEv(leftArrow, rightArrow, carousel) {
    if (carousel.scrollLeft <= 0) {
      leftArrow.classList.add("arrow-inactive");
    } else {
      leftArrow.classList.remove("arrow-inactive");
    }
    if (carousel.scrollLeft >= carousel.scrollWidth - carousel.offsetWidth - 1) {
      rightArrow.classList.add("arrow-inactive");
    } else {
      rightArrow.classList.remove("arrow-inactive");
    }
  }
  
  function clicleftArrow(carousel, rectList) {
    let shiftScroll;
    for (let i = 0; i < rectList.length; i++) {
      if (carousel.scrollLeft > rectList[rectList.length - 1]) {
        shiftScroll = rectList[rectList.length - 1];
      } else if (
        carousel.scrollLeft > rectList[i] &&
        carousel.scrollLeft <= rectList[i + 1]
      ) {
        shiftScroll = rectList[i];
      }
    }
    carousel.scrollTo({
      left: shiftScroll,
      behavior: "smooth"
    });
  }
  
  function clickRight(carousel, rectList) {
    let shiftScroll;
    for (let i = 0; i < rectList.length; i++) {
      if (
        carousel.scrollLeft >= rectList[i] - 1 &&
        carousel.scrollLeft < rectList[i + 1]
      ) {
        shiftScroll = rectList[i + 1];
      }
    }
    carousel.scrollTo({
      left: shiftScroll,
      behavior: "smooth"
    });
  }
  
  function listRectCarousel(carouselNumber, carousels) {
    let divs = carousels[carouselNumber].getElementsByClassName("carousel__item");
    let rectList = [];
    let rectGauche = carousels[carouselNumber].getBoundingClientRect().left;
  
    for (let i = 0; i < divs.length; i++) {
      let rect = divs[i].getBoundingClientRect();
      rectList.push(rect.left - rectGauche);
    }
  
    for (let i = rectList.length - 1; i >= 0; i--) {
      rectList[i] = rectList[i] - rectList[0];
    }
    return rectList;
  }
  
  function autoSlidePosLeft(carouselNumber, carousels, leftArrows) {
    let rectList = listRectCarousel(carouselNumber, carousels);
    leftArrows[carouselNumber].addEventListener("click", () => {
      clicleftArrow(carousels[carouselNumber], rectList);
    });
  }
  
  function autoSlidePosRight(carouselNumber, carousels, rightArrows) {
    let rectList = listRectCarousel(carouselNumber, carousels);
    rightArrows[carouselNumber].addEventListener("click", () => {
      clickRight(carousels[carouselNumber], rectList);
    });
  }
  
  window.onload = () => {
    let leftArrows = document.getElementsByClassName("left-arrow");
    let rightArrows = document.getElementsByClassName("right-arrow");
    let carousels = document.getElementsByClassName("carousel");
  
    for (let i = 0; i < leftArrows.length; i++) {
      autoSlidePosLeft(i, carousels, leftArrows);
      window.onresize = () => {
        autoSlidePosLeft(i, carousels, leftArrows);
      };
    }
  
    for (let i = 0; i < rightArrows.length; i++) {
      autoSlidePosRight(i, carousels, rightArrows);
      window.onresize = () => {
        autoSlidePosRight(i, carousels, rightArrows);
      };
    }
  
    for (let i = 0; i < carousels.length; i++) {
      carousels[i].addEventListener("scroll", () => {
        scrollEv(leftArrows[i], rightArrows[i], carousels[i]);
      });
    }
  
    for (let i = 0; i < carousels.length; i++) {
      scrollEv(leftArrows[i], rightArrows[i], carousels[i]);
      window.onresize = () => {
        scrollEv(leftArrows[i], rightArrows[i], carousels[i]);
      };
    }
  
  };
  

//   card
filterSelection("all") // Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}



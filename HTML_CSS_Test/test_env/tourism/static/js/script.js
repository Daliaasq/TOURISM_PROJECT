const carousel = document.querySelector(".carousel");
firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft;


const showHideIcons = () => {
    //showing and hiding prev/next arrow icons according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft  == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft  == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; //getting first image width and adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(),60); //calling showHideIcons after 60ms
    });
});

const dragStart = (e) => {
    //updating global variables values on mouse down event
    isDragStart = true;
    prevPageX = e.pageX
    prevScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();

}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("mouseup",dragStop);
carousel.addEventListener("mouseleave",dragStop);
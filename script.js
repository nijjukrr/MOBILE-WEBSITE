"use strict";

// Dragon Animation Logic
const screen = document.getElementById("screen");
const xmlns = "http://www.w3.org/2000/svg";
const xlinkns = "http://www.w3.org/1999/xlink";

let width, height;
const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
};
window.addEventListener("resize", resize, false);
resize();

const pointer = { x: width / 2, y: height / 2 };

window.addEventListener(
    "pointermove",
    (e) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        rad = 0;
    },
    false
);

const prepend = (use, i) => {
    const elem = document.createElementNS(xmlns, "use");
    elems[i].use = elem;
    elem.setAttributeNS(xlinkns, "href", "#" + use); // using href instead of xlink:href as it is deprecated but works
    screen.prepend(elem);
};

const N = 40;
const elems = [];
for (let i = 0; i < N; i++) elems[i] = { use: null, x: width / 2, y: 0 };
const radm = Math.min(pointer.x, pointer.y) - 20;
let frm = Math.random();
let rad = 0;

for (let i = 1; i < N; i++) {
    if (i === 1) prepend("Cabeza", i);
    else if (i === 8 || i === 14) prepend("Aletas", i);
    else prepend("Espina", i);
}

const run = () => {
    requestAnimationFrame(run);
    let e = elems[0];
    const ax = (Math.cos(3 * frm) * rad * width) / height;
    const ay = (Math.sin(4 * frm) * rad * height) / width;
    e.x += (ax + pointer.x - e.x) / 10;
    e.y += (ay + pointer.y - e.y) / 10;
    
    for (let i = 1; i < N; i++) {
        let e = elems[i];
        let ep = elems[i - 1];
        const a = Math.atan2(e.y - ep.y, e.x - ep.x);
        e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
        e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;
        const s = (162 + 4 * (1 - i)) / 50;
        
        if(e.use) {
            e.use.setAttributeNS(
                null,
                "transform",
                `translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${(180 / Math.PI) * a}) scale(${s},${s})`
            );
        }
    }
    
    if (rad < radm) rad++;
    frm += 0.003;
    if (rad > 60) {
        pointer.x += (width / 2 - pointer.x) * 0.05;
        pointer.y += (height / 2 - pointer.y) * 0.05;
    }
};

run();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Headphone Slider Logic
var backgrounds = document.querySelectorAll('.background');
const slider = document.querySelector('.slider-images');
if (slider) {
    const images = Array.from(slider.children);
    let imageIndex = 0;

    function updateSlider() {
        images.forEach(image => {
            image.classList.remove('active', 'previous', 'next', 'inactive');
        });

        images[imageIndex].classList.add('active');

        if (imageIndex - 1 >= 0) {
            images[imageIndex - 1].classList.add('previous');
        } else {
            images[images.length - 1].classList.add('previous');
        }

        if (imageIndex + 1 < images.length) {
            images[imageIndex + 1].classList.add('next');
        } else {
            images[0].classList.add('next');
        }

        images.forEach((image, index) => {
            if (index !== imageIndex && index !== (imageIndex - 1 + images.length) % images.length && index !== (imageIndex + 1) % images.length) {
                image.classList.add('inactive');
            }
        });

        backgrounds.forEach((background) => {
            background.style.opacity = 0;
        });
        if (images[imageIndex] && images[imageIndex].classList.contains('active')) {
            if(backgrounds[imageIndex]) backgrounds[imageIndex].style.opacity = 1;
        }
        imageIndex = (imageIndex + 1) % images.length;
    }
    
    updateSlider();
    setInterval(updateSlider, 3000);

    images[1].classList.add('next');
    images[2].classList.add('inactive');
    images[3].classList.add('inactive');
    images[4].classList.add('previous');
    images[0].classList.add('active');
}

// Buy Now Modal Logic
const buyButtons = document.querySelectorAll('.buy-btn');
const modal = document.getElementById('buyModal');
const closeBtn = document.querySelector('.close-btn');
const modalActionBtn = document.querySelector('.modal-btn');

if (buyButtons && modal) {
    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    const billingForm = document.getElementById('billingForm');

    if (billingForm) {
        billingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.classList.remove('show');
            alert('Thank you! Your order has been placed successfully.');
            billingForm.reset();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

/* Dark Mode Functionality using Local Storage */
const toggleButton = document.getElementById("dark-mode-toggle");
const body = document.querySelector("body");

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkmode", "dark");
    toggleButton.innerText = "Light Mode";
  } else {
    localStorage.clear("darkmode");
    localStorage.setItem("darkmode", "light");
    toggleButton.innerText = "Dark Mode";
  }
});

window.onload = () => {
  const dark = localStorage.getItem("darkmode");
  if (dark === "dark") {
    body.classList.add('dark-mode');
    toggleButton.innerText = "Light Mode";
  } else {
    body.classList.remove('dark-mode');
    toggleButton.innerText = "Dark Mode";
  }
};

/* Image Carousel Functionality */
const carouselSlide = document.querySelector(".carousel-slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const images = document.querySelectorAll(".carousel-slide img");

if (carouselSlide && prevButton && nextButton && images.length > 0) {
  let counter = 1;
  const size = images[0].clientWidth;
  
  carouselSlide.style.transform = `translateX(-${size * counter}px)`;
  
  nextButton.addEventListener("click", () => {
    if (counter >= images.length - 1) {
      carouselSlide.style.transition = "none";
      counter = 0;
    } else {
      counter++;
      carouselSlide.style.transition = "transform 0.4s ease-in-out";
    }
    carouselSlide.style.transform = `translateX(-${size * counter}px)`;
  });
  
  prevButton.addEventListener("click", () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = `translateX(-${size * counter}px)`;
  });
  
  carouselSlide.addEventListener("transitionend", () => {
    if (images[counter].id === "last-clone") {
      carouselSlide.style.transition = "none";
      counter = images.length - 2;
      carouselSlide.style.transform = `translateX(-${size * counter}px)`;
    }
    if (images[counter].id === "first-clone") {
      carouselSlide.style.transition = "none";
      counter = images.length - counter;
      carouselSlide.style.transform = `translateX(-${size * counter}px)`;
    }
  });
}

/* Submission Form Functionality */
const askAnythingForm = document.querySelector('form');

if (askAnythingForm) {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const mobileInput = document.querySelector('#mobile');
  const countryInput = document.querySelector('#country');
  const brandInput = document.querySelector('#brand');
  const modelInput = document.querySelector('#model');
  const yearInput = document.querySelector('#year');
  const messageInput = document.querySelector('#message');

  askAnythingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      mobile: mobileInput.value,
      country: countryInput.value,
      brand: brandInput.value,
      model: modelInput.value,
      year: yearInput.value,
      message: messageInput.value
    };
    console.log(formData);
    askAnythingForm.reset();
  });
}



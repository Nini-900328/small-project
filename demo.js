const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg"
  ];
  
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
  
  function changeImage() {
    const imgElement = document.getElementById("random-image");
    imgElement.style.opacity = 0;
  
    setTimeout(() => {
      imgElement.src = getRandomImage();
      imgElement.style.opacity = 1;
    }, 1000); // Transition duration to make fading effect smoother
  }
  
  // Start the slideshow
  setInterval(changeImage, 3000); // Change image every 3 seconds
  changeImage(); // Initial image
  
let particlesColor; // default white
let particlesHidden = true;


startColor();

// Function to init particles with chosen color
function initParticles(color = "#ffffff") {
  particlesJS("particles", {
    "particles": {
      "number": { "value": 100, "density": { "enable": true, "value_area": 800 }},
      "color": { "value": color },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5 },
      "size": { "value": 3, "random": true },
      "line_linked": { "enable": true, "distance": 150, "color": color, "opacity": 0.4, "width": 1 },
      "move": { "enable": true, "speed": 2 }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "repulse" },
        "onclick": { "enable": true, "mode": "push" }
      },
      "modes": {
        "repulse": { "distance": 80, "duration": 0.4 },
        "push": { "particles_nb": 4 }
      }
    },
    "retina_detect": true
  });
}

// Initialize once on page load

// Hide particles
function hideParticles() {
  document.getElementById("particles").style.display = "none";
  particlesHidden = true;
}

// Show particles
function showParticles() {
  startColor();
  const container = document.getElementById("particles");
  container.style.display = "block";

  if (particlesHidden) {
    container.innerHTML = ""; // clear old canvas
    initParticles(particlesColor); // re-init
    particlesHidden = false;
  }
}

// Toggle between black & white
function toggleParticleColor() {
  if (particlesHidden) return;
  const container = document.getElementById("particles");

  if (document.body.classList.contains("dark")) {
    // Switch to black particles on white background

    particlesColor = "#000000";
    
    
    
  } else {
    // Switch to white particles on black background
    particlesColor = "#ffffff";
    
    
  }
  container.innerHTML = ""; // clear old canvas
  initParticles(particlesColor); // re-init with new color
}

function startColor() {
  const container = document.getElementById("particles");

  if (document.body.classList.contains("dark")) {
    // Switch to black particles on white background
    particlesColor = "#ffffff";
    
  } else {
    // Switch to white particles on black background
    particlesColor = "#000000";
    
    
  }
}

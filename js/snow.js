let snowContainer, flakes = [], snowAnimation;
let snowRunning = false; // flag to track if snow is active

let flakeColor;

function startSnow() {
  startSnowColor();
  if (snowRunning) return; // prevent multiple instances
  snowRunning = true;

  // Create container div
  snowContainer = document.createElement("div");
  snowContainer.id = "snowContainer";
  Object.assign(snowContainer.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    overflow: "hidden",
    zIndex: "0"
  });
  document.body.prepend(snowContainer);

  // Generate snowflakes
  flakes = Array.from({ length: 100 }, () => {
  const flake = document.createElement("div");
  const size = Math.random() * 4 + 4;

  // default color (for dark mode backgrounds)
  


  Object.assign(flake.style, {
    position: "absolute",
    top: `${Math.random() * window.innerHeight}px`,
    left: `${Math.random() * window.innerWidth}px`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: flakeColor,
    borderRadius: "50%",
    opacity: Math.random(),
    pointerEvents: "none"
  });

  snowContainer.appendChild(flake);

  return {
    el: flake,
    x: parseFloat(flake.style.left),
    y: parseFloat(flake.style.top),
    r: size,
    d: Math.random() + 1
  };
});


  // Start animation loop
  function updateSnow() {
    for (let f of flakes) {
      f.y += (Math.pow(f.d, 2) + 1) * 0.25;
      if (f.y > window.innerHeight) {
        f.y = 0;
        f.x = Math.random() * window.innerWidth;
      }
      f.el.style.top = `${f.y}px`;
      f.el.style.left = `${f.x}px`;
    }
    snowAnimation = requestAnimationFrame(updateSnow);
  }
  updateSnow();
}

function changeSnow() {
  if (!snowRunning) return;

  if (document.body.classList.contains("dark")){
     flakeColor = "#000000";
  }else{
    flakeColor = "#ffffff";
  }

  flakes.forEach(f => {
    f.el.style.backgroundColor = flakeColor;
  });
}

function stopSnow() {
  if (!snowRunning) return;
  cancelAnimationFrame(snowAnimation);
  if (snowContainer) {
    snowContainer.remove();
    snowContainer = null;
    flakes = [];
  }
  snowRunning = false; // reset flag
}

function startSnowColor() {

  if (document.body.classList.contains("dark")) {
    // Switch to black particles on white background
    flakeColor = "#ffffff"; 
  } else {
    // Switch to white particles on black background
    flakeColor = "#000000";
  }
}

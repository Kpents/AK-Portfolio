  const roles = [
  "an Electrical Engineer",
  "a Researcher",
  "an Entrepreneur",
  "a Community Leader",
  "a Problem Solver"
];


  let i = 0;
  let j = 0;
  let currentRole = "";
  let isDeleting = false;
  const speed = 120; // typing speed
  const typingElement = document.querySelector(".typing");

  function typeEffect() {
    currentRole = roles[i];
    if (!isDeleting && j < currentRole.length) {
      typingElement.textContent = currentRole.substring(0, j + 1);
      j++;
      setTimeout(typeEffect, speed);
    } else if (isDeleting && j > 0) {
      typingElement.textContent = currentRole.substring(0, j - 1);
      j--;
      setTimeout(typeEffect, speed / 2);
    } else if (!isDeleting && j === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500); // pause before deleting
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % roles.length;
      setTimeout(typeEffect, speed);
    }
  }

  typeEffect();
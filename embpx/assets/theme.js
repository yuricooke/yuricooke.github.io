
function filterCards(filter) {
  const cards = document.querySelectorAll('#cards .card');

  

  cards.forEach(card => {
    if (filter === 'all' || card.parentNode.getAttribute('data-category') === filter) {
      card.parentNode.style.display = 'flex';
    } else {
      card.parentNode.style.display = 'none';
    }
  });
}

  // Initialize a variable to keep track of the currently active section
  let activeSection = null;

  // Function to add or remove the border-bottom style based on section visibility
  function updateNavHighlight() {
    const sections = document.querySelectorAll('section'); // Select all your sections
    const navItems = document.querySelectorAll('.nav-item'); // Select all your nav items

    // Loop through the sections to find the section with the top closest to 0
    let closestSection = null;
    let closestTop = Infinity;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const top = rect.top;

      // Check if the section's top position is closer to 0 than the current closest section
      if (Math.abs(top) < closestTop) {
        closestTop = Math.abs(top);
        closestSection = section;
      }
    });

    // If a closest section is found, update the active section
    if (closestSection && closestSection !== activeSection) {
      // Remove border-bottom from the previously active nav item (if any)
      if (activeSection) {
        const activeIndex = Array.from(sections).indexOf(activeSection);
        navItems[activeIndex].classList.remove('active-nav-item');
      }

      // Update the active section and add border-bottom to its corresponding nav item
      activeSection = closestSection;
      const activeIndex = Array.from(sections).indexOf(activeSection);
      navItems[activeIndex].classList.add('active-nav-item');
    }
  }

  // Attach the updateNavHighlight function to the window's scroll event
  window.addEventListener('scroll', updateNavHighlight);

  // Trigger the initial update on window load
  window.addEventListener('load', updateNavHighlight);



  // Function to toggle the mobile navbar menu when the button is clicked
  function toggleMobileMenu() {
    const navbarToggle = document.querySelector('.navbar-toggler');
    navbarToggle.click(); // Toggle the collapsed menu button to open/close the menu
  }

  // Attach the toggleMobileMenu function to the touchstart event of the mobile menu button
  const mobileNavbarButton = document.querySelector('.navbar-toggler');
  mobileNavbarButton.addEventListener('touchstart', toggleMobileMenu);

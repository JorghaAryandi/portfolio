// Initialize AOS animations
AOS.init();

// Show the loader for 5 seconds, then hide it
window.addEventListener("load", function () {
  setTimeout(function () {
    // Fade out the loading screen
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.opacity = "0"; // Start fading out

    loadingScreen.addEventListener(
      "transitionend",
      function () {
        loadingScreen.style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        AOS.refresh(); // Refresh AOS animations
      },
      { once: true }
    ); // Ensure the event listener is only called once
  }, 2000);
});

window.addEventListener("DOMContentLoaded", () => {
  // Activate Bootstrap scrollspy on the main navigation element
  const mainNav = document.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74, // Adjust offset based on your fixed navbar height
    });
  }

  // Collapse responsive navbar when a navigation link is clicked (if navbar toggler is visible)
  const navbarToggler = document.querySelector(".navbar-toggler");
  const responsiveNavItems = document.querySelectorAll(
    "#navbarResponsive .nav-link"
  );

  responsiveNavItems.forEach((responsiveNavItem) => {
    responsiveNavItem.addEventListener("click", () => {
      // Remove the "active" class from all links
      responsiveNavItems.forEach((item) => item.classList.remove("active"));

      // Add the "active" class to the clicked link
      responsiveNavItem.classList.add("active");

      // Collapse the navbar if the toggler is visible
      if (
        navbarToggler &&
        window.getComputedStyle(navbarToggler).display !== "none"
      ) {
        navbarToggler.click();
      }
    });
  });

  // Update the active class on scroll using scrollspy events
  document.body.addEventListener("activate.bs.scrollspy", (event) => {
    // Get the ID of the currently active link
    const activeId = event.detail.id; // Bootstrap 5.1+ uses detail property
    // Remove the "active" class from all links
    responsiveNavItems.forEach((item) => item.classList.remove("active"));
    // Add "active" class to the currently active link
    const activeLink = document.querySelector(
      `#navbarResponsive .nav-link[href="#${activeId}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  });
});

// Theme handling functions
(() => {
  "use strict";

  // Retrieve and store theme preferences
  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    return (
      storedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  };

  const setTheme = (theme) => {
    const currentTheme =
      theme === "auto"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    document.documentElement.setAttribute("data-bs-theme", currentTheme);
  };

  // Set theme based on the preferred or stored theme
  setTheme(getPreferredTheme());

  // Update the active theme button and theme icon
  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector("#bd-theme");
    const themeSwitcherText = document.querySelector("#bd-theme-text");
    const activeThemeIcon = document.querySelector(".theme-icon-active use");
    const btnToActivate = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );

    if (
      !themeSwitcher ||
      !btnToActivate ||
      !activeThemeIcon ||
      !themeSwitcherText
    )
      return;

    const svgOfActiveBtn = btnToActivate
      .querySelector("svg use")
      .getAttribute("href");

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActivate.classList.add("active");
    btnToActivate.setAttribute("aria-pressed", "true");
    activeThemeIcon.setAttribute("href", svgOfActiveBtn);

    const themeLabel = `${themeSwitcherText.textContent} (${btnToActivate.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute("aria-label", themeLabel);

    if (focus) themeSwitcher.focus();
  };

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  // Handle theme switcher events
  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme, true);
      });
    });
  });
})();

// Function to send data to WhatsApp
function sendToWhatsApp() {
  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Validate fields
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // WhatsApp number and message formatting
  const phoneNumber = "6281387439243";
  const textMessage = `*Contact Form Submission*%0A%0A*Full Name:* ${encodeURIComponent(
    name
  )}%0A*Email:* ${encodeURIComponent(email)}%0A*Message:* ${encodeURIComponent(
    message
  )}`;

  // Open WhatsApp URL
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${textMessage}`;
  window.open(whatsappURL, "_blank");

  // Clear the form fields
  document.getElementById("contactForm").reset();
}

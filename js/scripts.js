AOS.init();

// Show the loader for 5 seconds, then hide it
window.addEventListener("load", function () {
  setTimeout(function () {
    // Fade out the loading screen
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.opacity = "0"; // Start fading out

    loadingScreen.addEventListener("transitionend", function () {
      loadingScreen.style.display = "none";
      document.getElementById("mainContent").style.display = "block";
      AOS.refresh(); // Refresh AOS animations
    });
  }, 5000); // 5 seconds
});

window.addEventListener("DOMContentLoaded", () => {
  // Activate Bootstrap scrollspy on the main navigation element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  // Collapse responsive navbar when a navigation link is clicked (if navbar toggler is visible)
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = Array.from(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );

  responsiveNavItems.forEach((responsiveNavItem) => {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});

/*!
 * Color mode toggler for Bootstrap's documentation
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  "use strict";

  // Theme handling functions
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
    const isAutoTheme = theme === "auto";
    const currentTheme = isAutoTheme
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
    document.documentElement.setAttribute("data-bs-theme", currentTheme);
  };

  // Set the theme based on the preferred theme
  setTheme(getPreferredTheme());

  // Update the active theme button and theme icon
  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector("#bd-theme");
    if (!themeSwitcher) return;

    const themeSwitcherText = document.querySelector("#bd-theme-text");
    const activeThemeIcon = document.querySelector(".theme-icon-active use");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );
    const svgOfActiveBtn = btnToActive
      .querySelector("svg use")
      .getAttribute("href");

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActive.classList.add("active");
    btnToActive.setAttribute("aria-pressed", "true");
    activeThemeIcon.setAttribute("href", svgOfActiveBtn);
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

    if (focus) themeSwitcher.focus();
  };

  // Listen for system theme changes to update the theme automatically
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  // Handle theme switcher events on page load
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

  // WhatsApp number
  const phoneNumber = "6281387439243";
  const textMessage = `*Contact Form Submission*%0A%0A*Full Name  :* ${name}%0A*Email :* ${email}%0A*Message  :* ${message}`;

  // WhatsApp URL
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${textMessage}`;

  // Redirect to WhatsApp
  window.open(whatsappURL, "_blank");
  // Clear the form fields
  document.getElementById("contactForm").reset();
}

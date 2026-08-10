const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const toast = document.querySelector(".toast");
const email = "Azitc0930@gmail.com";

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1600);
}

menuButton?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.querySelector(".copy-email")?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    showToast("Email copied");
  } catch {
    showToast(email);
  }
});

document.querySelector(".print-page")?.addEventListener("click", () => {
  window.print();
});

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeLink = navLinks.find((link) => link.hash === `#${entry.target.id}`);
        if (!activeLink) return;
        navLinks.forEach((link) => link.classList.toggle("is-active", link === activeLink));
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.1 }
  );

  document.querySelectorAll("main > section[id]").forEach((section) => {
    sectionObserver.observe(section);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

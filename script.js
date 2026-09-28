/* =========================================================
   NEXORA SOLUTIONS
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     1. ELEMENTS
     ========================= */

  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");

  const serviceModal = document.getElementById("serviceModal");
  const modalClose = document.getElementById("modalClose");

  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");

  const contactBtn = document.getElementById("contactBtn");
  const toast = document.getElementById("toast");

  const navLinks = document.querySelectorAll(".nav a");

  const serviceCards = document.querySelectorAll(".service-card");

  const counters = document.querySelectorAll(".counter");


  /* =========================
     2. MOBILE MENU
     ========================= */

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

      nav.classList.toggle("open");

      const icon = menuBtn.querySelector("i");

      if (nav.classList.contains("open")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

      } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

      }

    });

  }


  /* =========================
     3. CLOSE MOBILE MENU
     ========================= */

  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      if (nav) {
        nav.classList.remove("open");
      }

      const icon = menuBtn?.querySelector("i");

      if (icon) {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

      }

    });

  });


  /* =========================
     4. HEADER SCROLL EFFECT
     ========================= */

  function handleHeader() {

    if (!header) return;

    if (window.scrollY > 30) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }

  window.addEventListener("scroll", handleHeader);

  handleHeader();


  /* =========================
     5. ACTIVE NAVIGATION
     ========================= */

  const sections = document.querySelectorAll("main section[id]");

  function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 180;

      const sectionHeight =
        section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {

        currentSection = section.getAttribute("id");

      }

    });


    navLinks.forEach(link => {

      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (
        href &&
        href === `#${currentSection}`
      ) {

        link.classList.add("active");

      }

    });

  }

  window.addEventListener(
    "scroll",
    updateActiveNav
  );

  updateActiveNav();


  /* =========================
     6. SMOOTH SCROLL
     ========================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener("click", function (e) {

        const targetId =
          this.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        const headerHeight =
          header
            ? header.offsetHeight
            : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight +
          5;

        window.scrollTo({

          top: targetPosition,

          behavior: "smooth"

        });

      });

    });


  /* =========================
     7. SERVICE MODAL DATA
     ========================= */

  const serviceData = {

    "Strategy Consulting": {

      title: "Strategy Consulting",

      text:
        "We help organizations define clear strategies, identify growth opportunities and build practical roadmaps for long-term business success."

    },

    "Digital Transformation": {

      title: "Digital Transformation",

      text:
        "We modernize business operations through digital solutions, smarter workflows and technology that creates new opportunities for growth."

    },

    "Operational Excellence": {

      title: "Operational Excellence",

      text:
        "We analyze existing processes and help businesses improve efficiency, reduce friction and create scalable operating systems."

    },

    "Data & Analytics": {

      title: "Data & Analytics",

      text:
        "We transform complex business data into clear insights that help teams make faster, smarter and more informed decisions."

    }

  };


  /* =========================
     8. OPEN SERVICE MODAL
     ========================= */

  serviceCards.forEach(card => {

    const button =
      card.querySelector(".learn-btn");

    if (!button) return;


    button.addEventListener("click", () => {

      const serviceName =
        card.dataset.modal;

      const data =
        serviceData[serviceName];


      if (!data || !serviceModal) {
        return;
      }


      if (modalTitle) {
        modalTitle.textContent =
          data.title;
      }


      if (modalText) {
        modalText.textContent =
          data.text;
      }


      serviceModal.classList.add("show");

      serviceModal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.classList.add(
        "no-scroll"
      );

    });

  });


  /* =========================
     9. CLOSE SERVICE MODAL
     ========================= */

  function closeModal() {

    if (!serviceModal) return;

    serviceModal.classList.remove("show");

    serviceModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "no-scroll"
    );

  }


  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeModal
    );

  }


  /* =========================
     10. CLOSE MODAL OUTSIDE
     ========================= */

  if (serviceModal) {

    serviceModal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          serviceModal
        ) {

          closeModal();

        }

      }
    );

  }


  /* =========================
     11. ESC KEY
     ========================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeModal();

      }

    }
  );


  /* =========================
     12. CONTACT BUTTON
     ========================= */

  if (contactBtn) {

    contactBtn.addEventListener(
      "click",
      () => {

        showToast();

      }
    );

  }


  /* =========================
     13. TOAST
     ========================= */

  let toastTimer;


  function showToast() {

    if (!toast) return;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

      toast.classList.remove("show");

    }, 3000);

  }


  /* =========================
     14. COUNTER ANIMATION
     ========================= */

  function animateCounter(counter) {

    const target =
      Number(
        counter.dataset.target
      );

    if (!target) return;


    let current = 0;

    const duration = 1600;

    const startTime =
      performance.now();


    function updateCounter(
      currentTime
    ) {

      const progress =
        Math.min(
          (currentTime - startTime) /
          duration,
          1
        );


      const easedProgress =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      current =
        Math.floor(
          easedProgress * target
        );


      counter.textContent =
        current.toLocaleString();


      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      } else {

        counter.textContent =
          target.toLocaleString();

      }

    }


    requestAnimationFrame(
      updateCounter
    );

  }


  /* =========================
     15. COUNTER OBSERVER
     ========================= */

  if (counters.length) {

    const counterObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              animateCounter(
                entry.target
              );

              counterObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.5
        }
      );


    counters.forEach(counter => {

      counterObserver.observe(
        counter
      );

    });

  }


  /* =========================
     16. SCROLL REVEAL
     ========================= */

  const revealElements =
    document.querySelectorAll(
      ".service-card, .industry-grid article, .insight-card, .stat"
    );


  revealElements.forEach(
    element => {

      element.style.opacity = "0";

      element.style.transform =
        "translateY(25px)";

      element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    }
  );


  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.style.opacity =
              "1";

            entry.target.style.transform =
              "translateY(0)";

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    element => {

      revealObserver.observe(
        element
      );

    }
  );


  /* =========================
     17. SERVICE CARD STAGGER
     ========================= */

  document
    .querySelectorAll(".service-card")
    .forEach((card, index) => {

      card.style.transitionDelay =
        `${index * 80}ms`;

    });


  /* =========================
     18. INDUSTRY CARD STAGGER
     ========================= */

  document
    .querySelectorAll(
      ".industry-grid article"
    )
    .forEach((card, index) => {

      card.style.transitionDelay =
        `${index * 80}ms`;

    });


  /* =========================
     19. INSIGHT CARD STAGGER
     ========================= */

  document
    .querySelectorAll(
      ".insight-card"
    )
    .forEach((card, index) => {

      card.style.transitionDelay =
        `${index * 100}ms`;

    });


  /* =========================
     20. BUTTON RIPPLE EFFECT
     ========================= */

  document
    .querySelectorAll(".btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        function (event) {

          const ripple =
            document.createElement(
              "span"
            );

          ripple.classList.add(
            "button-ripple"
          );


          const rect =
            this.getBoundingClientRect();


          ripple.style.left =
            `${event.clientX - rect.left}px`;

          ripple.style.top =
            `${event.clientY - rect.top}px`;


          this.appendChild(
            ripple
          );


          setTimeout(() => {

            ripple.remove();

          }, 600);

        }
      );

    });


  /* =========================
     21. CURRENT YEAR
     ========================= */

  const footerYear =
    document.querySelector(
      ".footer-bottom"
    );

  if (footerYear) {

    footerYear.innerHTML =
      footerYear.innerHTML.replace(
        "2026",
        new Date().getFullYear()
      );

  }


  /* =========================
     22. PAGE LOADED
     ========================= */

  document.body.classList.add(
    "page-loaded"
  );


  console.log(
    "Nexora Solutions website loaded successfully."
  );

});
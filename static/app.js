// Pathway. A tiny bit of front-end glue. No frameworks on purpose.

// Mobile nav
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open);
  });
}

// Reveal-on-scroll (subtle; nothing distracting)
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
}

// Program list filtering on the school page
const progList = document.getElementById("progList");
if (progList) {
  const levelSel = document.getElementById("levelFilter");
  const fieldSel = document.getElementById("fieldFilter");
  const countEl = document.getElementById("progCount");
  const noProg = document.getElementById("noProg");

  function applyFilters() {
    let shown = 0;
    progList.querySelectorAll(".prog-card").forEach((card) => {
      const levelOk = !levelSel.value || card.dataset.level === levelSel.value;
      const fieldOk = !fieldSel.value || card.dataset.field === fieldSel.value;
      const show = levelOk && fieldOk;
      card.hidden = !show;
      if (show) shown++;
    });
    countEl.textContent = shown + (shown === 1 ? " program" : " programs");
    if (noProg) noProg.hidden = shown !== 0;
  }
  levelSel.addEventListener("change", applyFilters);
  fieldSel.addEventListener("change", applyFilters);
}

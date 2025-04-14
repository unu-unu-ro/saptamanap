document.querySelectorAll("a.nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({
      behavior: "smooth",
    });
    // Update URL hash without scrolling
    history.pushState(null, null, targetId);
  });
});

document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      const bootstrapCollapse = new bootstrap.Collapse(navbarCollapse);
      bootstrapCollapse.hide();
    }
  });
});

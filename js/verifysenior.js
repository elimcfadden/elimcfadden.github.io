(function () {
  var out = document.getElementById("verify");
  if (!out) return;

  var input = prompt("How old are you?");
  if (input === null) {
    out.textContent = "Enjoy Music and Make Memories!";
    return;
  }

  var age = parseInt(String(input).trim(), 10);
  var banner = document.getElementById("senior-deal");

  if (!isNaN(age) && age >= 65) {
    out.innerHTML = "Free Friday Coffee Night for Seniors!";
    if (banner) {
      banner.classList.add("highlight-deal");
      banner.setAttribute("aria-live", "polite");
    }
  } else {
    out.textContent = "Enjoy Music and Make Memories!";
    if (banner) {
      banner.classList.remove("highlight-deal");
    }
  }
})();

(function () {
  var target = document.getElementById("dateupdate");
  if (!target) return;

  try {
    var when = new Date(document.lastModified);
    if (isNaN(when.getTime())) {
      target.textContent = "Last updated: just now";
      return;
    }
    var opts = { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" };
    target.textContent = "Last updated: " + when.toLocaleString(undefined, opts);
  } catch (e) {
    target.textContent = "Last updated: " + document.lastModified;
  }
})();

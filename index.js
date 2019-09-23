function get() {
  fetch("https://bandsdatabase-76bc.restdb.io/rest/bands", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887ce8fd86cb75861e2623",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(bands => {
      bands.forEach(band => {
        const template = document.querySelector("template").content;
        const clone = template.cloneNode(true);
        clone.querySelector("h1").textContent = band.bandname;
        clone.querySelector("h2").textContent = band.musicgenre;
        clone.querySelector("h3").textContent = band.nrofmembers;
        clone.querySelector("p").textContent = band.songtitle;
        document.querySelector(".app").appendChild(clone);
      });
    });
}
get();

"use strict";

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
      bands.forEach(displayBand);
    });
}
get();

function displayBand(band) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  clone.querySelector("h1").textContent = band.bandname;
  clone.querySelector("h2").textContent = band.musicgenre;
  clone.querySelector("h3").textContent = band.nrofmembers;
  clone.querySelector("p").textContent = band.songtitle;
  document.querySelector(".app").appendChild(clone);
}

function post() {
  const data = {
    bandname: "Does it work??",
    musicgenre: "CSS, JS",
    nrofmembers: 404,
    songtitle: "Why doesn't it work"
  };

  const postData = JSON.stringify(data);
  fetch("https://bandsdatabase-76bc.restdb.io/rest/bands", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887ce8fd86cb75861e2623",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      displayBand(data);
    });
}

document.querySelector(".add").addEventListener("click", e => {
  post();
});

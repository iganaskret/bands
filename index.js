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
      console.log(bands);
      bands.forEach(addBandToDOM);
    });
}
get();

function addBandToDOM(band) {
  const template = document.querySelector("template").content;
  const clone = template.cloneNode(true);
  clone.querySelector("article").dataset.bandid = band._id;
  clone.querySelector("h1").textContent = band.bandname;
  clone.querySelector("h2").textContent = band.musicgenre;
  clone.querySelector("h3").textContent = band.nrofmembers;
  clone.querySelector("p").textContent = band.songtitle;

  clone.querySelector(".delete").addEventListener("click", () => {
    deleteBand(band._id);
  });

  document.querySelector(".app").prepend(clone);
}

function post() {
  const data = {
    bandname: "Designer",
    musicgenre: "CSS, JS",
    nrofmembers: 404,
    songtitle: "Why doesn't it work\nLalal"
  };
  addBandToDOM(data);
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
    });
}

document.querySelector(".add").addEventListener("click", e => {
  post();
});

function deleteBand(id) {
  fetch("https://bandsdatabase-76bc.restdb.io/rest/bands/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887ce8fd86cb75861e2623",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      //delete from DOM
      document.querySelector(`article[data-bandid="${id}"`).remove();
    });
}

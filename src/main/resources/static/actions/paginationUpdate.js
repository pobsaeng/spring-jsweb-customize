let dataset = {};
let ulElement = {}
let activeIndex = 0;
let countPage = 0;
let startIndex = 0;

var list = new Array();
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 20;
var numberOfPages = 1;

function createPagination(elm, data, fnCallback) {
  let pRow = createTag("div", { class: "row" });
  let pCol = createTag("div", { class: "col-sm-12" });
  let pageUl = createTag("ul", { class: "pagination pagination-sm" });

  //Show pagination
  showPagination(pageUl, data, fnCallback);

  pCol.appendChild(pageUl);
  pRow.appendChild(pCol);
  elm.appendChild(pRow);
}

function showPagination(pageUl, data, fnCallback) {
  this.ulElement = pageUl;
  this.dataset = data;
  this.activeIndex = data.activeIndex;
  this.startIndex = data.startIndex;
  this.countPage = data.countPage;
  
  const noOfPages = Math.ceil(arrLen / data.totalPage);
  
  buildPagination(fnCallback);
}

function buildPagination(fnCallback) {
  let el = this.ulElement;
  let data = this.dataset;

  let previous = `<li id="previousBtn" class="page-item ${data.activeIndex == data.startIndex ? "disabled" : ""
    }"><a class="page-link font-weight-bold" href="#" tabindex="-1" onclick="previousPage(${fnCallback});">Previous</i></a></li>`;
  el.innerHTML += previous;

  for (let i =  data.startIndex; i < data.totalPage; i++) {
    let page = i + 1;

    let next = `<li id="page-item-${i}" class="page-item ${i == data.activeIndex ? "active" : ""
      }"><a onclick="pageAction(${page}, ${data.countPage}, ${fnCallback});" class="page-link" href="#">${page}</a></li>`;
    el.innerHTML += next;
  }
  let next = `<li id="nextBtn" class="page-item ${data.activeIndex >= parseInt(data.totalPage) - 1 ? "disabled" : ""
    }"><a class="page-link font-weight-bold" href="#" onclick="nextPage(${fnCallback});">Next</a></li>`;
  el.innerHTML += next;
}

function pageAction(pageNo, countPage, fnCallback) {
  this.activeIndex = pageNo - 1;
  this.countPage = countPage;
  this.dataset.activeIndex = this.activeIndex;

  removeActive();
  addActive();
  enablePageButtons();

  fnCallback({ activeIndex: this.activeIndex, countPage: this.countPage });
}

function nextPage(fnCallback) {
  ++this.activeIndex;
  //Remove
  removeActive();
  //Add
  addActive();
  enablePageButtons();
  fnCallback({ activeIndex: this.activeIndex, countPage: this.countPage });
}

function previousPage(fnCallback) {
  --this.activeIndex;
  //Remove
  removeActive();
  //Add
  addActive();

  enablePageButtons();
  fnCallback({ activeIndex: this.activeIndex, countPage: this.countPage });
}

function addActive() {
  //Add active of CSS class
  var pageItem = document.getElementById("page-item-" + this.activeIndex);
  if (pageItem != null && !pageItem.classList.contains("active")) {
    pageItem.classList.add("active");
  }
}

function removeActive() {
  //Remove active of CSS class
  var current = document.querySelector(".page-item.active");
  if (current != null && current.classList.contains("active")) {
    current.classList.remove("active");
  }
}

function enablePageButtons() {
  if (typeof this.activeIndex == 'undefined') {
    this.activeIndex = this.dataset.activeIndex;
  }

  //Check a previouse button
  if (this.activeIndex == this.startIndex) {
    document.getElementById("previousBtn").classList.add("disabled");
  } else {
    document.getElementById("previousBtn").classList.remove("disabled");
  }

  //Check a next button
  if (this.activeIndex == this.dataset.totalPage - 1) {
    document.getElementById("nextBtn").classList.add("disabled");
  } else {
    document.getElementById("nextBtn").classList.remove("disabled");
  }
}

function createTag(name, attributes) {
  let node = document.createElement(name);
  if (attributes) {
    for (let attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        node.setAttribute(attr, attributes[attr]);
      }
    }
  }

  //add texts to child
  for (let i = 2; i < arguments.length; i++) {
    let child = arguments[i];
    if (typeof child == "string") {
      child = document.createTextNode(child);
      node.appendChild(child);
    }
  }
  return node;
}

// function clearActive() {
//   var pageitem = document.querySelector(".page-item");
//   if (pageitem != null) {
//     for (var i = 0; i < pageitem.length; i++) {
//       console.log(pageitem);
//       // pageitem.className = pageitem.className.replace(" active", "");
//       // this.className += " active";
//     }
//   }
// }
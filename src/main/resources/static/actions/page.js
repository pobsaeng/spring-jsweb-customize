// global JavaScript variables
var list = new Array();
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 20;
var numberOfPages = 1;   // calculates the total number of pages

function makeList() {
    list = new Array();
    for (let x = 0; x < 200; x++)
        list.push(x);
}

function load() {
  makeList();
  numberOfPages = getNumberOfPages();
  loadList();
}
    
function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}

function toNextPage() {
    currentPage += 1;
    loadList();
}

function toPreviousPage() {
    currentPage -= 1;
    loadList();
}

function toFirstPage() {
    currentPage = 1;
    loadList();
}

function toLastPage() {
    currentPage = numberOfPages;
    loadList();
}

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;
    
    pageList = list.slice(begin, end);

    console.log('currentPage: ' + currentPage + ', begin : ' + begin + ', end : ' + end + ', numberPerPage : ' + numberPerPage);

    drawList();    // draws out our data
    check();       // determines the states of the pagination buttons
}

function drawList() {
    document.getElementById("list").innerHTML = "";
    
    for (r = 0; r < pageList.length; r++) {
        document.getElementById("list").innerHTML += '<div>' + pageList[r] + "</div>";
    }
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}
window.addEventListener('load', load);
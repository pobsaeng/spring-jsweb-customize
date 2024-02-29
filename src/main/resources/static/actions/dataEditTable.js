let recordChanged = {};

function createTableByElementId(elm, data, eventCallback) {
  if (elm == null) {
    return false;
  }

  let options = {
    elm: elm,
    items: data,
    tblclass: "table table-striped table-sm table-hover border",
    trClass: "",
    tdClass: "text-center"
  };

  resetElements(elm);
  createDataTable(
    options,
    function (tr, rowIndex, eventCallback) {
      return createButtonsInColumn(tr, rowIndex, eventCallback); //Create all buttons inside each column
    },

    //Key down input text callback event
    function (object) {
      console.log(object);
    }
  );
}

function createButtonsInColumn(tr, rowIndex, eventCallback) {
  //create a div to do alignment of the element of the right
  let tdButtonGroup = createHTMLTag("td", { class: "td wrapper text-right" });
  let isEditableRow = typeof(tr.id.includes) !== 'undefined'? tr.id.includes('trEditable') : false;

  if (!isEditableRow) {
    tdButtonGroup.appendChild(createEditAndDeleteButtonsGroup(tr, rowIndex, eventCallback));

  } else {
    tdButtonGroup.appendChild(createSaveAndCancelButtonsGroup(tr, rowIndex, eventCallback));
  }

  tr.appendChild(tdButtonGroup);
  return tr;
}

function createEditAndDeleteButtonsGroup(tr, rowIndex, eventCallback) {
  //Used for Edit & Delete buttons
  let divBtnMainGroup = createHTMLTag("div", { class: "btn-group", style: "margin-right: 3px !important;", id: "divBtnMainGroup" });
//  divBtnMainGroup.appendChild(createInsertButton(tr, rowIndex));
  divBtnMainGroup.appendChild(createEditButton(tr, rowIndex));
  divBtnMainGroup.appendChild(createDeleteButton(tr, rowIndex, eventCallback));
  return divBtnMainGroup;
}

function createSaveAndCancelButtonsGroup(tr, rowIndex, eventCallback) {
  //Used for update buttons
  let divButtonGroup = createHTMLTag("div", { class: "btn-group", style: "margin-right: 3px !important;", id: "divBtnUpdateGroup" });
  divButtonGroup.appendChild(createSaveButton(tr, rowIndex, eventCallback));
  divButtonGroup.appendChild(createCancelButton(tr, rowIndex, eventCallback));
  return divButtonGroup;
}

function createInsertButton(tr, rowIndex) {
  let btnInsert = createHTMLTag("button", { class: "btn btn-sm btn-primary", id: `btnInsert-${rowIndex}` });
  btnInsert.innerHTML = '+';
  btnInsert.onclick = function (event) {
    swapRowChanged("INSERT", tr, rowIndex);
    updateRowChangeGlobal(rowIndex);
    isShowUpdateRow(true, rowIndex);
  };
  return btnInsert;
}

function createEditButton(tr, rowIndex) {
  let btnEdit = createHTMLTag("button", { class: "btn btn-sm btn-info", id: `btnEdit-${rowIndex}` });
  btnEdit.appendChild(createHTMLTag("i", { class: "fa fa-edit fa-sm" }));
  btnEdit.onclick = function () {
    updateRowChangeGlobal(rowIndex);
    isShowUpdateRow(true, rowIndex);
    // eventCallback({ target: event.target, record: me.recordChanged, rowIndex: rowIndex });
  };

  return btnEdit;
}

function createSaveButton(tr, rowIndex, eventCallback) {
  let me = this;
  let btnSave = createHTMLTag("button", { class: "btn btn-sm btn-success", id: `btnSave-${rowIndex}` });
  btnSave.appendChild(createHTMLTag("i", { class: "fas fa-save fa-sm" }));
  btnSave.onclick = function (event) {
    swapRowChanged("ROW_CHANGED", tr, rowIndex);
    isShowUpdateRow(false, rowIndex);
    updateRowChangeGlobal(rowIndex)

    eventCallback({ target: event.target, record: me.recordChanged, rowIndex: rowIndex });
  };
  return btnSave;
}

function createCancelButton(tr, rowIndex, eventCallback) {
  let me = this;
  let btnCancel = createHTMLTag("button", { class: "btn btn-sm btn-warning", id: `btnCancel-${rowIndex}` });
  btnCancel.appendChild(createHTMLTag("i", { class: "fa fa-ban fa-sm" }));
  btnCancel.onclick = function () {
    swapRowChanged(null, tr, rowIndex);
    isShowUpdateRow(false, rowIndex);
    updateRowChangeGlobal(rowIndex)
  };
  return btnCancel;
}

function createDeleteButton(tr, rowIndex, eventCallback) {
  let me = this;
  let btnDelete = createHTMLTag("button", { class: "btn btn-sm btn-danger", id: `btnDelete-${rowIndex}` });
  btnDelete.appendChild(createHTMLTag("i", { class: "far fa-trash-alt"}))

  btnDelete.onclick = function (event) {
    updateRowChangeGlobal(rowIndex);

    eventCallback({
      target: event.target, record: me.recordChanged, rowIndex: rowIndex, rowIds: [
        `trNormal-${rowIndex}`,
        `trEditable-${rowIndex}`]
    });

    let originTrs = document.querySelectorAll('tr[name=trRowCheck-' + rowIndex + ']')[0];
    let id = originTrs.cells[0].textContent;
    callDeleteAPI(id);

    //Delete rows
    // deleteRow(`trNormal-${rowIndex}`);
    // deleteRow(`trEditable-${rowIndex}`);

  };
  return btnDelete;
}

function callDeleteAPI(id) {

  console.log("Delete id " + id);
}

function deleteRow(rowId) {
  var row = document.getElementById(rowId);
  var table = row.parentNode;

  while (table && table.tagName != 'TABLE')
    table = table.parentNode;
  if (!table) {
    return;
  }

  table.deleteRow(row.rowIndex);
}

function updateRowChangeGlobal(rowIndex) {
  let me = this;
  let rowData = {}
  let trInputTexts = document.querySelectorAll('tr[name=trRowCheck-' + rowIndex + ']')[1];

  for (let i = 0; i < trInputTexts.cells.length - 1; i++) {
    let inputEl = trInputTexts.cells[i].getElementsByTagName("input")[0];
    const dashes = inputEl.getAttribute("id").split("-");
    rowData[dashes[dashes.length - 1]] = inputEl.value;
  }

  me.recordChanged = rowData;
}

function isShowUpdateRow(isUpdate, rowIndex) {
  if (isUpdate) {
    document.querySelectorAll('tr[name=trRowCheck-' + rowIndex + ']')[0].classList.add("d-none"); //hide
    document.querySelectorAll('tr[name=trRowCheck-' + rowIndex + ']')[1].classList.remove("d-none"); //show
  } else {
    document.querySelectorAll('tr[name=trRowCheck-' + rowIndex + ']')[0].classList.remove("d-none"); //show
    document.querySelectorAll('tr[name=trRowCheck-' + rowIndex + ']')[1].classList.add("d-none"); //hide
  }
}

function swapRowChanged(action, tr, rowIndex) {
  let originTrs = document.querySelectorAll('tr[name=trRowCheck-' + rowIndex + ']')[0];
  let textBoxTrs = document.querySelectorAll('tr[name=trRowCheck-' + rowIndex + ']')[1];

  //Update data changed from inputs to cells
  if (action == 'ROW_CHANGED') {
    for (let i = 0; i < tr.cells.length - 1; i++) {
      originTrs.cells[i].textContent = textBoxTrs.cells[i].getElementsByTagName("input")[0].value;
    }
  }

//  if (action == 'INSERT') {
//    for (let i = 0; i < tr.cells.length - 1; i++) {
//      textBoxTrs.cells[i].getElementsByTagName("input")[0].value = "";
//    }
//  }

  //Update data changed from cells to inputs in the case of cancellation
  if (action == null || action == "") {
    for (let i = 0; i < tr.cells.length - 1; i++) {
      textBoxTrs.cells[i].getElementsByTagName("input")[0].value = originTrs.cells[i].textContent;
    }
  }
}

function createNormalRows(items, fields, i) {
  let tr = createHTMLTag("tr", { style: "cursor: pointer;", name: "trRowCheck-" + i, id: "trNormal-" + i });

  for (let j = 0; j < fields.length; j++) {
    let value = items[i][fields[j]];

    // if()
    let td = createHTMLTag("td", { class: "td" }, "" + value);
    tr.appendChild(td, j, i);
  }

  return tr;
}

function createEditableRows(items, fields, i) {
  let tr = createHTMLTag("tr", { class: "d-none", name: "trRowCheck-" + i, id: "trEditable-" + i });

  for (let j = 0; j < fields.length; j++) {
    let value = items[i][fields[j]];

    //For editable
    let td = createHTMLTag("td", { class: "td" });
    td.appendChild(createInputTextOnColumns(i, fields[j], items[i][fields[j]]));
    tr.appendChild(td);
  }
  return tr;
}

function createInputTextOnColumns(i, field, value) {
  let inputTextBox = createHTMLTag("input", {
    class: "form-control form-control-sm",
    type: "text",
    id: 'row-' + i + '-' + field,
    value: value
  });

  inputTextBox.addEventListener('input', (event) => {
    event.target.setAttribute('value', inputTextBox.value); //set attribute 'value' of input texts
    console.log(inputTextBox.value);
  });
  return inputTextBox;
}

function createColumns(tr, fields, items, i, cellCallback) {
  for (let j = 0; j < fields.length; j++) {

    let value = items[i][fields[j]];
    tr.appendChild(cellCallback(createHTMLTag("td", { class: "td" }, "" + value), j, i));

    //For editable
    let td = createHTMLTag("td", { class: "td" });
    td.appendChild(createInputTextOnColumns(i, fields[j], value));
    tr.appendChild(td);
  }
}

function createDataTable(options, eventCallback, pageCallback) {
  let { elm, items, tblclass } = options;

  let table = createHTMLTag("table", { class: tblclass });
  let trHeader = createHTMLTag("tr", {});

  //Create header, body and footer
  buildHeader(Object.keys(items[0]), table, trHeader);
  buildButtonHeader(trHeader, table);
  buildBody(items, table, elm, eventCallback);
}

function buildBody(items, table, elm, rowCallback) {
  if (items == null) return false;

  let fields = Object.keys(items[0]);
  let tBody = createHTMLTag("tbody", {});

  for (let i = 0; i < items.length; i++) {
    //There are 2 types of rows, normal row and editable row
    tBody.appendChild(rowCallback(createNormalRows(items, fields, i), i, table)); //Normal row
    tBody.appendChild(rowCallback(createEditableRows(items, fields, i), i, table)); //Editable row
  }

  table.appendChild(tBody);
  elm.appendChild(table);
}

function buildHeader(fields, table, trh) {
  let thd = createHTMLTag("thead", {});
  for (let a = 0; a < fields.length; a++) {
    let tdh = createHTMLTag("th", {}, insertHeadWithSpaces(fields[a]));
    // tdh.setAttribute("data-lang", "{" + fields[a] + "}");
    trh.appendChild(tdh);
    thd.appendChild(trh);
    table.appendChild(thd);
  }
}

function buildButtonHeader(trHead, table) {
  let btnAdd = createHTMLTag("button", { class: "btn btn-sm btn-primary", id: "btnHeader" });
  btnAdd.appendChild(createHTMLTag("i", { class: "fa fa-plus", id: "i-btnHeader" }));
  btnAdd.onclick = function (event) {
//      var tbody = table.getElementsByTagName('tbody')[0],
//          tr = tbody.insertRow(0);
//
//      var td = document.createElement('td');
//          td.innerHTML = createInputTextOnColumns(0, trHead, "");
//      tr.appendChild(td);
  };
  //create a th tag and append child with a plus button
  let btnTH = createHTMLTag("th", {});
  btnTH.style = "text-align: right; width: 80px;";
  btnTH.appendChild(btnAdd);
  trHead.appendChild(btnTH);
}

// function createPaging(el, data, fnCallback) {
//   let previous = `<li class="page-item ${data.pageIndex > 0 ? "" : "disabled"
//     }"><a class="page-link" href="#" tabindex="-1" onclick="pageCallback(${1}, ${data.count}, ${fnCallback});">Previous</i></a></li>`;
//   el.innerHTML += previous;

//   for (let i = 0; i < data.totalPage; i++) {
//     let page = i + 1;

//     let next = `<li class="page-item ${i == data.pageIndex ? "active" : ""
//       }"><a onclick="pageCallback(${page}, ${data.count}, ${fnCallback});" class="page-link" href="#">${page}</a></li>`;
//     el.innerHTML += next;
//   }
//   let next = `<li class="page-item ${data.pageIndex >= parseInt(data.totalPage) - 1 ? "disabled" : ""
//     }"><a class="page-link" href="#" onclick="pageCallback(${parseInt(data.totalPage)
//     }, ${data.count}, ${fnCallback});">Next</a></li>`;
//   el.innerHTML += next;
// }

function createHTMLTag(name, attributes) {
  //create and set up attributes
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

function insertHeadWithSpaces(string) {
  if (typeof string !== "string") return "";
  string = string.replace(/([a-z])([A-Z])/g, "$1 $2");
  string = string.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isBlank(str) {
  return (!str || /^\s*$/.test(str));
}

function convertRowToJSON(tr, head) {
  let data = [];
  let headers = [];
  for (let i = 0; i < head.length; i++) {
    headers[i] = head[i];
  }

  let rowData = {};

  let inputEl = tr.cells[0].getElementsByTagName("input")[0];
  if (inputEl instanceof HTMLInputElement) {
    for (let a = 0; a < tr.cells.length; a++) {
      rowData[headers[a]] = removeHtml(tr.cells[a].getElementsByTagName("input")[0].value);
    }

  } else {
    for (let j = 0; j < tr.cells.length; j++) {
      rowData[headers[j]] = removeHtml(tr.cells[j].innerHTML);
    }
  }

  data.push(rowData); //json to array
  return data;
}

function resetElements(elm) {
  refreshElements([elm]);
}

function refreshElements(tags) {
  for (let i = 0; i < tags.length; i++) {
    if (tags[i] != null) {
      tags[i].innerHTML = "";
    }
  }
}

function removeHtml(html) {
  let tmp = document.implementation.createHTMLDocument("New").body;
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
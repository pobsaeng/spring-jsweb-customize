function initProduct() {
    loadProducts();
}

function loadProducts() {
    ajaxLoader({
        method: "GET",
        url: getURL() + "/products/",
        contentType: "application/json",
        dataType: "json"
    }, function (resp) {
        let productEl = document.getElementById("product");

        if (resp.success == false) {
            productEl.innerText = resp.errors;
            return false;
        }

        let data = resp.data;
        if (data.length == 0) {
            productEl.innerText = "Not found items in product_type table";
            return false;
        }

        createTableByElementId(productEl, data, function (object) {
            // if (object.target.textContent == 'Delete') {
            //     deleteRow(object.rowIds[0]);
            //     deleteRow(object.rowIds[1]);
            // }

        });

        let pageData = { startIndex: 20, countPage: 10, totalPage: 25, activeIndex: 22 };
        createPagination(productEl, pageData, function(objs){
            console.log(objs);
        });
    });
}
function initProductType(){
    loadProductTypes();
}

function loadProductTypes() {
    ajaxLoader({
        method: "GET",
        url: getURL() + "/product-types",
        contentType: "application/json",
        dataType: "json"
    }, function(resp){
        let productTypeEl = document.getElementById("product-type");

        if(resp.success == false){
            productTypeEl.innerText  = resp.errors;
            return false;
        }

        let data = resp.data;
        if(data.length == 0){
            productTypeEl.innerText = "Not found items in product_type table";
            return false;
        }

        createTableByElementId(productTypeEl, data, function(record){
            console.log(record);
        });

        let pageData = { startIndex: 20, countPage: 10, totalPage: 30, activeIndex: 22 };
        createPagination(productTypeEl, pageData, function(objs){
            console.log(objs);
        });
    });
}
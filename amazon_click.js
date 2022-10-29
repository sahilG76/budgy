
var AMAZON_URL = "https://www.amazon.com";
var count_id = 0;
if((AMAZON_URL == window.location.origin) && 
    (document.getElementById('add-to-cart-button') != null)) {
        $("#add-to-cart-button").click(function(){
            console.log("add clickedd");
            js_get_scrapes();
        });
}

// function updateCart(){
//     let product_name = $("#productTitle").text();
//     let product_url = window.location.href;
//     $('#shopping_cart').append(
//         '<div id="item_div' + count_id + '">'
//     );
//     // append('<button id="'+inp_cat+'" class="catBut">'+short+'</button>');
// }

function js_get_scrapes() {
    url = "https://www.amazon.com/gp/cart/view.html?ref_=nav_cart";
    document = get_DOM(url);
    items = document.querySelector('[data-name="Active Items"]');
    console.log(items)
    return items;
}

function get_DOM(url) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    parser = new DOMParser();
    return parser.parseFromString(xmlhttp.responseText,"text/html");
}
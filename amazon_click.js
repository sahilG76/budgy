
var AMAZON_URL = "https://www.amazon.com";
var AMAZON_SHOPPING_CART = "https://www.amazon.com/gp/cart/view.html?ref_=nav_cart";
if((AMAZON_URL == window.location.origin) && 
    (document.getElementById('add-to-cart-button') != null)) {
        $("#add-to-cart-button").click(function(){
            addToCart();
        });
} else if(AMAZON_SHOPPING_CART == window.location) {
    
    $(".sc-action-delete").click(function(){
        var product_name = $(this).children().children().attr('aria-label').substring(7).trim();
        chrome.storage.local.get(['shopping_cart', 'balance'],function(result){
            var cart = result.shopping_cart;
            let amount = cart[product_name].quantity;
            let cost_per_product = cart[product_name].price;
            let total_cost = amount * cost_per_product;
            delete cart[product_name];
            chrome.storage.local.set({'shopping_cart':cart});
            chrome.storage.local.set({'balance': result.balance + total_cost});
        });
    });
}

function addToCart(){
    let product_name = $("#productTitle").text().trim();
    let product_url = window.location.href;
    let img_src = $("#imgTagWrapperId").children().attr('src');
    // get price
    let price = $("#corePrice_feature_div").children().children().children().text();
    for(let i=1; i<price.length; i++){
        if(price[i] == '$'){
            price = parseFloat(price.substring(1, i));
            break;
        }
    }
    chrome.storage.local.get(['shopping_cart', 'balance'],function(result){
        var cart = result.shopping_cart;
        if(!(product_name in cart)){
            let amount = 1;
            cart[product_name] = {name: product_name, src: img_src, url: product_url, price: price, quantity: amount};
        }else{
            let amount = cart[product_name].quantity + 1;
            cart[product_name].quantity = amount;
        }
        let remaining_bal = result.balance - price;
        chrome.storage.local.set({'shopping_cart':cart});
        chrome.storage.local.set({'balance':remaining_bal});
        if(remaining_bal < 0){
            alert("You have gone under your budget! Please remove something from your cart!");
        }
    });
}

function removeFromCart(){

}

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
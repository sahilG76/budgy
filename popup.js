

loadAll();

$('#budget_submit_button').click(function() {
    
    // parse in the wanted new budget
    var budget = $('#budget_cost').val().trim();
    $("#budget_cost").val('');
    if(budget == ""){
        alert("Please enter an integer for your budget!");
        return
    }
    if(isNaN(budget)){
        alert("Uh oh... please enter an integer for your budget!");
        return;
    }
    budget = parseFloat(budget);
    chrome.storage.local.get(['savedBudget','balance'],function(result){
        var current_budget = result.savedBudget;     // current upper bound cost
        var remaining_balance = result.balance;  // remaining money that the user can spend
        //calculate remaining budget
        var updated_remaining_balance = budget - (current_budget - remaining_balance);
        if(updated_remaining_balance < 0 ) {
            alert("Uh oh... you've gone over budget!");
        }
        // Update remaining balance header
        chrome.storage.local.set({'savedBudget':budget});
        chrome.storage.local.set({'balance':updated_remaining_balance});
        $("#remaining_balance").text(updated_remaining_balance);
        if(updated_remaining_balance < 0){
            $("#remaining_balance").css('color', 'red');
        }else{
            $("#remaining_balance").css('color', 'green');
        }
    });
    
});

function loadAll(){
    // every time the popup is opened, we want to fetch 
    chrome.storage.local.get(['balance'],function(result){
        // with the remaining balance, not current budget
        $("#remaining_balance").text(result.balance);
        if(result.balance < 0){
            $("#remaining_balance").css('color', 'red');
        }else{
            $("#remaining_balance").css('color', 'green');
        }
    });
    // $('#shopping_cart').append(
    //     '<div id="item_div' + count_id + '"> <a href="' + product_url+'">'+ product_name+'</a></div>'
    // );
    chrome.storage.local.get(['shopping_cart'],function(result){
        for (var key in result.shopping_cart) {
            $('#shopping_cart').append(
                // '<div id="item_div' + 0 + '"> <a href="' + result.shopping_cart[key].url+'">'+ result.shopping_cart[key].name + result.shopping_cart[key].quantity+'</a></div>'
                '<div> <a href="' + result.shopping_cart[key].url+'">'+ '<img src="' + result.shopping_cart[key].src+ '" width="50" height="50"></a><p>'+ result.shopping_cart[key].name + '(' + result.shopping_cart[key].quantity + ')' +'</p></div>'
            );
        }
    });
}
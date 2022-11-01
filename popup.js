var current_budget = 0;     // current upper bound cost
var shopping_cart_cost = 0; // shopping cart cost
var remaining_balance = 0;  // remaining money that the user can spend

loadAll();

$('#budget_submit_button').click(function() {
    // parse in the wanted new budget
    var budget = $('#budget_cost').val().trim();
    $("#budget_cost").val('');
    if(budget == ""){
        alert("Please enter an interger for your budget!");
        return
    }
    if(isNaN(budget)){
        alert("Uh oh... please enter an integer for your budget!");
        return;
    }
    budget = parseFloat(budget);
    //calculate remaining budget
    var updated_remaining_balance = budget - shopping_cart_cost;
    if(updated_remaining_balance < 0 ) {
        alert("Uh oh... you've gone over budget!");
    }
    // Update remaining balance header
    current_budget = budget;
    chrome.storage.local.set({'savedBudget':current_budget});
    remaining_balance = updated_remaining_balance;
    $("#remaining_balance").text(remaining_balance);
});

function loadAll(){
    // every time the popup is opened, we want to fetch 
    chrome.storage.local.get(['savedBudget'],function(result){
        current_budget = result.savedBudget;
        // TODO: we need to update the remaining_balance 
        // with the remaining balance, not current budget
        $("#remaining_balance").text(current_budget);
    });
    
}
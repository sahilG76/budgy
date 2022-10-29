var current_budget = 0;     // current upper bound cost
var shopping_cart_cost = 0; // shopping cart cost
var remaining_balance = 0;  // remaining money that the user can spend

$('#budget_submit_button').click(function() {
    // parse in the wanted new budget
    var budget = parseFloat($('#budget_cost').val());
    $("#budget_cost").val('');
    if(isNaN(budget)){
        alert("Uh oh... please enter an integer for your budget!");
        return;
    }
    //calculate remaining budget
    var updated_remaining_balance = budget - shopping_cart_cost;
    if(updated_remaining_balance < 0 ) {
        //TODO: Alert User with Pop-up
        alert("Uh oh... you've gone over budget!");
    }
    // Update remaining balance header
    current_budget = budget;
    remaining_balance = updated_remaining_balance;
    $("#remaining_balance").text(remaining_balance);
});

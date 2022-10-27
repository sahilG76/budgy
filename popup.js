// console.log("This is a popup!");
var current_budget = 0; // current upper bound cost
var shopping_cart_cost = 0; // shopping cart cost
var remaining_balance = 0;

$('#budget_submit_button').click(function() {
    // // get the submited cost
    // Check if budget is valid
    try {
        var budget = parseFloat($('#budget_cost').val());
    }
    catch(error) {
        alert(error);
    }
    //var budget = parseFloat($("#budget_cost").val());
    //alert(budget);

    //calculate remaining budget
    var remaining_balance = budget - shopping_cart_cost;
    console.log(budget);
    if(remaining_balance < 0 ) {
        //TODO: Alert User with Pop-up
        alert("Uh oh... you've gone over budget!");
        return;
    }
        
    // Update remaining balance header
    current_budget = remaining_balance;
    $("#remaining_balance").text(current_budget);



    //var updated_cost = 
});    


$(".shopping_item").click(function() {
    $(this).hide();
});

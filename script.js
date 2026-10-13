const billInput = document.getElementById("bill");
const customTip = document.getElementById("custom-tip");
const peopleInput = document.getElementById("people");
const minusBtn = document.getElementById("minus");
const plusBtn =document.getElementById("plus");
const resetBtn = document.getElementById("reset");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const perPerson = document.getElementById("per-person");

const tipButtons = document.querySelectorAll(".tip-btn");
console.log(tipButtons);

let tipPercent = 0;
tipButtons.forEach(function(button){
    button.addEventListener("click",function(){
        tipPercent = Number(button.dataset.tip);
        console.log(tipPercent);
        calculator();
        billInput.addEventListener("input", function() {calculator();});
        peopleInput.addEventListener("input", function(){calculator();});


    });
});

// i need bill amount , number of people , tip , total and then per person one 
function calculator(){
    const bill = Number(billInput.value);
    const people = Number(peopleInput.value);
    const tip = bill * tipPercent / 100 ;
    const total = bill + tip;
    const eachPerson = total / people;
    // using tofixed() to get only 2 decimal places
    tipAmount.textContent = tip.toFixed(2); 
    totalAmount.textContent = total.toFixed(2);
    perPerson.textContent = eachPerson.toFixed(2);
}
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


billInput.addEventListener("input", function() {calculator();});
peopleInput.addEventListener("input", function(){calculator();});

let tipPercent = 0;
tipButtons.forEach(function(button){
    button.addEventListener("click",function(){
        tipButtons.forEach(function(btn){
            btn.classList.remove("selected");
        });
        button.classList.add("selected");
        tipPercent = Number(button.dataset.tip);
        calculator();
    });
});

// i need bill amount , number of people , tip , total and then per person one 
function calculator(){
    const bill = Number(billInput.value);
    const people = Number(peopleInput.value);
    if(people < 1 || bill < 0 || tipPercent < 0){
        tipAmount.textContent = 0.00;
        totalAmount.textContent = 0.00;
        perPerson.textContent = 0.00;
        return;
    }
    const tip = bill * tipPercent / 100 ;
    const total = bill + tip;
    const eachPerson = total / people;
    // using tofixed() to get only 2 decimal places
    tipAmount.textContent = tip.toFixed(2); 
    totalAmount.textContent = total.toFixed(2);
    perPerson.textContent = eachPerson.toFixed(2);
}

customTip.addEventListener("input", function(){
    tipButtons.forEach(function(btn){
        btn.classList.remove("selected");
    });
    tipPercent = Number(customTip.value);
    calculator();
})


plusBtn.addEventListener("click",function(){
    peopleInput.value = Number(peopleInput.value) + 1;
    calculator();
});

minusBtn.addEventListener("click", function(){
    if(Number(peopleInput.value) > 1) {
        peopleInput.value= Number(peopleInput.value) - 1;
        calculator();        
    }
});

resetBtn.addEventListener("click",function(){
    peopleInput.value =1;
    tipPercent = 0 ;
    billInput.value="";
    customTip.value="";
    tipButtons.forEach(function(btn){
        btn.classList.remove("selected");
    });
    perPerson.textContent = "0.00";
    tipAmount.textContent = "0.00";
    totalAmount.textContent = "0.00";
})

calculator();
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
const today = document.getElementById("today");
const swatches = document.querySelectorAll(".swatch");
const pickBox = document.getElementById("pick-box");
const spinBtn = document.getElementById("spin-btn");
const shareBtn = document.getElementById("share-btn");
const receipt = document.getElementById("receipt");
const slipText = document.getElementById("slip-text");
const copyBtn = document.getElementById("copy-btn");






today.textContent = new
Date().toDateString();

billInput.addEventListener("input", function() {calculator();});
peopleInput.addEventListener("input", function(){calculator();});

// tip button input 
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


// calculations 
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

// custom tip 
customTip.addEventListener("input", function(){
    tipButtons.forEach(function(btn){
        btn.classList.remove("selected");
    });
    tipPercent = Number(customTip.value);
    calculator();
})

// for number of people 
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

// reset button 
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

// themes 
swatches.forEach(function(swatch){
    swatch.addEventListener("click", function(){
        swatches.forEach(function(other){
            other.classList.remove("chosen");
        });
        swatch.classList.add("chosen");
        document.body.className = swatch.dataset.theme;
    });
});

// who pays feature
let isSpinning = false;
spinBtn.addEventListener("click",function(){
    if(isSpinning){
        return;
    }
    isSpinning =true;
    pickBox.classList.remove("win");
    const people = Number(peopleInput.value);
    let ticks=0;
    const timer = setInterval(function(){
        const number = Math.floor(Math.random()* people) +1;
        pickBox.textContent = "Person" + number;
        ticks = ticks +1;
        if(ticks === 25){
            clearInterval(timer);
            isSpinning = false;
            pickBox.classList.add("win");
        }
    }, 80);
});


// share feature 
// rewrite it by yourself without taking help and maybe try doing some design 
shareBtn.addEventListener("click",function(){
    let text = "SPLITIT\n\n";
    text = text + "Bill: " + billInput.value + "\n";
    text = text + "Tip: " + tipPercent + "\n";
    text = text + "Total: " + totalAmount.textContent + "\n";
    text = text + "People: " + peopleInput.value + "\n";
    text = text + "Each pays: " + perPerson.textContent + "\n";
    text = text + "Who pays: " + pickBox.textContent; 

    slipText.textContent = text; 
    receipt.showModal();
});

copyBtn.addEventListener("click",function(){
    navigator.clipboard.writeText(slipText.textContent);
    copyBtn.textContent = "Copied!";
});







calculator();
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
billInput.addEventListener("input",calculator);
peopleInput.addEventListener("input",calculator);

function clearTips(){
    tipButtons.forEach(function(btn){
        btn.classList.remove("selected");
    });
}

let tipPercent = 0;
tipButtons.forEach(function(button){
    button.addEventListener("click",function(){
        clearTips();
        customTip.value = "";
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
        tipAmount.textContent = "0.00";
        totalAmount.textContent = "0.00";
        perPerson.textContent = "0.00";
        return;
    }
    const tip = bill * tipPercent / 100 ;
    const total = bill + tip;
    const eachPerson = total / people;
    tipAmount.textContent = tip.toFixed(2); 
    totalAmount.textContent = total.toFixed(2);
    perPerson.textContent = eachPerson.toFixed(2);
}
 
customTip.addEventListener("input", function(){
    tipPercent = Number(customTip.value);
    calculator();
    clearTips();
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
    pickBox.textContent = "?";
    pickBox.classList.remove("win");
    calculator();
})

// themes 
swatches.forEach(function(swatch){
    swatch.addEventListener("click",function(){
        document.body.className = swatch.dataset.theme;
    });
});

// who pays feature
spinBtn.addEventListener("click",function(){
    pickBox.classList.remove("win");
    const people = Number(peopleInput.value);
    if(people < 2){
        pickBox.textContent = "Are you alone?😭 ";
        return;
    }
    spinBtn.disabled = true;
    let ticks = 0 ;
    const timer = setInterval(function(){
        const number = Math.floor(Math.random() * people)+1;
        pickBox.textContent = "Person" + number;
        ticks = ticks + 1;
        if(ticks === 20){
            clearInterval(timer);
            spinBtn.disabled = false;
            pickBox.classList.add("win");
        }
    },80);
});

// share feature 
shareBtn.addEventListener("click",function(){
    let text = "SPLITIT\n\n";
    text = text + "Bill: " + Number(billInput.value)+ "\n";
    text = text + "Tip: " + tipPercent + "\n";
    text = text + "Total: " + totalAmount.textContent + "\n";
    text = text + "People: " + peopleInput.value + "\n";
    text = text + "Each pays: " + perPerson.textContent;
    if(pickBox.classList.contains("win")){
        text = text + "\nWho pays: " + pickBox.textContent;
    }
    slipText.textContent = text;
    copyBtn.textContent = "copy";
    receipt.showModal();
});

copyBtn.addEventListener("click",function(){
    navigator.clipboard.writeText(slipText.textContent);
    copyBtn.textContent = "Copied!";
});

calculator();
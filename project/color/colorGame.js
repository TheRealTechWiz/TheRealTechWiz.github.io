var nosquare = 6;
var color = rancolors(nosquare);
// [
//     "rgb(255, 0, 0)",
//     "rgb(255, 255, 0)",
//     "rgb(0, 255, 0)",
//     "rgb(0, 0, 255)",
//     "rgb(0, 255, 255)",
//     "rgb(255, 0, 255)",

// ];
var selectedColor = pickcolor();
var square = document.querySelectorAll(".square");
var msg = document.querySelector("#message");
var colorDisplay = document.querySelector("#colormessage");
colorDisplay.textContent = selectedColor;
var hbg = document.querySelector("h1");
var newclr = document.querySelector("#msgbtn button");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");

// setcolor();
// function setcolor(){}
for (i = 0; i < square.length; i++) {
    square[i].style.backgroundColor = color[i];
    square[i].addEventListener('click', function () {
        var clickedColor = this.style.backgroundColor;
        console.log(clickedColor);
        if (clickedColor === selectedColor) {
            for (i = 0; i < square.length; i++) {
                square[i].style.backgroundColor = selectedColor;
            }
            newclr.textContent='play again';
            hbg.style.backgroundColor = selectedColor;
            msg.textContent = "Correct";
        }
        else {
            this.style.backgroundColor = '#232323';
            msg.textContent = "Incorrect";
        }
    });
}
function pickcolor() {
    var ran = Math.floor(Math.random() * color.length);
    return color[ran];
}
function rancolors(num) {
    var arr = [];
    for (i = 0; i < num; i++) {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var clr = "rgb(" + r + ", " + g + ", " + b + ")";
        arr[i] = clr;
    }
    return arr;
}
newclr.addEventListener('click', madeup);
easy.addEventListener('click',function(){
    easy.classList.add('difficulty');
    hard.classList.remove('difficulty');
    nosquare = 3;
    madeup();
});

hard.addEventListener('click',function(){
    hard.classList.add('difficulty');
    easy.classList.remove('difficulty');
    nosquare = 6;
    var square = document.querySelectorAll(".square");
    madeup();
});

function madeup () {
    color = rancolors(nosquare);
    selectedColor = pickcolor();
    colorDisplay.textContent = selectedColor;
    hbg.style.backgroundColor = '#4682b4';
    newclr.textContent='New Colors';
    

    for (i = 0; i < square.length; i++) {
        square[i].style.display = "";
        if(color[i]){
        square[i].style.backgroundColor = color[i];
        }
        else{
            square[i].style.display = "none";
            console.log("ece");
        }
    }

}  
let curr = "";
let num1 = 0;
let num2 = 0;
let decimal = false;
let flag = false;
let operation = 0;
let toUpdate = "";

const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const allclear = document.querySelector('#all-clear');
const dot = document.querySelector('#dot');

const opbuttons = document.querySelectorAll('.opbuttons');
const nbuttons = document.querySelectorAll('.nbuttons');

nbuttons.forEach(function (element){
  element.addEventListener('click', function (e){
    console.log(e);
    if(operation == 0 || decimal) {
      if(!decimal) num2 = num2*10 + parseInt(element.childNodes[0].nodeValue);
      else num2 = parseFloat(num2.toString() + element.childNodes[0].nodeValue);

      if(flag) num2 /=10;

      flag = false;
      console.log(num1);
      update2("              " +  num2.toString());
    }
    else {
      num2 = num2* 10 + parseInt(element.childNodes[0].nodeValue);
      if(decimal) num2/=10;
      update2("              " + num2.toString());
    }
  })
})

opbuttons.forEach(function (element){
  element.addEventListener('click', function (e){
    console.log(e);
    decimal = false;
    if(operation == 0 && num1 == 0) num1 = num2;

    if(e.target.id == 1) curr = " + ";
    if(e.target.id == 2) curr = " - ";
    if(e.target.id == 3) curr = " × ";
    if(e.target.id == 4) curr = " ÷ ";

    executeOperation();
    operation = parseInt(e.target.id);
  })
})

function update1(str){
  document.getElementById('prev').innerHTML = str.substring(str.length-20, str.length);
}

function update2(str){
  document.getElementById('screentext').innerHTML = str.substring(str.length-14, str.length);
}

function executeOperation(){
  console.log(num1 + curr + num2);
  if(operation == 1) num1 += num2;
  if(operation == 2) num1 -= num2;
  if(operation == 3 && num2 != 0) num1 *= num2;
  if(operation == 4 && num2 != 0) num1 /= num2;

  num2 = 0;
  flag = false;
  decimal = false;

  update1("              " + num1.toPrecision(10).toString() + curr);
  update2("              0");

}

allclear.addEventListener('click', function (e){
  console.log(e);
  operation = 0;
  num1 = 0;
  num2 = 0;
  decimal = false;
  flag = false;
  document.getElementById('prev').innerHTML = "0";
  document.getElementById('screentext').innerHTML = "0";
  }
)

clear.addEventListener('click', function (e){
  console.log(e);
  if(num2 != 0){
    if(decimal) num2 = parseFloat(num2.toString().substring(0,-2));
    else num2 = Math.trunc(num2/10);
    update2("              " + num2.toString());
  }}
)

equals.addEventListener('click', function (e){
  console.log(e);
  curr = "";
  if(operation == 0) num1 = num2;
  executeOperation();
  operation = 0;
  }
)

dot.addEventListener('click', function (e){
  console.log(e);
  if(!decimal) {
    curr = ".";
    decimal = true;
    update2("              " + num2.toString()+"." );
    flag = true;
  }
  }
)

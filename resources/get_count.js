const moneyId = document.getElementById("money");
const cheesId = document.getElementById("chees");
const snusId = document.getElementById("snus");
const skiingId = document.getElementById("skiing");

const pizzaId = document.getElementById("pizza");
const beerId = document.getElementById("beer");

const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")

function getMonday(d) {
  const date = new Date();
  const today = date.getDate();
  const currentDay = date.getDay();
  const newDate = date.setDate(today - (currentDay || 7));
  return new Date(newDate);
}


function getWeeksDiff(startDate, endDate) {
  const msInWeek = 1000 * 60 * 60 * 24 * 7;

  return Math.round(Math.abs(endDate - startDate) / msInWeek);
}
function isToday(dateParameter) {
  var today = new Date();
  return dateParameter.getDate() === today.getDate() && dateParameter.getMonth() === today.getMonth() && dateParameter.getFullYear() === today.getFullYear();
}


var timeVar = "today"
window.start = new Date();
window.start.setHours(0,0,0,0)
window.startDate = new Date("2022-08-08");
window.startDate2 = getMonday(new Date())

var timer = setInterval(callAPI, 1000);







function callAPI() {



  if(!isToday(window.start)) {
    window.start = new Date();
    window.start.setHours(0,0,0,0)
    window.startDate2 = getMonday(new Date())
  }


  var b = new Date();
  var difference = (b - window.start) / 1000;
  var money = difference*0.001689814814814814814814
 
  if (timeVar == "week") {
    var difference3 = (b - window.startDate2) / 1000;
    var money = difference3*0.001689814814814814814814
  }
  if (timeVar == "total") {
    var difference2 = (b - window.startDate) / 1000;
    var money = difference2*0.001689814814814814814814
    var extraMoney = (getWeeksDiff(window.startDate, b) / 2)*3 *75
    money = money + extraMoney
    
  }

  moneyId.innerHTML = money.toFixed(2)
  cheesId.innerHTML = Math.floor(money/15)
  snusId.innerHTML = Math.floor(money/40)
  beerId.innerHTML = Math.floor(money/74)
  pizzaId.innerHTML = Math.floor(money/104)
  skiingId.innerHTML = Math.floor(money/18000)


}
btn1.addEventListener("click", function() {
  btn2.style.backgroundColor = "white";
  btn2.style.color = "black";
  btn3.style.backgroundColor = "white";
  btn3.style.color = "black";
  btn1.style.backgroundColor = "rgb(230, 92, 92)";
  btn1.style.color = "white"
  timeVar = "today"
  callAPI()
}); 
btn2.addEventListener("click", function() {
  btn1.style.backgroundColor = "white";
  btn1.style.color = "black";
  btn3.style.backgroundColor = "white";
  btn3.style.color = "black";
  btn2.style.backgroundColor = "rgb(230, 92, 92)";
  btn2.style.color = "white"
  timeVar = "week"
  callAPI()

}); 
btn3.addEventListener("click", function() {
  btn1.style.backgroundColor = "white";
  btn1.style.color = "black";
  btn2.style.backgroundColor = "white";
  btn2.style.color = "black";
  btn3.style.backgroundColor = "rgb(230, 92, 92)";
  btn3.style.color = "white"
  timeVar = "total"
  callAPI()

  
}); 

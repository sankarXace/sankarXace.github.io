// Selecting the necessary HTML elements
const currentTime = document.querySelector("h1");
const content = document.querySelector(".content");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");

// Creating an Audio object for the alarm ringtone
let alarmTime, isAlarmSet;
let ringtone = new Audio("sounds/alarm.mp3");

// Generating options for the hour select menu (from 1 to 12)
for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i; // Formatting single-digit hours with leading zero
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Generating options for the minute select menu (from 59 to 0)
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i; // Formatting single-digit minutes with leading zero
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Generating options for the AM/PM select menu (AM and PM)
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Updating the current time every second
setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }

  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  // Displaying the current time with AM/PM indicator
  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  // Checking if the alarm time matches the current time to play the ringtone
  if (alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
});

// Function to set or clear the alarm
function setAlarm() {
  if (isAlarmSet) {
    // Clearing the alarm
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }

  // Setting the alarm to the selected time
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

  // Checking if a valid time is selected
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please select a valid time to set the alarm!");
  }

  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}

// Event listener for the set/clear alarm button
setAlarmBtn.addEventListener("click", setAlarm);

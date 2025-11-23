let sound;            
let hoursInput;
let minutesInput;
let secondsInput;
let addButton;
let stopButton;

let alarms = [];        

function preload() {
  
  sound = loadSound("청춘만화.mp4");
}

function setup() {
  createCanvas(500, 300);
  textFont("sans-serif");
  textAlign(CENTER, CENTER);

  
  hoursInput = createInput();
  hoursInput.size(30);
  hoursInput.position(20, 60);
  hoursInput.attribute("placeholder", "시");

  minutesInput = createInput();
  minutesInput.size(30);
  minutesInput.position(60, 60);
  minutesInput.attribute("placeholder", "분");

  secondsInput = createInput();
  secondsInput.size(30);
  secondsInput.position(100, 60);
  secondsInput.attribute("placeholder", "초");

  // 알람 추가 버튼
  addButton = createButton("알람 추가");
  addButton.position(150, 60);
  addButton.mousePressed(addAlarm);

  // 알람 끄기 버튼
  stopButton = createButton("알람 끄기");
  stopButton.position(230, 60);
  stopButton.mousePressed(stopAlarm);
}

function draw() {
  background(220);

  // 현재 시간 표시 
  let h = hour();
  let m = minute();
  let s = second();

  textSize(24);
  text("현재 시간", width / 2, 20);
  text(
    nf(h, 2) + " : " + nf(m, 2) + " : " + nf(s, 2),
    width / 2,
    50 + 40
  );

  // 알람 목록 표시
  textSize(16);
  textAlign(LEFT, TOP);
  let y = 120;
  text("알람 목록:", 20, y);
  y += 20;

  if (alarms.length === 0) {
    text("- 등록된 알람이 없습니다.", 30, y);
  } else {
    for (let i = 0; i < alarms.length; i++) {
      const a = alarms[i];
      let label =
        nf(a.h, 2) + ":" + nf(a.m, 2) + ":" + nf(a.s, 2);
      if (a.triggered) {
        label += " (울림)";
      }
      text("- " + label, 30, y);
      y += 20;
    }
  }

  
  checkAlarms(h, m, s);
}

// 알람 추가 
function addAlarm() {
 
  userStartAudio();

  let h = int(hoursInput.value());
  let m = int(minutesInput.value());
  let s = int(secondsInput.value());

  
  if (
    isNaN(h) || isNaN(m) || isNaN(s) ||
    h < 0 || h > 23 ||
    m < 0 || m > 59 ||
    s < 0 || s > 59
  ) {
    alert("시간을 올바르게 입력해 주세요 (시 0-23, 분/초 0-59)");
    return;
  }

  alarms.push({ h: h, m: m, s: s, triggered: false });

  
  hoursInput.value("");
  minutesInput.value("");
  secondsInput.value("");
}


function checkAlarms(currentH, currentM, currentS) {
  for (let i = 0; i < alarms.length; i++) {
    let a = alarms[i];

    
    if (
      !a.triggered &&
      a.h === currentH &&
      a.m === currentM &&
      a.s === currentS
    ) {
      playAlarm();
      a.triggered = true; 
    }
  }
}


function playAlarm() {
  
  if (!sound.isPlaying()) {
    sound.loop(); 
  }
}

// 알람 끄기 버튼
function stopAlarm() {
  if (sound.isPlaying()) {
    sound.stop();
  }

  
  for (let i = 0; i < alarms.length; i++) {
    if (alarms[i].triggered) {
      
    }
  }
}

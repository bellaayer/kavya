var canvas = document.getElementById("canvas-container");
var cnv = document.getElementById("canvas");
var ctx = cnv.getContext("2d");
var anchor = document.getElementById("anchor");
var debugOn = true;

var soundSix = document.getElementById("600");
var soundThree = document.getElementById("3000");

function soundOff(hertz) {
  if (hertz == 600) {
    soundSix.currentTime = 0;
    soundSix.play();
  } else {
    soundThree.currentTime = 0;
    soundThree.play();
  }
}

function debug(stuff) { if (debugOn) console.log(stuff); }

function clearScreen() {
  ctx.clearRect(0, 0, 1000, 600);
  ctx.fillStyle = 'rgb(152,152,152)';
  ctx.fillRect(0,0,1000,600);

  ctx.strokeStyle = 'rgb(0,0,255)';
  ctx.fillStyle = 'rgb(0,0,255)';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(300, 300, 3, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function circle(angle, radius, hertz) {
  ctx.strokeStyle = 'rgb(255,255,255)';
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.audio
  ctx.lineWidth = 10;
  ctx.beginPath();
  var a = 200;
  ctx.arc(a * Math.cos(angle * Math.PI / 180) + 300, a * Math.sin(angle * Math.PI / 180) + 300, radius, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  if (document.title != "Trial 1") soundOff(hertz);
}

function alterCanvas() {
  if (currentState == 0) {
    clearTimeout(window.canvasTimer);
    x = 0;
    y = 0;
  }
  
  redraw();
  
  currentState = 0;

  function redraw() {
    if (trialNumberCounter < 96) {
      if (redrawCounter == 0) {
        rd = 80;
        redrawCounter = 0;
        redrawCounterMax = 0;
        direction = "";
        numInLast = 0;
        startAngle = 45;
        penult = "";

        //Initialize redrawCounterMax
        while (redrawCounterMax == 0) {
          var randomNumber = Math.floor(Math.random() * 3);
          if (randomNumber == 0 && framesCB[0] > 0) {
            redrawCounterMax = 13;
            framesCB[0]--;
          } else if (randomNumber == 1 && framesCB[1] > 0) {
            redrawCounterMax = 19;
            framesCB[1]--;
          } else if (randomNumber = 2 && framesCB[2] > 0) {
            redrawCounterMax = 25;
            framesCB[2]--;
          }
        }
        debug("RC: " + framesCB.join(" | "));

        //Initialize direction
        while (direction == "") {
          randomDirectionNumber = Math.floor(Math.random() * 2);

          if (randomDirectionNumber == 0 && directionCB[1] > 0) {
            direction = "ccw";
            directionCB[1]--;
          } else if (randomDirectionNumber == 1 && directionCB[0] > 0) {
            direction = "cw";
            directionCB[0]--;
          }
        }

        debug("DI: " + directionCB.join(" | "));

        //Initialize startAngle
        while (startAngle == 45) {
          randomNumberSA = Math.floor(Math.random() * 4);
          if (randomNumberSA == 0 && startAngleCB[0] > 0) {
            startAngle = 0;
            startAngleCB[0]--;
          } else if (randomNumberSA == 1 && startAngleCB[1] > 0) {
            startAngle = 90;
            startAngleCB[1]--;
          } else if (randomNumberSA == 2 && startAngleCB[2] > 0) {
            startAngle = 180;
            startAngleCB[2]--;
          } else if (randomNumberSA == 3 && startAngleCB[3] > 0) {
            startAngle = 270;
            startAngleCB[3]--;
          }
        }

        debug("SA: " + startAngleCB.join(" | "));

        //init numInLastCB[1] numInLastCB[0]
        while (numInLast == 0) {
          randomNumberInLast = Math.floor(Math.random() * 2);
          if (randomNumberInLast == 0 && numInLastCB[1] > 0) {
            numInLast = 1;
            numInLastReal.push(1);
            numInLastCB[1]--;
          } else if (randomNumberInLast == 1 && numInLastCB[0] > 0) {
            numInLast = 2;
            numInLastReal.push(2);
            numInLastCB[0]--;
          }
        }

        debug("LF: " + numInLastCB.join(" | "));

        //init penultimate
        while (penult == "") {
          var randomNumberPenult = Math.floor((Math.random() * 2));
          if (randomNumberPenult == 0 && sizeInPenultCB[0] > 0) {
            penult = "smallerinpenult";
            sizeInPenultCB[0]--;
          }
          else if (randomNumberPenult == 1 && sizeInPenultCB[1] > 0) {
            penult = "nosmallerinpenult";
            sizeInPenultCB[1]--;
          }
        }

        debug("SP: " + sizeInPenultCB.join(" | "));

        x = startAngle;

        redrawCounter++;
      } else if (redrawCounter < (redrawCounterMax - 2)) {
        clearScreen();

        if (direction == "ccw") {
          x = x + 15;
        } else {
          x = x - 15;
        }

        circle(x, 20, 600);

        redrawCounter++;
      } else if (redrawCounter == redrawCounterMax - 2) {
        clearScreen();

        if (direction == "ccw") {
          x = x + 15;
        } else {
          x = x - 15;
        }

        var hz = 600;
        if (document.title == "Trial 3") hz = 3000;

        if (penult == "smallerinpenult") {
          circle(x, 4, hz);
        } else {
          circle(x, 20, hz);
        }

        redrawCounter++;
      } else if (redrawCounter == redrawCounterMax - 1) {
        if (numInLast != 2) {
          clearScreen();
        }

        if (direction == "ccw") {
          x = x + 15;
        } else {
          x = x - 15;
        }

        circle(x, 20, 600);

        redrawCounter++;
      } else if (redrawCounter == redrawCounterMax) {
        rd = 100000;
        clearScreen();
        trialNumberCounter++;
        redrawCounter = 0;
        setTimeout(stopButton, 1000);
      } else alert("Error code 17");
      
      window.canvasTimer = setTimeout(redraw, rd);  
    } else {
      doneSend();
    }
  }
}

function startButton() {
  anchor.onclick = "";
  alterCanvas();
}

function stopButton() {
  currentState = 1;
  clearTimeout(window.canvasTimer);
  getUserInput();
}

function getUserInput() {
  guessMade = false;
  rb.style.display = "block";
  lb.style.display = "block";
  canvas.style.display = "none";
  setTimeout(checkGuess, 250);
}

function checkGuess() {
  if (guessMade) {
    guessMade = false;
    rb.style.display = "none";
    lb.style.display = "none";
    canvas.style.display = "inline";
    setTimeout(startButton, 1000);
  } else {
    setTimeout(checkGuess, 250);
  }
}

function pushGuess(guessVal) {
  numInLastGuess.push(guessVal);
  guessMade = true;
}

function doneSend() {
  var trialNum = document.title;
  var trialDesc = "..";
  if (trialNum == "Trial 1") {
    trialDesc = "No Audio";
  } else if (trialNum == "Trial 2") {
    trialDesc = "Constant Audio";
  } else {
    trialDesc = "Changing Audio";
  }


  now = new Date(); // This current millisecond on user's computer.
  var format = "{D} {M} {Y} at {h}:{m}{ap}";
  var Month = new String();
  var Marray = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
  Month = Marray[now.getMonth()];
  format = format.replace(/\{M\}/g,Month);
  var Mday = new String();
  Mday = now.getDate();
  format = format.replace(/\{D\}/g,Mday);
  var Year = new String();
  Year = now.getFullYear();
  format = format.replace(/\{Y\}/g,Year);
  var h = now.getHours();
  var ap = new String();
  var pm = (h>11) ? true : false;
  if(h>12) { h -= 12; };
  ap = pm ? "pm" : "am";
  format = format.replace(/\{ap\}/g,ap);
  var hh = new String();
  hh = h;
  format = format.replace(/\{h\}/g,hh);
  var mm = new String();
  mm = now.getMinutes();
  if(mm<10) { mm = "0"+mm; }
  format = format.replace(/\{m\}/g,mm);

  var message = [[trialNum, trialDesc, format], 
  ["Trial Number", "Actual # Of Circles in Last Frame", "Guessed # of circles in last frame"]
  ];

  for (var i = 0; i < 96; i++) {
    message.push([i+1, numInLastReal[i], numInLastGuess[i]]);
  }

  var csvRows = [];

  for(row in message) {
      csvRows.push(message[row].join(','));
  }

  format = "{Y}-{M}-{D}";
  var Month = new String();
  Month = now.getMonth() + 1;
  if(Month<10) { Month = "0"+Month; }
  format = format.replace(/\{M\}/g,Month);
  var Mday = new String();
  Mday = now.getDate();
  if(Mday<10) { Mday = "0"+Mday; }
  format = format.replace(/\{D\}/g,Mday);
  var Year = new String();
  Year = now.getFullYear();
  format = format.replace(/\{Y\}/g,Year);

  var csvString = csvRows.join("\n");
  var a         = document.createElement("a");
  a.href        = "data:attachment/csv," +  encodeURIComponent(csvString);
  a.target      = "_blank";
  var resultName = window.prompt("Name for results file?", format);
  if (resultName == null) resultName = format;
  a.download = resultName + ".csv";

  document.body.appendChild(a);
  a.click();
  
  alert("Finished! Your results have been downloaded.");
}

clearScreen();

//Counterbalancing Initializers
var directionCB = [48, 48] //cw | ccw

var startAngleCB = [24, 24, 24, 24] //0 | 90 | 180 | 270

var framesCB = [32, 32, 32] //13 | 19 | 25

var numInLastCB = [48, 48] //2 | 1

var sizeInPenultCB = [48, 48] //smaller | nosmaller

// END counterbalance

var redrawCounterMax = 0;
var direction, startAngle, numInLast, penult, rd;

//currentState is 0/1 if latest pressed thing is start/stop
var currentState = -1;

// degree count for cosine and sine
var x = 0;

//counters
var redrawCounter = 0;
var trialNumberCounter = 0;

//Loggers!!
var numInLastReal = [];
var numInLastGuess = [];

var rb = document.getElementById("rb");
var lb = document.getElementById("lb");
var guessMade = false;
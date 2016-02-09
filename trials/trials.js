var canvas = document.getElementById("canvas-container");
var cnv = document.getElementById("canvas");
var ctx = cnv.getContext("2d");
var anchor = document.getElementById("anchor");
var debugOn = false;

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
          if (randomNumber == 0 && thirteenCB > 0) {
            redrawCounterMax = 13;
            thirteenCB--;
          } else if (randomNumber == 1 && nineteenCB > 0) {
            redrawCounterMax = 19;
            nineteenCB--;
          } else if (randomNumber = 2 && twentyfiveCB > 0) {
            redrawCounterMax = 25;
            twentyfiveCB--;
          }
        }
        debug("RC: " + thirteenCB + " | " + nineteenCB + " | " + twentyfiveCB);

        //Initialize direction
        while (direction == "") {
          randomDirectionNumber = Math.floor(Math.random() * 2);

          if (randomDirectionNumber == 0 && ccwCB > 0) {
            direction = "ccw";
            ccwCB--;
          } else if (randomDirectionNumber == 1 && cwCB > 0) {
            direction = "cw";
            cwCB--;
          }
        }

        debug("DI: " + cwCB + " | " + ccwCB);

        //Initialize startAngle
        while (startAngle == 45) {
          randomNumberSA = Math.floor(Math.random() * 4);
          if (randomNumberSA == 0 && zeroCB > 0) {
            startAngle = 0;
            zeroCB--;
          } else if (randomNumberSA == 1 && ninetyCB > 0) {
            startAngle = 90;
            ninetyCB--;
          } else if (randomNumberSA == 2 && oneeightyCB > 0) {
            startAngle = 180;
            oneeightyCB--;
          } else if (randomNumberSA == 3 && twoseventyCB > 0) {
            startAngle = 270;
            twoseventyCB--;
          }
        }

        debug("SA: " + zeroCB + " | " + ninetyCB + " | " + oneeightyCB + " | " + twoseventyCB);

        //init oilCB tilCB
        while (numInLast == 0) {
          randomNumberInLast = Math.floor(Math.random() * 2);
          if (randomNumberInLast == 0 && oilCB > 0) {
            numInLast = 1;
            numInLastReal.push(1);
            oilCB--;
          } else if (randomNumberInLast == 1 && tilCB > 0) {
            numInLast = 2;
            numInLastReal.push(2);
            tilCB--;
          }
        }

        debug("LF: " + oilCB + " | " + tilCB);

        //init penultimate
        while (penult == "") {
          var randomNumberPenult = Math.floor((Math.random() * 2));
          if (randomNumberPenult == 0 && smallerinpenultCB > 0) {
            penult = "smallerinpenult";
            smallerinpenultCB--;
          }
          else if (randomNumberPenult == 1 && nosmallerinpenultCB > 0) {
            penult = "nosmallerinpenult";
            nosmallerinpenultCB--;
          }
        }

        debug("SP: " + smallerinpenultCB + " | " + nosmallerinpenultCB)

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
  ]

  for (var i = 0; i < 96; i++) {
    message.push([i+1, numInLastReal[i], numInLastGuess[i]]);
  }

  var csvRows = [];

  for(row in message) {
      csvRows.push(message[row].join(','));
  }

  var csvString = csvRows.join("\n")
  var a         = document.createElement("a");
  a.href        = "data:attachment/csv," +  encodeURIComponent(csvString);
  a.target      = "_blank";
  var n = ((new Date()).toISOString()).substring(0, 10);
  var resultName = window.prompt("Name for results file?", n);
  a.download    = resultName + ".csv";

  document.body.appendChild(a);
  a.click();
  
  alert("Finished! Your results have been downloaded.");
}

clearScreen();

//Counterbalancing Initializers
var cwCB, ccwCB;
cwCB = ccwCB = 48;

var zeroCB, ninetyCB, oneeightyCB, twoseventyCB;
zeroCB = ninetyCB = oneeightyCB = twoseventyCB = 24;

var thirteenCB, nineteenCB, twentyfiveCB;
thirteenCB = nineteenCB = twentyfiveCB = 32;

var tilCB, oilCB;
tilCB = oilCB = 48;

var smallerinpenultCB, nosmallerinpenultCB;
smallerinpenultCB = nosmallerinpenultCB = 48;

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
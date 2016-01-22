var ctx = document.getElementById("canvas").getContext("2d");
var debugOn = true;

var soundSix = document.getElementById("600");
var soundTwelve = document.getElementById("3000");

function soundOff() {
  soundSix.currentTime = 0;
  soundTwelve.currentTime = 0;
  if (document.title == "Trial 2") {
    soundSix.play();
  } else if(document.title == "Trial 3" && redrawCounter == redrawCounterMax - 2) {
    soundTwelve.play();
  } else if(document.title == "Trial 3") {
    soundSix.play();
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

function circle(angle, radius) {
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
  soundOff();
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
      console.log(trialNumberCounter)
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
            oilCB--;
          } else if (randomNumberInLast == 1 && tilCB > 0) {
            numInLast = 2;
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

        circle(x, 20);

        redrawCounter++;
      } else if (redrawCounter == redrawCounterMax - 2) {
        clearScreen();

        if (direction == "ccw") {
          x = x + 15;
        } else {
          x = x - 15;
        }

        if (penult == "smallerinpenult") {
          circle(x, 4);
        } else {
          circle(x, 20);
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

        circle(x, 20);

        redrawCounter++;
      } else if (redrawCounter == redrawCounterMax) {
        rd = 1000;
        clearScreen();
        trialNumberCounter++;
        redrawCounter = 0;
      } else alert("Error code 17");
      
      window.canvasTimer = setTimeout(redraw, rd);  
    }
  }
}

function startButton() {
  var pp = document.getElementById("pausePlay");
  pp.onclick = stopButton;
  pp.innerHTML = "STOP";
  alterCanvas();
}

function stopButton() {
  var pp = document.getElementById("pausePlay");
  pp.onclick = startButton;
  pp.innerHTML = "START";

  currentState = 1;
  clearTimeout(window.canvasTimer);
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
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
            realArray.push(1);
            oilCB--;
          } else if (randomNumberInLast == 1 && tilCB > 0) {
            numInLast = 2;
            realArray.push(2);
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
	guessArray.push(guessVal);
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

	emailjs.send("default_service","kavya_trial", {
		trialnum: trialNum,
		trialdesc: trialDesc,
		"actual1": realArray[0],
		"actual2": realArray[1],
		"actual3": realArray[2],
		"actual4": realArray[3],
		"actual5": realArray[4],
		"actual6": realArray[5],
		"actual7": realArray[6],
		"actual8": realArray[7],
		"actual9": realArray[8],
		"actual10": realArray[9],
		"actual11": realArray[10],
		"actual12": realArray[11],
		"actual13": realArray[12],
		"actual14": realArray[13],
		"actual15": realArray[14],
		"actual16": realArray[15],
		"actual17": realArray[16],
		"actual18": realArray[17],
		"actual19": realArray[18],
		"actual20": realArray[19],
		"actual21": realArray[20],
		"actual22": realArray[21],
		"actual23": realArray[22],
		"actual24": realArray[23],
		"actual25": realArray[24],
		"actual26": realArray[25],
		"actual27": realArray[26],
		"actual28": realArray[27],
		"actual29": realArray[28],
		"actual30": realArray[29],
		"actual31": realArray[30],
		"actual32": realArray[31],
		"actual33": realArray[32],
		"actual34": realArray[33],
		"actual35": realArray[34],
		"actual36": realArray[35],
		"actual37": realArray[36],
		"actual38": realArray[37],
		"actual39": realArray[38],
		"actual40": realArray[39],
		"actual41": realArray[40],
		"actual42": realArray[41],
		"actual43": realArray[42],
		"actual44": realArray[43],
		"actual45": realArray[44],
		"actual46": realArray[45],
		"actual47": realArray[46],
		"actual48": realArray[47],
		"actual49": realArray[48],
		"actual50": realArray[49],
		"actual51": realArray[50],
		"actual52": realArray[51],
		"actual53": realArray[52],
		"actual54": realArray[53],
		"actual55": realArray[54],
		"actual56": realArray[55],
		"actual57": realArray[56],
		"actual58": realArray[57],
		"actual59": realArray[58],
		"actual60": realArray[59],
		"actual61": realArray[60],
		"actual62": realArray[61],
		"actual63": realArray[62],
		"actual64": realArray[63],
		"actual65": realArray[64],
		"actual66": realArray[65],
		"actual67": realArray[66],
		"actual68": realArray[67],
		"actual69": realArray[68],
		"actual70": realArray[69],
		"actual71": realArray[70],
		"actual72": realArray[71],
		"actual73": realArray[72],
		"actual74": realArray[73],
		"actual75": realArray[74],
		"actual76": realArray[75],
		"actual77": realArray[76],
		"actual78": realArray[77],
		"actual79": realArray[78],
		"actual80": realArray[79],
		"actual81": realArray[80],
		"actual82": realArray[81],
		"actual83": realArray[82],
		"actual84": realArray[83],
		"actual85": realArray[84],
		"actual86": realArray[85],
		"actual87": realArray[86],
		"actual88": realArray[87],
		"actual89": realArray[88],
		"actual90": realArray[89],
		"actual91": realArray[90],
		"actual92": realArray[91],
		"actual93": realArray[92],
		"actual94": realArray[93],
		"actual95": realArray[94],
		"actual96": realArray[95],
		"guess1": guessArray[0],
		"guess2": guessArray[1],
		"guess3": guessArray[2],
		"guess4": guessArray[3],
		"guess5": guessArray[4],
		"guess6": guessArray[5],
		"guess7": guessArray[6],
		"guess8": guessArray[7],
		"guess9": guessArray[8],
		"guess10": guessArray[9],
		"guess11": guessArray[10],
		"guess12": guessArray[11],
		"guess13": guessArray[12],
		"guess14": guessArray[13],
		"guess15": guessArray[14],
		"guess16": guessArray[15],
		"guess17": guessArray[16],
		"guess18": guessArray[17],
		"guess19": guessArray[18],
		"guess20": guessArray[19],
		"guess21": guessArray[20],
		"guess22": guessArray[21],
		"guess23": guessArray[22],
		"guess24": guessArray[23],
		"guess25": guessArray[24],
		"guess26": guessArray[25],
		"guess27": guessArray[26],
		"guess28": guessArray[27],
		"guess29": guessArray[28],
		"guess30": guessArray[29],
		"guess31": guessArray[30],
		"guess32": guessArray[31],
		"guess33": guessArray[32],
		"guess34": guessArray[33],
		"guess35": guessArray[34],
		"guess36": guessArray[35],
		"guess37": guessArray[36],
		"guess38": guessArray[37],
		"guess39": guessArray[38],
		"guess40": guessArray[39],
		"guess41": guessArray[40],
		"guess42": guessArray[41],
		"guess43": guessArray[42],
		"guess44": guessArray[43],
		"guess45": guessArray[44],
		"guess46": guessArray[45],
		"guess47": guessArray[46],
		"guess48": guessArray[47],
		"guess49": guessArray[48],
		"guess50": guessArray[49],
		"guess51": guessArray[50],
		"guess52": guessArray[51],
		"guess53": guessArray[52],
		"guess54": guessArray[53],
		"guess55": guessArray[54],
		"guess56": guessArray[55],
		"guess57": guessArray[56],
		"guess58": guessArray[57],
		"guess59": guessArray[58],
		"guess60": guessArray[59],
		"guess61": guessArray[60],
		"guess62": guessArray[61],
		"guess63": guessArray[62],
		"guess64": guessArray[63],
		"guess65": guessArray[64],
		"guess66": guessArray[65],
		"guess67": guessArray[66],
		"guess68": guessArray[67],
		"guess69": guessArray[68],
		"guess70": guessArray[69],
		"guess71": guessArray[70],
		"guess72": guessArray[71],
		"guess73": guessArray[72],
		"guess74": guessArray[73],
		"guess75": guessArray[74],
		"guess76": guessArray[75],
		"guess77": guessArray[76],
		"guess78": guessArray[77],
		"guess79": guessArray[78],
		"guess80": guessArray[79],
		"guess81": guessArray[80],
		"guess82": guessArray[81],
		"guess83": guessArray[82],
		"guess84": guessArray[83],
		"guess85": guessArray[84],
		"guess86": guessArray[85],
		"guess87": guessArray[86],
		"guess88": guessArray[87],
		"guess89": guessArray[88],
		"guess90": guessArray[89],
		"guess91": guessArray[90],
		"guess92": guessArray[91],
		"guess93": guessArray[92],
		"guess94": guessArray[93],
		"guess95": guessArray[94],
		"guess96": guessArray[95]
	});
	alert("Finished! Your results have been sent. Redirecting to homepage...");
	window.location.assign("https://kylesferrazza.com/kavya-psych");
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
var realArray = [];
var guessArray = [];

var rb = document.getElementById("rb");
var lb = document.getElementById("lb");
var guessMade = false;
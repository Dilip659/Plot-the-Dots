var mode = 2;
var divisions = "0|1|2|3|4|5|6|7|8|9|10|11|12|13|14";
var answerDots = "6|2|3|5|2|5|0|0|2|10|7|4|1|3|4";
var axisName = "Minutes to eat breakfast";

$(document).ready(function(){
	if(mode === 1 || mode === 2){
		var canvas = document.getElementById("testCanvas");
		elemLeft = canvas.offsetLeft;
		elemTop = canvas.offsetTop;
		var ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(20, 260);
		ctx.lineTo(380, 260);
		ctx.stroke();
		ctx.font = "bold 12pt Times New Roman";
		ctx.fillText("Minutes to Eat Breakfast",130,290);
		var divLength = divisions.split("|").length;
		var dots = [];
		for(let i = 0;i < divLength;i++){
			perDivLength = 20 + Math.floor(i*(360/(divLength-1)));
			ctx.fillStyle = "#000000";
			ctx.beginPath();
			ctx.moveTo(perDivLength, 255);
			ctx.lineTo(perDivLength, 265);
			ctx.stroke();
			ctx.fillText(divisions.split("|")[i],perDivLength-3,275);
			if(mode === 1){
				ctx.fillStyle = "#008000";
				ctx.beginPath();
				let iterator = answerDots.split("|")[i];
				let j = 245;
				for(let count = 0;count < iterator;count++){
					ctx.arc(perDivLength, j, 6, 0, Math.PI * 2, true);
					j = j-15;
				}
				ctx.closePath();
				ctx.fill();
			}
			else if(mode === 2){
				ctx.fillStyle = "#F5F5F5";
				ctx.beginPath();
				for(let j = 245;j >= 15;){
					ctx.arc(perDivLength, j, 6, 0, Math.PI * 2, true);
					dots.push({
						x:perDivLength,
						y:j,
						radius:6,
					});
					j = j-15;
				}
				ctx.closePath();
				ctx.fill();
			}
		}
	}
	else{
		alert("Please enter correct mode.");
	}

	if(mode === 2){
		canvas.addEventListener('click',function(e){
			let segmentLength = parseInt($("#testCanvas").css('width'))/divLength;
			console.log(e.offsetX + " " + e.offsetY);
			let i = parseInt(e.offsetX/segmentLength);
			perDivLength = 20 + Math.floor(i*(360/(divLength-1)));
			ctx.fillStyle = "#008000";
			ctx.beginPath();
			let iterator = answerDots.split("|")[i];
			let j = 245;
			for(let count = 0;count < iterator;count++){
				ctx.arc(perDivLength, j, 6, 0, Math.PI * 2, true);
				j = j-15;
			}
			ctx.closePath();
			ctx.fill();
		});
	}
});
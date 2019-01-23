const mode = 2;
const divisions = "0|1|2|3|4|5|6|7|8|9|10|11|12";
const answerDots = "6|2|3|5|2|5|0|0|2|10|7|4|1";
const axisName = "Minutes to eat breakfast";

$(document).ready(function(){
	if(divisions.split("|").length == answerDots.split("|").length){
		if(mode === 1 || mode === 2){
			var canvas = document.getElementById("plotCanvas");
			var ctx = canvas.getContext("2d");
			var perDivLength,
				divLength = divisions.split("|").length,
				radius = 6,
				totalDots = 0;
			ctx.beginPath();
			ctx.moveTo(20, 260);
			ctx.lineTo(380, 260);
			ctx.stroke();
			ctx.font = "bold 12pt Times New Roman";
			ctx.fillText(axisName,130,290);
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
						ctx.arc(perDivLength, j, radius, 0, Math.PI * 2, true);
						j = j-15;
					}
					ctx.closePath();
					ctx.fill();
				}
				else if(mode === 2){
					ctx.fillStyle = "#F5F5F5";
					ctx.beginPath();
					totalDots = 0;
					for(let j = 245;j >= 15;){
						ctx.arc(perDivLength, j, radius, 0, Math.PI * 2, true);
						j = j-15;
						totalDots++;
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
				console.log(e.offsetX + " " + e.offsetY);
				//Dividing the canvas into segments
				let segmentLength = parseInt($("#plotCanvas").css('width'))/divLength;
				//Updating the dots on segment click
				let i = parseInt(e.offsetX/segmentLength);
				perDivLength = 20 + Math.floor(i*(360/(divLength-1)));
				ctx.fillStyle = "#008000";
				ctx.beginPath();
				let j = 245;
				for(let segmentHeight = 290;segmentHeight >= e.offsetY;){
					ctx.arc(perDivLength, j, radius, 0, Math.PI * 2, true);
					j = j-15;
					segmentHeight = segmentHeight - parseInt(290/(totalDots+1));
				}
				ctx.closePath();
				ctx.fill();
				ctx.fillStyle = "#FFFFFF";
				ctx.beginPath();
				for(j;j>=0;){
					ctx.arc(perDivLength, j, radius, 0, Math.PI * 2, true);
					j = j-15;
				}
				ctx.closePath();
				ctx.fill();
			});
		}
	}
	else{
		alert("Please provide correct information");
	}
});

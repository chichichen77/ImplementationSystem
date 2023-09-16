window.onload=function(){
	document.getElementById("agetext").value="";
	document.getElementById("sexselect").value="";
	document.getElementById("educationselect").value="";
	document.getElementById("maritalselect").value="";
	document.getElementById("childrenselect").value="";
	document.getElementById("workclassselect").value="";
	document.getElementById("raceselect").value="";
	document.getElementById("workhourstext").value="";
}



function testinput(){
	if(document.getElementById("agetext").value != "" &&
	document.getElementById("sexselect").value != "" &&
	document.getElementById("educationselect").value != "" &&
	document.getElementById("maritalselect").value != "" &&
	document.getElementById("childrenselect").value != "" &&
	document.getElementById("workclassselect").value != "" &&
	document.getElementById("raceselect").value != "" &&
	document.getElementById("workhourstext").value != "" )
	{
		if(document.getElementById("agetext").value >=1 &&
		document.getElementById("agetext").value <=100 &&
		document.getElementById("workhourstext").value >=1 &&
		document.getElementById("workhourstext").value <=120)
		{
			return("success");
		}
		else
		{
			alert("請確認age與workhours資料是否正確");
		}
	}
	else{
		alert("請完成上述表單!");
	}
}


function confirm(){
	if(testinput()!="success"){
		return;
	}
	else{
		if(document.getElementById("childrenselect").value=="one"){
			document.getElementById("finalanswer").innerHTML="<=50K";
		}//end if"childrenselect"=="1"

		else if(document.getElementById("childrenselect").value=="zero"){
			document.getElementById("finalanswer").innerHTML="<=50K";
		}//end if"childrenselect"=="0"

		else{
			if(document.getElementById("educationselect").value=="Before-Senior-High"){
				document.getElementById("finalanswer").innerHTML="<=50K";
			}
			else if(document.getElementById("educationselect").value=="Doctorate"){
				document.getElementById("finalanswer").innerHTML=">50K";
			}
			else if(document.getElementById("educationselect").value=="Masters"){
				document.getElementById("finalanswer").innerHTML=">50K";
			}
			else{
				if(document.getElementById("raceselect").value=="Black"){
					document.getElementById("finalanswer").innerHTML="<=50K";
				}
				else if(document.getElementById("raceselect").value=="Asian"){
					document.getElementById("finalanswer").innerHTML=">50K";
				}
				else if(document.getElementById("raceselect").value=="Other"){
					document.getElementById("finalanswer").innerHTML=">50K";
				}
				else{
					if(document.getElementById("workhourstext").value<=33){
						document.getElementById("finalanswer").innerHTML="<=50K";
					}
					else{
						if(document.getElementById("workclassselect").value=="Government"){
							if(document.getElementById("agetext").value>38){
								document.getElementById("finalanswer").innerHTML=">50K";
							}
							else{
								if(document.getElementById("agetext").value>32){
									document.getElementById("finalanswer").innerHTML="<=50K";
								}
								else{
									document.getElementById("finalanswer").innerHTML=">50K";
								}
							}
						}//Government
						else{
							if(document.getElementById("workhourstext").value>52){
								document.getElementById("finalanswer").innerHTML=">50K";
							}
							else{
								if(document.getElementById("sexselect").value=="MALE"){
									document.getElementById("finalanswer").innerHTML="<=50K";
								}
								else{
									if(document.getElementById("workhourstext").value>38){
										document.getElementById("finalanswer").innerHTML=">50K";
									}
									else{
										document.getElementById("finalanswer").innerHTML="<=50K";
									}
								}
							}
						}//Private
					}
				}
			}
		}//end if"childrenselect"=="2"
	}
		

	$.ajax({
		type:"POST",
		url:"php/DTsaver.php",
		data:{
			"agetext" : document.getElementById("agetext").value,
			"sexselect" : document.getElementById("sexselect").value,
			"educationselect" : document.getElementById("educationselect").value,
			"maritalselect" : document.getElementById("maritalselect").value,
			"childrenselect" : document.getElementById("childrenselect").value,
			"workclassselect" : document.getElementById("workclassselect").value,
			"raceselect" : document.getElementById("raceselect").value,
			"workhourstext" : document.getElementById("workhourstext").value,
			"finalanswer" : document.getElementById("finalanswer").innerHTML,
		},

		success:function(data){
			alert("第"+data+"筆資料記錄成功");
		},
		error:function(){
			alert("發生錯誤 狀態:" + jqXHR.readyState + "    " +jqXHR.status);
		},
	});

	//所有條件結束後清空
	document.getElementById("agetext").value="";
	document.getElementById("sexselect").value="";
	document.getElementById("educationselect").value="";
	document.getElementById("maritalselect").value="";
	document.getElementById("childrenselect").value="";
	document.getElementById("workclassselect").value="";
	document.getElementById("raceselect").value="";
	document.getElementById("workhourstext").value="";

}
function gohome(){
	window.location='main.html';
}
function clearResult(){
	document.getElementById("finalanswer").innerHTML="";
}
function toKmeans(){
	window.location='Kmeans.html';
	alert("切換到\'分群KNN與交叉分析\'");
}

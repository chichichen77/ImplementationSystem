var alldata=new Object();
var nowdata=new Array(14);
var knnscore=new Array(814);

window.onload=function(){
	document.getElementById("agetext").value="";
	document.getElementById("sexselect").value="";
	document.getElementById("educationselect").value="";
	document.getElementById("maritalselect").value="";
	document.getElementById("childrenselect").value="";
	document.getElementById("workclassselect").value="";
	document.getElementById("raceselect").value="";
	document.getElementById("workhourstext").value="";

	queryallfromdb("kmeanscentroid");
	queryallfromdb("testdata");
}

function queryallfromdb(target){
	$.ajax({
		type:"POST",
		url:"php/simpleml_sql.php",
		data:{
			"targettable":target,
		},
		success:function(data){
			data=JSON.parse(data);
			// console.log(data);
			alldata[target]=data;
		},
		error:function(){
			alert("發生錯誤 狀態:" + jqXHR.readyState + "  " + jqXHR.status);
		},
	},)
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
			nowdata[0]=document.getElementById("agetext").value;
			nowdata[1]=document.getElementById("sexselect").value;
			nowdata[2]=document.getElementById("educationselect").value;
			nowdata[3]=document.getElementById("maritalselect").value;
			nowdata[4]=document.getElementById("childrenselect").value;
			nowdata[5]=document.getElementById("workclassselect").value;
			nowdata[6]=document.getElementById("raceselect").value;
			nowdata[7]=document.getElementById("workhourstext").value;
			// console.log(nowdata);
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

function kmeans(){
	if(testinput()!="success"){
		return;
	}
	else{
		var kscore=new Array(6);//紀錄6個值新距離的變數
		for(var j=0;j<=5;j++)//6組值心
		{
			var tempscore=0;//紀錄每一群暫存分數
			for(var i=0;i<=7;i++)//計算所有變數加總
			{
				
				if(i==0)//age(數值型)
				{
					tempscore+=1-Math.abs(nowdata[i]-alldata["kmeanscentroid"][j][i+1])/(90-17);
				}
				else if(i==7)//workhours(數值型)
				{
					tempscore+=1-Math.abs(nowdata[i]-alldata["kmeanscentroid"][j][i+1])/(99-2);
				}
				else//剩餘其他變數(名目變數,相同則為1)
				{
					if(nowdata[i]==alldata["kmeanscentroid"][j][i+1])//第一欄放群數,j是群
					{
						tempscore++;
					}
				}
			}
			kscore[j]=tempscore;//"j"=>第幾群相似度
		}
		var nowcluster=kscore.indexOf(Math.max.apply(null,kscore))+1;
		document.getElementById("nowcluster").innerHTML=nowcluster;//結果寫回去
		var nowkmeanspep=alldata["kmeanscentroid"][nowcluster-1][9];
		document.getElementById("nowkmeanspep").innerHTML=nowkmeanspep;//結果寫回去
		nowdata[8]=nowcluster;
		nowdata[9]=nowkmeanspep;
	}
}

function knn(){
	if(testinput()!="success"){
		return;
	}
	for(var j=0;j<=813;j++)//跟測試資料比814筆
	{
		var tempscore=0;
		for(var i=0;i<=7;i++)//計算所有變數加總
		{
				
			if(i==0)//age(數值型)
			{
				tempscore+=1-Math.abs(nowdata[i]-alldata["testdata"][j][i+1])/(90-17);
			}
			else if(i==7)//workhours(數值型)
			{
				tempscore+=1-Math.abs(nowdata[i]-alldata["testdata"][j][i+1])/(99-2);
			}
			else//剩餘其他變數(名目變數,相同則為1)
			{
				if(nowdata[i]==alldata["testdata"][j][i+1])//第一欄放群數,j是群
				{
					tempscore++;
				}
			}
		}
		knnscore[j]=tempscore;
	}//資料總比數

	var nowknnid=knnscore.indexOf(Math.max.apply(null,knnscore))+1;
	document.getElementById("nowknnid").innerHTML=nowknnid;//結果寫回去
	var nowknnpep=alldata["testdata"][nowknnid-1][9];
	document.getElementById("nowknnpep").innerHTML=nowknnpep;//結果寫回去
	nowdata[10]=nowknnid;
	nowdata[11]=nowknnpep;//紀錄最像的人是多少
}

function crossanalysis(){
	var nowcapep="";//原始資料庫格式相同
	if(testinput()!="success"){
		return;
	}
	if(!nowdata[8]){
		alert("請先進行分群");
	}
	else if(nowdata[8]=="1"){
		if(nowdata[2]=="Bachelors"){
			nowcapep="薪水強烈<=50K";
		}
		else if(nowdata[2]=="Masters"){
			if(nowdata[3]=="Married"){
				if(nowdata[5]=="Private"){
					nowcapep="薪水強烈>50K";
				}
			}
		}
	}
	else if(nowdata[8]=="2")
	{
		if(nowdata[2]=="Bachelors"){
			nowcapep="薪水強烈<=50K";
		}
		else if(nowdata[2]=="Doctorate"){
			nowcapep="薪水強烈<=50K";
		}
		else if(nowdata[2]=="Masters"){
			if(nowdata[0]>=45){
				nowcapep="薪水強烈<=50K";
			}
			else if(nowdata[0]<45){
				nowcapep="薪水強烈>50K";
			}
			
		}
	}
	else if(nowdata[8]=="3")
	{
		if(nowdata[2]=="Before-Senior-High"){
			nowcapep="薪水強烈<=50K";
		}
		else if(nowdata[2]=="Masters"){
			if(nowdata[0]>=30){
				nowcapep="薪水強烈>50K";
			}
			else{
				nowcapep="薪水強烈<=50K";
			}
		}
		else if(nowdata[2]=="Doctorate"){
			nowcapep="薪水強烈<=50K";
		}
	}
	else if(nowdata[10]=="4")
	{
		if(nowdata[2]=="Bachelors"){
			nowcapep="薪水強烈<=50K";
		}
		else if(nowdata[2]=="Doctorate"){
			nowcapep="薪水強烈<=50K";
		}
	}
	else if(nowdata[10]=="5")
	{
		if(nowdata[2]=="Before-Senior-High"){
			nowcapep="薪水強烈>50K";
		}
		else if(nowdata[2]=="Doctorate"){
			nowcapep="薪水強烈>50K";
		}
		else if(nowdata[2]=="Masters"){
			if(nowdata[0]==58){
				nowcapep="薪水強烈<=50K";
			}
		}
		else{
			nowcapep="薪水強烈>50K";
		}
	}
	else if(nowdata[10]=="6")
	{
		if(nowdata[2]=="Bachelors"){
			nowcapep="薪水強烈<=50K";
		}
	}

	if(!nowcapep){
		nowcapep="NONE";
	}
	document.getElementById("nowcafinal").innerHTML=nowcapep;//結果寫回去
	nowdata[12]=nowcapep;//紀錄交叉分析結果
	
	console.log(nowdata);
}//交叉分析(條件判斷)


function sendresult(){
	if(!nowdata[8]){
		alert("請先進行kmeans");
		return;
	}
	else if(nowdata[10]=""){
		alert("請先進行knn");
		return;
	}
	else if(nowdata[12]=""){
		alert("請先進行交叉分析");
		return;
	}
	$.ajax({
		type:"POST",//資料傳輸方式
		url:"php/SaveData.php",
		data:{"nowdata":nowdata},
		success:function(data){
			alert("第"+data+"筆資料記錄成功");
		},
		error:function(){
			alert("發生錯誤 狀態:" + jqXHR.readyState + "  " + jqXHR.status);
		},
	});
}//send data result

function emptyinput(){
	document.getElementById("agetext").value="";
	document.getElementById("sexselect").value="";
	document.getElementById("educationselect").value="";
	document.getElementById("maritalselect").value="";
	document.getElementById("childrenselect").value="";
	document.getElementById("workclassselect").value="";
	document.getElementById("raceselect").value="";
	document.getElementById("workhourstext").value="";

	document.getElementById("nowcluster").innerHTML = "";
	document.getElementById("nowkmeanspep").innerHTML = "";
	document.getElementById("nowknnid").innerHTML = "";
	document.getElementById("nowknnpep").innerHTML = "";
	document.getElementById("nowcafinal").innerHTML = "";
	nowdata.length=0;
	
}


function goPage1(){
	window.location='DecisionTree.html';
	alert("切換到\'決策樹\'");
}
function goPage2(){
	window.location='Kmeans.html';
	alert("切換到\'分群KNN與交叉分析\'");
}
function gosmile(){

	var yes = confirm('你確定嗎？');

	if (yes) {
	    alert('你按了確定按鈕');
	} else {
	    alert('你按了取消按鈕');
	}
	
}


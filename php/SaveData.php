<?php

include("connect.php");
header("Connect-type = text/html; charset = utf-8;");
$slcdb = mysqli_select_db($db_link,"finalproject");
// if(!$slcdb){die("資料庫連接失敗");}
// else{echo "資料庫連接成功";}

$nowdata=$_POST['nowdata'];


$sql_query = "INSERT INTO `kmeansrcd`(`age`, `sex`, `education`, `marital`, `children`, `workclass`, `race`, `workhours`, `kmeans_cluster`, `kmeans_income`, `knn_id`, `knn_income`, `ca_income`) VALUES ('".$nowdata[0]."','".$nowdata[1]."','".$nowdata[2]."','".$nowdata[3]."','".$nowdata[4]."','".$nowdata[5]."','".$nowdata[6]."','".$nowdata[7]."','".$nowdata[8]."','".$nowdata[9]."','".$nowdata[10]."','".$nowdata[11]."','".$nowdata[12]."')";
	
$result=mysqli_query($db_link,$sql_query);
$sql_lastone="SELECT `id` FROM `kmeansrcd` order by `id` desc LIMIT 0,1";
$lastonequery=mysqli_query($db_link,$sql_lastone);
$row=mysqli_fetch_array($lastonequery,MYSQLI_ASSOC);
if($result){
	echo $row["id"];
}else{
	echo $sql_query;
}
?>
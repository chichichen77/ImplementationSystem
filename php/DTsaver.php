<?php
include("connect.php");
header("Connect-type: text/html; charset = utf-8");
$slcdb = mysqli_select_db($db_link,"finalproject");
// if(!$slcdb)die("資料庫選擇失敗");


$age=$_POST["agetext"];
$sex=$_POST["sexselect"];
$education=$_POST["educationselect"];
$marital=$_POST["maritalselect"];
$children=$_POST["childrenselect"];
$workclass=$_POST["workclassselect"];
$race=$_POST["raceselect"];
$workhours=$_POST["workhourstext"];
$income=$_POST["finalanswer"];

$sql_query="INSERT INTO `dtrecord`(`age`, `sex`, `education`, `marital`, `children`, `workclass`, `race`, `workhours`, `income`) VALUES (".$age.",'".$sex."','".$education."','".$marital."','".$children."','".$workclass."','".$race."',".$workhours.",'".$income."')";


$result=mysqli_query($db_link,$sql_query);
$sql_lastone="SELECT `id` FROM `dtrecord` order by `id` desc LIMIT 0,1";
$lastonequery=mysqli_query($db_link,$sql_lastone);
$row=mysqli_fetch_array($lastonequery,MYSQLI_ASSOC);
if($result){
	echo $row["id"];
}else{
	echo $sql_query;
}
?>
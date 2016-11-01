
<?php
header("Access-Control-Allow-Origin: *");


$ddata = '
{"series":[
[ ' . rand(-100, 100) . '],
[ ' . rand(-100, 100) . ']
  ]
  ,"labels" : [ ' . Date("H:i") . ']
}
';


echo $ddata;
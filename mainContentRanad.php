
<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');

$ddataa = '
{"series":[
[' . rand(-100, 100) . '],
[' . rand(-100, 100) . ']
  ]
  ,"labels" : ["' . Date("H:i") . '"]
}
';


echo $ddataa;
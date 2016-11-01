
<?php
header("Access-Control-Allow-Origin: http://pdmsssa.dev");

$ddata[0] = '
{"series":[
[25],
[68]
  ],
  "labels" : ["09:00"]
}
';

$ddata[1] = '
{"series":[
[75],
[-28]
  ],
  "labels" : ["10:00"]
}
';

$ddata[2] = '
{"series":[
[15],
[38]
  ]
  ,"labels" : ["11:00"]
}
';


echo $ddata[rand(0,2)];
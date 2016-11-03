<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');

$ddata = '{
  "series":[
    [5, 59, -80, -81, -56, 55, 40],
    [-28, -88, 60, -19, -76, 27, 20]
  ],
  "labels" : ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"]
}';

echo $ddata;

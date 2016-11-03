<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('Africa/Johannesburg');

$data = '{
  "series":[25, -19, 50, 61, -46, 15, 80],
  "labels" : ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"]
}';

echo $data;

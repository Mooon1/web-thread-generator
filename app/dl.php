<?php

if(!isset($_GET['t']) || empty($_GET['t'])){
    return;
}

$data = base64_decode($_GET['t']);

header('Content-Disposition: attachment; filename="' . json_decode($data, true)['name'] . '.json"');
header('Content-Type: application/json');
header('Content-Length: ' . strlen($data));
header('Connection: close');

echo $data;

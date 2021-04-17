<?php

if(!isset($_GET['t']) || empty($_GET['t'])){
    return;
}

$data = base64_decode($_GET['t']);

echo $data;

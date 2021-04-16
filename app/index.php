<?php

use ThreadGenerator\Controller\ThreadController;

require_once __DIR__ . "/controller/ThreadController.php";

$data = null;
$message = null;

$ctrl = new ThreadController();

if(isset($_GET['thread']) || !empty($_GET['thread'])){
    $data = $ctrl->find($_GET['thread']);
    $message = 'Thread found.';
}else{
    if(!isset($_POST['name']) || empty($_POST['name'])){
        return;
    }

    $f = fopen('cache/' . $_POST['name'] . '.json', 'w+');
    fwrite($f, json_encode($_POST, JSON_PRETTY_PRINT));
    fclose($f);
    $message = 'Thread stored.';
}

echo json_encode([
    'message' => $message,
    'data' => $data
]);

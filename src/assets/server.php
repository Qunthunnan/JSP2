<?php
$data = json_decode(file_get_contents("php://input"), true);
foreach ($data as $key => $value) {
    printf ($key . ' : ' . $value);
    echo '';
    if($key == 'upload') {
        foreach($key as $imageKey => $imageValue) {
            printf ($imageKey . ' : ' . $imageValue);
            echo '';
        }
    }
}
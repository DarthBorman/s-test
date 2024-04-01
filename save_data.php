<?php

$result = [];
if (!empty($_POST['name-1']) && !empty($_POST['name-2']) && !empty($_POST['tel']) && !empty($_POST['mail'])) {
    $new_submit = 'First name: '. $_POST['name-1'] . "\t" . 'Second name: ' . $_POST['name-2'] . "\t"  . 'Phone: ' . $_POST['tel'] . "\t"  . 'E-mail: ' . $_POST['mail'] . "\n";
    $handle = fopen("submits.txt", "a");
    fwrite($handle , $new_submit);
    fclose($handle);
    $result['result'] = 'Your information has been added';
    echo json_encode($result);
}


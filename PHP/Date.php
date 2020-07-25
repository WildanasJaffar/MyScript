<?php
    function validate_date($date){
        if (empty($date)) return "Date is empty!";
        if (preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/", $date)) return "Format date is valid";
        return "Format date is invalid";
    }
    
    $your_date = date("d/m/Y");
    $your_date = str_replace('/', '-', $your_date);
    $your_date = date("Y-m-d", strtotime($your_date));
    echo validate_date($your_date);
?>

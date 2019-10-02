<?php
    $SERVERNAME = "typenynecomdb.c6qnoyqb7ujb.us-west-2.rds.amazonaws.com";
    $USERNAME = "type9master";
    $PASSWORD = "type9zx41";

    // Create connection
    $conn = new mysqli($SERVERNAME, $USERNAME, $PASSWORD);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    echo "Connected successfully";
?>
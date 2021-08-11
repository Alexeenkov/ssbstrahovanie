<?php
$blocked_mail = array(
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'testmmm@test.ru'
);


$blocked_ip = array(
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'',
'111.111.111.111'
);


$mail = strtolower($_POST['email']);
$get_ip = get_ip();

if (in_array($mail, $blocked_mail)) {
    echo "block";
} else if (in_array($get_ip, $blocked_ip)) {
    echo "block";
}


function get_ip() {
		$get_ip = '';
		if (!empty($_SERVER['HTTP_CLIENT_IP']))
		{
			$get_ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			$get_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} elseif (!empty($_SERVER['REMOTE_ADDR'])) {
			$get_ip = $_SERVER['REMOTE_ADDR'];
		}
		return $get_ip;
}
//echo "block";
?>
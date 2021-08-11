<?php

if (!empty($_POST)) {
	$curl = curl_init();
	$drivers = $_POST['drivers'];
	$results = array();
	$myObj = new StdClass;
	foreach ($drivers as $driver) {

		$item = explode(';', $driver);
		$fio_str = preg_replace('/\s+/', ' ', $item[0]);
		$fio = explode(' ',$fio_str);

		 //инициализация сеанса

$url = 'https://agent.kbm-pro.ru/API/';
$post_data = array(
	'API'		=> 'b347a7e-fcc625b-01c0673-6c8d7e8-5609',
	'GetKBM'	=> true,
	'F'		=> $fio[0],
	'I'		=> $fio[1],
	'O'		=> $fio[2],
	'Birthday'	=> $item[2],
	'SerialVU'	=> $item[3],
	'NumberVU'	=> $item[4]
);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
$res = curl_exec($ch);
curl_close($ch);


//		echo $res;

		//если ошибка то печатаем номер и сообщение
		if(!$res) {

			$error = curl_error($curl).'('.curl_errno($curl).')';

			//echo $error;

		}

		else {
			//header('Access-Control-Allow-Origin: http://localhost:8080');
			$response = json_decode($res, true); // преобразование строки в формате json в ассоциативный массив
			$code = $response['status'];
			$id = $response['results'][0]['kbm'];
			$error = $response['message'];
//		$response1 = json_decode($response['results'], true);
//var_dump($response) ;
			if(empty($code)){
				$subject  = "Сервис проверки КБМ недоступен";
				$headers="From: OSAGO <osago>\r\nReply-To: Osago\r\n";
                $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
				$str = "Сервис проверки КБМ недоступен";
				@mail('osagopoisk@gmail.com', $subject, $str, $headers);
			}
			elseif($code=='error') {
				$subject  = "КБМ сервер вернул ошибку ФИО: ".$fio[0].' '.$fio[1].' '.$fio[2];
				$headers="From: OSAGO <osago>\r\nReply-To: Osago\r\n";
                $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
				$str = "КБМ сервер вернул ошибку".$error."\r\n".
				"<br>Дата: ".$item[1]."\r\n".
				"<br>ФИО: ".$fio[0].' '.$fio[1].' '.$fio[2]."\r\n".
				"<br>Дата рождения: ".$item[2]."\r\n".
				"<br>Серия и номер: ".$item[3]." ".$item[4];
				@mail('osagopoisk@gmail.com', $subject, $str, $headers);
			}
			elseif($id=='1.') {
				$subject  = "КБМ водителя не найден ФИО: ".$fio[0].' '.$fio[1].' '.$fio[2];
				$headers="From: OSAGO <osago>\r\nReply-To: Osago\r\n";
                $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
				$str = "Скрипт не нашел водителя"."\r\n".
				"<br>Дата: ".$item[1]."\r\n".
				"<br>ФИО: ".$fio[0].' '.$fio[1].' '.$fio[2]."\r\n".
				"<br>Дата рождения: ".$item[2]."\r\n".
				"<br>Серия и номер: ".$item[3]." ".$item[4];
				@mail('osagopoisk@gmail.com', $subject, $str, $headers);
			}


			$myObj->KBM[] = "$id";

			$results[] = $myJSON;
			//echo ($myJSON);

		}
		sleep(1);
	}
	$myJSON = json_encode($myObj);
	echo $myJSON;


}
?>




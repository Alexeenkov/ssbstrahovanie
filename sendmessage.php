<?php
$sendto   = "konsalting2013@gmail.com";
if($_POST['phone']){
	$kbm_dt = $_POST['kbm_dt'];
	$phone = $_POST['phone'];
	$email  = $_POST['email'];
	$message_topic = $_POST['message_topic'];
	$ts_type = $_POST['ts_type'];
	if ($_POST['pricep'] == '1') $pricep = 'Да';
	else $pricep = 'Нет';
	$mark = $_POST['mark'];
	$model = $_POST['model'];
	$moshnost = $_POST['moshnost'];
	$auto_year = $_POST['auto_year'];
	if ($_POST['vin']) $vin = $_POST['vin'];
	if ($_POST['body']) $body = $_POST['body'];
	if ($_POST['shassi']) $shassi = $_POST['shassi'];
	$gn = $_POST['gos_nomer'];
	$doc_type = 'Паспорт ТС';
	if ($_POST['doc_type_val'] == 'sts') {
    $doc_type = 'Свидетельство о регистрации ТС';
	}
	$doc_seria = $_POST['doc_seria'];
	$doc_number = $_POST['doc_number'];
	$doc_bd = $_POST['doc_bd'];
	$dk_num = $_POST['dk_num_k'];
	if ($dk_num == 'диагностическая карта отсутствует') {
        $dk_date_to = '-';
	}
	else $dk_date_to = $_POST['dk_date_to'];
	if ($_POST['neogr_val'] == 2) $neogr = 'Неограниченный список';
	else {
		$neogr = 'Ограниченный список';
		$i = 0;
		$j = 1;
		$driver_isst = 'driver-1-fio';
		while ($_POST[$driver_isst]):
			$drivers[$i][0] = $_POST['driver-'.$j.'-fio'];
			$drivers[$i][1] = $_POST['driver-'.$j.'-bd'];
			$drivers[$i][2] = $_POST['driver-'.$j.'-stage'];
			$drivers[$i][3] = $_POST['driver-'.$j.'-seria'];
			$drivers[$i][4] = $_POST['driver-'.$j.'-number'];
			$drivers[$i][5] = $_POST['driver-'.$j.'-kbm'];
			$drivers[$i][6] = $_POST['driver-'.$j.'-kvs'];
			$i++;
			$j++;
			$driver_isst = 'driver-'.$j.'-fio';
		endwhile;
	}
	$name_s = $_POST['insurant_name'];
	$bd_s = $_POST['insurant_bd'];
	$seria_s = $_POST['insurant_seria'];
	$number_s = $_POST['insurant_number'];
	$di_s = $_POST['insurant_di'];
	$issued_s = $_POST['insurant_issued'];
	$region_s = $_POST['region_s'];
	$city_s = $_POST['city_s'];
	if ($_POST['ncity_s']) $ncity_s = $_POST['ncity_s'];
	$address_s = $_POST['address_s'];
	if ($_POST['insurant_is_owner'] == 1) $iio = 'Страхователь является собственником';
	else {
        $name_sob = $_POST['name_sob'];
		$bd_sob = $_POST['bd_sob'];
		$seria_sob = $_POST['seria_sob'];
		$number_sob = $_POST['number_sob'];
		$di_sob = $_POST['di_sob'];
		$issued_sob = $_POST['issued_sob'];
		$region_sob = $_POST['region_sob'];
		$city_sob = $_POST['city_sob'];
		if ($_POST['ncity_sob']) $ncity_sob = $_POST['ncity_sob'];
		$address_sob = $_POST['address_sob'];
	}
	$insuranceType = $_POST['insuranceType'];
	$totalPrice = $_POST['totalPrice'];
	$ip = get_ip();
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

// Формирование заголовка письма
$subject  = $message_topic." ".$email;
$headers="From: OSAGO <osago>\r\nReply-To: Osago\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;line-height:10px;'>";
// $msg .= "<p><strong>Какая сумма то в итоге?:</strong> ".$totalPrice."</p>\r\n";
// $msg .= "<p><strong>Ссылка оплаты для клиента:</strong> https://".$price."&EMAil=".$email." </p>\r\n";
$msg .= "<p><strong>Дата начала страхования:</strong> ".$kbm_dt."</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
$msg .= "<p><strong>Email:</strong> ".$email."</p>\r\n\n";
$msg .= "<p><strong>IP-адрес клиента:</strong> ".$ip."</p>\r\n";
$msg .= "<div style='height=20px;'>------------------------------------------------------------</div>";
$msg .= "<p><strong>Тип ТС:</strong> ".$ts_type."</p>\r\n";
$msg .= "<p><strong>Используется с прицепом: </strong> ".$pricep."</p>\r\n";
$msg .= "<p><strong>Марка:</strong> ".$mark."</p>\r\n";
$msg .= "<p><strong>Модель:</strong> ".$model."</p>\r\n";
$msg .= "<p><strong>Мощность:</strong> ".$moshnost."</p>\r\n";
$msg .= "<p><strong>Год выпуска:</strong> ".$auto_year."</p>\r\n\n";
if ($vin) $msg .= "<p><strong>VIN:</strong> ".$vin."</p>\r\n\n";
if ($body) $msg .= "<p><strong>Кузов:</strong> ".$body."</p>\r\n\n";
if ($shassi) $msg .= "<p><strong>Шасси:</strong> ".$shassi."</p>\r\n\n";
$msg .= "<p><strong>Гоc. номер:</strong> ".$gn."</p>\r\n\n";
$msg .= "<p><strong>Документ на автомобиль:</strong> ".$doc_type."</p>\r\n";
$msg .= "<p><strong>Серия:</strong> ".$doc_seria."</p>\r\n";
$msg .= "<p><strong>Номер:</strong> ".$doc_number."</p>\r\n";
$msg .= "<p><strong>Дата выдачи:</strong> ".$doc_bd."</p>\r\n\n";
$msg .= "<div style='height=20px;'>------------------------------------------------------------</div>";
$msg .= "<p><strong>Номер диагностической карты:</strong> ".$dk_num."</p>\r\n";
$msg .= "<p><strong>Срок действия диагностической карты:</strong> ".$dk_date_to."</p>\r\n\n";
$msg .= "<div style='height=20px;'>------------------------------------------------------------</div>";
if ($neogr == 'Ограниченный список') {
	$k = 1;
	foreach ($drivers as $driver) {
		$msg .= "<p><strong>Водитель №".$k.":</strong></p>\r\n";
		$msg .= "<p><strong>ФИО: </strong>".$driver[0]."</p>\r\n";
		$msg .= "<p style='font-size: 8px'><strong>КБМ: </strong>".$driver[5]."</p>\r\n";
		$msg .= "<p style='font-size: 8px'><strong>КВС: </strong>".$driver[6]."</p>\r\n";
		$msg .= "<p><strong>Дата рождения: </strong>".$driver[1]."</p>\r\n";
		$msg .= "<p><strong>Дата начала стажа: </strong>".$driver[2]."</p>\r\n";
		$msg .= "<p><strong>Серия в/у: </strong>".$driver[3]."</p>\r\n";
		$msg .= "<p><strong>Номер в/у: </strong>".$driver[4]."</p>\r\n\n";
		$msg .= "<div style='height=20px;'>------------------------------------------------------------</div>";
		$k++;
	}
}
else {
	$msg .= "<p><strong>НЕОГРАНИЧЕННЫЙ СПИСОК ВОДИТЕЛЕЙ</strong></p>\r\n\n";
	$msg .= "<div style='height=20px;'>------------------------------------------------------------</div>";
}
$msg .= "<p><strong>СТРАХОВАТЕЛЬ:</strong></p>\r\n";
$msg .= "<p><strong>ФИО:</strong> ".$name_s."</p>\r\n";
$msg .= "<p><strong>Дата рождения:</strong> ".$bd_s."</p>\r\n";
$msg .= "<p><strong>Серия паспорта:</strong> ".$seria_s."</p>\r\n";
$msg .= "<p><strong>Номер паспорта:</strong> ".$number_s."</p>\r\n";
$msg .= "<p><strong>Дата выдачи:</strong> ".$di_s."</p>\r\n";
$msg .= "<p><strong>Выдан:</strong> ".$issued_s."</p>\r\n";
$msg .= "<p><strong>Регион:</strong> ".$region_s."</p>\r\n";
$msg .= "<p><strong>Город:</strong> ".$city_s."</p>\r\n";
if ($ncity_s) $msg .= "<p><strong>Город(если другие города):</strong> ".$ncity_s."</p>\r\n";
$msg .= "<p><strong>Адресс:</strong> ".$address_s."</p>\r\n\n";
$msg .= "<div style='height=20px;'>------------------------------------------------------------</div>";
if ($iio) $msg .= "<p><strong>Страхователь является собственником</strong></p>\r\n";
else {
	$msg .= "<p><strong>СОБСТВЕННИК:</strong></p>\r\n";
	$msg .= "<p><strong>ФИО:</strong> ".$name_sob."</p>\r\n";
	$msg .= "<p><strong>Дата рождения:</strong> ".$bd_sob."</p>\r\n";
	$msg .= "<p><strong>Серия паспорта:</strong> ".$seria_sob."</p>\r\n";
	$msg .= "<p><strong>Номер паспорта:</strong> ".$number_sob."</p>\r\n";
	$msg .= "<p><strong>Дата выдачи:</strong> ".$di_sob."</p>\r\n";
	$msg .= "<p><strong>Выдан:</strong> ".$issued_sob."</p>\r\n";
	$msg .= "<p><strong>Регион:</strong> ".$region_sob."</p>\r\n";
	$msg .= "<p><strong>Город:</strong> ".$city_sob."</p>\r\n";
	if ($ncity_s) $msg .= "<p><strong>Город(если другие города):</strong> ".$ncity_sob."</p>\r\n";
	$msg .= "<p><strong>Адрес:</strong> ".$address_sob."</p>\r\n\n";
}
$msg .= "<div style='height=20px;'>------------------------------------------------------------</div>";
$msg .= $_POST['itogs'];
$msg .= "<div style='height=20px;'>------------------------------------------------------------</div>";
$msg .= "<p><strong>Клиент выбрал страховую компанию:</strong> ".$insuranceType."</p>\r\n";
$msg .= "<p><strong>Сумма:</strong> ".$totalPrice."</p>\r\n";
$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
	$message = 'Данные отправлены!';
} else {
	$message = 'Ошибка!';
}

$responce = ['message' => $message];

header('Content-type: application/json');
echo json_decode($responce);
?>
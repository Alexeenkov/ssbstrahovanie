<?
/*require_once('DiDom/ClassAttribute.php');
require_once('DiDom/Document.php');
require_once('DiDom/Element.php');
require_once('DiDom/Encoder.php');
require_once('DiDom/Errors.php');
require_once('DiDom/Query.php');
require_once('DiDom/StyleAttribute.php');
require_once('DiDom/Exceptions/InvalidSelectorException.php');
use DiDom\ClassAttribute;
use DiDom\Document;
use DiDom\Element;
use DiDom\Encoder;
use DiDom\Errors;
use DiDom\Query;
use DiDom\StyleAttribute;
use DiDom\Exceptions\InvalidSelectorException;
$mysqli = new mysqli("localhost", "inpromarket_osag", "i2251qbg", "inpromarket_osag");

if ($mysqli->connect_errno) {
    echo "Не удалось подключиться к MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
$document = new Document('http://osagocalc.tmweb.ru/autobd.html', true);

$posts = $document->find('.select2');

foreach($posts as $post) {
	$options = $post->find('option');
	$mark = $post->attr('data-mark');
	foreach($options as $option) {
		$name = $option->text();
		
		if (!$mysqli->query("INSERT INTO model(mark_name,name) VALUES ('".$mark."','".$name."')")) {
		    echo "Не удалось создать таблицу: (" . $mysqli->errno . ") " . $mysqli->error;
		}
	}
    echo $post->text(), "\n";
}
mysql_close($mysqli);*/
if(isset($_POST['mark'])){
	$mysqli = new mysqli("localhost", "vip", "d4a3f16c", "vip");
    mysqli_set_charset($mysqli, "utf8");
	$result = $mysqli->query("SELECT name FROM model WHERE mark_name='".$_POST['mark']."'");
	$data[] = '<option>Выберите модель</option>';
	while ($row = mysqli_fetch_assoc($result)) {
		$data[] = '<option>'.$row['name'].'</option>';
	}
	mysqli_close($mysqli);
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
}
?>
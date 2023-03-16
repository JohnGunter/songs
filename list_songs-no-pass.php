<?
/********************************************************************
* Song Listing PHP Fetch For Angular Music Page
*
* copyright: 2023 JohnPrime.com
* author: John E. Gunter
*
*********************************************************************/

$host = 'localhost';
$db = 'johnprim_entertainment';
$user = '';
$pass = '';
$charset = 'utf8';
$table = 'music';
$buffer = array();

$pdo = new PDO("mysql:host=".$host.";dbname=".$db.";charset=utf8",$user,$pass);
$query = $pdo->prepare("SELECT id, name, band FROM $table ORDER BY name ASC");
$query->execute();
if( $query->rowCount() > 0 ) {
	while($row = $query->fetch(PDO::FETCH_ASSOC)) {
		$buffer[] = $row;
	}
};

header("Content-Type: application/json");
echo json_encode($buffer);
exit();
?>
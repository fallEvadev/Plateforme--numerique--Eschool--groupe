<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
// Update these creds for your actual environment if needed
$host = 'localhost';
$db   = 'eschool_db';
$user = 'root';
$pass = ''; // Default easyphp/xampp usually has empty password, WAMP is empty or root
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

if (!isset($_GET['code']) || strlen($_GET['code']) !== 6) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid code format']);
    exit;
}

$code = $_GET['code'];

try {
    // Validate the secure access code against our schemas
    $stmt = $pdo->prepare("
        SELECT u.full_name as formateur_name, s.name as school_name 
        FROM session_codes sc
        JOIN users u ON sc.teacher_id = u.id
        JOIN schools s ON sc.school_id = s.id
        WHERE sc.access_code = ? AND sc.is_used = 0 AND sc.expires_at > NOW() AND u.is_active = 1
        LIMIT 1
    ");
    $stmt->execute([$code]);
    $sessionData = $stmt->fetch();

    if ($sessionData) {
        
        // Uncomment the lines below if you want the code to be strictly single-use
        // $updateStmt = $pdo->prepare("UPDATE session_codes SET is_used = 1 WHERE access_code = ?");
        // $updateStmt->execute([$code]);

        echo json_encode([
            'valid' => true,
            'formateurName' => $sessionData['formateur_name'],
            'schoolName' => $sessionData['school_name']
        ]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Code invalide ou expiré']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error']);
}
?>

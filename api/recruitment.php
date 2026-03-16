<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
// Important: For file uploads, don't strictly enforce Content-Type as application/json
// because the browser uses multipart/form-data for FormData.
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Connection
$host = 'localhost';
$db   = 'eschool_db';
$user = 'root';
$pass = ''; // Set your local DB password if different
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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';

if (empty($name) || empty($email) || empty($subject)) {
    http_response_code(400);
    echo json_encode(['error' => 'Champs obligatoires manquants (nom, email, specialite)']);
    exit;
}

// The uploads directory needs to exist
$uploadDir = __DIR__ . '/uploads/candidatures/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Handle file upload
function uploadFile($fileKey, $dir) {
    if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
        $fileInfo = pathinfo($_FILES[$fileKey]['name']);
        
        // Remove special chars, use epoch time for uniqueness
        $safeName = preg_replace("/[^a-zA-Z0-9]/", "_", $fileInfo['filename']);
        $ext = strtolower($fileInfo['extension']);
        $newFilename = $safeName . '_' . time() . '_' . uniqid() . '.' . $ext;
        
        $destPath = $dir . $newFilename;
        if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $destPath)) {
            return $newFilename;
        }
    }
    return null;
}

$cvFile = uploadFile('cv', $uploadDir);
$cniFile = uploadFile('cni', $uploadDir);
$photoFile = uploadFile('photo', $uploadDir);

/* 
 * NOTE DE DEPLOIEMENT: 
 * Vous devrez probablement créer une table `applications` dans MySQL.
 * 
 * CREATE TABLE `applications` (
 *   `id` INT AUTO_INCREMENT PRIMARY KEY,
 *   `name` VARCHAR(150),
 *   `email` VARCHAR(100),
 *   `subject` VARCHAR(100),
 *   `cv_file` VARCHAR(255),
 *   `cni_file` VARCHAR(255),
 *   `photo_file` VARCHAR(255),
 *   `status` ENUM('en_attente', 'accepte', 'rejete') DEFAULT 'en_attente',
 *   `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 */

try {
    // Example insertion if the table above is created.
    // Commented out to prevent errors if you haven't created the table yet.
    /*
    $stmt = $pdo->prepare("
        INSERT INTO applications (name, email, subject, cv_file, cni_file, photo_file)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$name, $email, $subject, $cvFile, $cniFile, $photoFile]);
    */
    
    echo json_encode([
        'success' => true, 
        'message' => 'Candidature reçue. Fichiers enregistrés.',
        'saved_files' => [
            'cv' => $cvFile,
            'cni' => $cniFile,
            'photo' => $photoFile
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la sauvegarde BDD']);
}
?>

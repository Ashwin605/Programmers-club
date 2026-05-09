<?php
// includes/db.php
session_start();

$db_file = __DIR__ . '/../database.sqlite';

try {
    $pdo = new PDO('sqlite:' . $db_file);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Initialize Database Tables with advanced fields
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        avatar TEXT DEFAULT 'default.png',
        is_admin INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        event_date DATETIME NOT NULL,
        max_capacity INTEGER DEFAULT 100,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        event_id INTEGER,
        registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
    )");

    // Enable Foreign Keys in SQLite
    $pdo->exec("PRAGMA foreign_keys = ON;");

    // --- SCHEMA UPGRADE (For existing databases) ---
    try { $pdo->exec("ALTER TABLE users ADD COLUMN avatar TEXT DEFAULT 'default.png'"); } catch (Exception $e) {}
    try { $pdo->exec("ALTER TABLE users ADD COLUMN is_admin INTEGER DEFAULT 0"); } catch (Exception $e) {}
    try { $pdo->exec("ALTER TABLE events ADD COLUMN max_capacity INTEGER DEFAULT 100"); } catch (Exception $e) {}

    // Removed dummy seed data logic

} catch (PDOException $e) {
    die("Database Connection failed: " . $e->getMessage());
}

// --- ADVANCED HELPER FUNCTIONS ---

// CSRF Protection
function generate_csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verify_csrf_token($token) {
    if (empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
        die("CSRF Token Validation Failed.");
    }
}

// Flash Messages
function set_flash_message($type, $message) {
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

function display_flash_message() {
    if (isset($_SESSION['flash'])) {
        $type = $_SESSION['flash']['type'] === 'error' ? '#ef4444' : '#10b981';
        $bg = $_SESSION['flash']['type'] === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)';
        $msg = htmlspecialchars($_SESSION['flash']['message']);
        
        echo "<div class='flash-message animate-fade-in' style='background: $bg; border: 1px solid $type; color: $type; padding: 1rem 2rem; border-radius: 8px; margin: 1rem auto; max-width: 600px; text-align: center;'>
                $msg
              </div>";
              
        unset($_SESSION['flash']);
    }
}

// Authentication check
function require_login() {
    if (!isset($_SESSION['user_id'])) {
        set_flash_message('error', 'You must be logged in to access this page.');
        header("Location: login.php");
        exit;
    }
}

function require_admin($pdo) {
    require_login();
    $stmt = $pdo->prepare("SELECT is_admin FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    if ($stmt->fetchColumn() != 1) {
        set_flash_message('error', 'Access denied. Admins only.');
        header("Location: dashboard.php");
        exit;
    }
}
?>

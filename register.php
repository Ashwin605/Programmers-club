<?php 
include 'includes/db.php';

if (isset($_SESSION['user_id'])) {
    header("Location: dashboard.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf_token($_POST['csrf_token'] ?? '');

    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    
    if ($name && $email && $password) {
        if (strlen($password) < 6) {
            set_flash_message('error', "Password must be at least 6 characters.");
        } else {
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                set_flash_message('error', "Email is already registered.");
            } else {
                $hashed = password_hash($password, PASSWORD_DEFAULT);
                $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
                if ($stmt->execute([$name, $email, $hashed])) {
                    $_SESSION['user_id'] = $pdo->lastInsertId();
                    $_SESSION['user_name'] = $name;
                    $_SESSION['is_admin'] = 0;
                    
                    set_flash_message('success', "Account created successfully!");
                    header("Location: dashboard.php");
                    exit;
                } else {
                    set_flash_message('error', "Registration failed. Please try again.");
                }
            }
        }
    } else {
        set_flash_message('error', "Please fill in all fields.");
    }
}

include 'includes/header.php'; 
?>

<!-- Page Banner -->
<div class="page-banner" style="padding: 2rem 0;">
    <h1>Join the <span style="color: var(--gold-light);">Club</span></h1>
</div>

<section class="section" style="min-height: 60vh; display: flex; align-items: center;">
    <div class="container" style="display: flex; justify-content: center;">
        <div class="card auth-container animate-fade-in" style="width: 100%;">
            <div class="card-header-bar"></div>
            <div class="card-body" style="padding: 2.5rem;">
                <h2 style="margin-bottom: 1.5rem; font-size: 1.5rem; color: var(--navy); font-family: 'Roboto', sans-serif;">Create Account</h2>
                
                <form method="POST" action="register.php">
                    <input type="hidden" name="csrf_token" value="<?php echo generate_csrf_token(); ?>">
                    
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" name="name" class="form-control" required placeholder="" value="<?php echo htmlspecialchars($_POST['name'] ?? ''); ?>">
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" class="form-control" required placeholder="" value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" class="form-control" required placeholder="••••••••" minlength="6">
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">Create Account</button>
                </form>
                
                <p style="margin-top: 1.2rem; color: var(--gray); font-size: 0.9rem;">
                    Already have an account? <a href="login.php" style="color: var(--navy); font-weight: 700;">Sign In</a>
                </p>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>

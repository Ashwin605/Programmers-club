<?php 
include 'includes/db.php';

if (isset($_SESSION['user_id'])) {
    header("Location: dashboard.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf_token($_POST['csrf_token'] ?? '');

    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    
    if ($email && $password) {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['is_admin'] = $user['is_admin'];
            
            set_flash_message('success', "Welcome back, " . htmlspecialchars($user['name']) . "!");
            header("Location: dashboard.php");
            exit;
        } else {
            set_flash_message('error', "Invalid email or password.");
        }
    } else {
        set_flash_message('error', "Please fill in all fields.");
    }
}

include 'includes/header.php'; 
?>

<!-- Page Banner -->
<div class="page-banner" style="padding: 2rem 0;">
    <h1>Member <span style="color: var(--gold-light);">Login</span></h1>
</div>

<section class="section" style="min-height: 60vh; display: flex; align-items: center;">
    <div class="container" style="display: flex; justify-content: center;">
        <div class="card auth-container animate-fade-in" style="width: 100%;">
            <div class="card-header-bar"></div>
            <div class="card-body" style="padding: 2.5rem;">
                <h2 style="margin-bottom: 1.5rem; font-size: 1.5rem; color: var(--navy); font-family: 'Roboto', sans-serif;">Welcome Back</h2>
                
                <form method="POST" action="login.php">
                    <input type="hidden" name="csrf_token" value="<?php echo generate_csrf_token(); ?>">
                    
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" class="form-control" required placeholder="" value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" class="form-control" required placeholder="••••••••">
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">Sign In</button>
                </form>
                
                <p style="margin-top: 1.2rem; color: var(--gray); font-size: 0.9rem;">
                    Don't have an account? <a href="register.php" style="color: var(--navy); font-weight: 700;">Register</a>
                </p>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>

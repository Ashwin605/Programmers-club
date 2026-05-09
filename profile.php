<?php
include 'includes/db.php';
require_login();

// Fetch current user details
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf_token($_POST['csrf_token'] ?? '');
    
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    
    if ($name && $email) {
        // Handle avatar upload
        $avatarPath = $user['avatar'];
        if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
            $tmp_name = $_FILES['avatar']['tmp_name'];
            $file_ext = strtolower(pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION));
            if (in_array($file_ext, ['jpg', 'jpeg', 'png', 'gif'])) {
                $upload_dir = 'uploads/';
                if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);
                
                $new_name = uniqid() . '.' . $file_ext;
                if (move_uploaded_file($tmp_name, $upload_dir . $new_name)) {
                    $avatarPath = $upload_dir . $new_name;
                }
            } else {
                set_flash_message('error', 'Invalid image format. Use JPG or PNG.');
            }
        }
        
        try {
            $stmt = $pdo->prepare("UPDATE users SET name = ?, email = ?, avatar = ? WHERE id = ?");
            $stmt->execute([$name, $email, $avatarPath, $_SESSION['user_id']]);
            $_SESSION['user_name'] = $name;
            set_flash_message('success', 'Profile updated successfully.');
            
            // Refresh data
            $user['name'] = $name;
            $user['email'] = $email;
            $user['avatar'] = $avatarPath;
            
        } catch(PDOException $e) {
            set_flash_message('error', 'Update failed. Email might already exist.');
        }
    } else {
        set_flash_message('error', 'Name and email are required.');
    }
    
    header("Location: profile.php");
    exit;
}

include 'includes/header.php';
?>

<!-- Page Banner -->
<div class="page-banner" style="padding: 2rem 0;">
    <h1>My <span style="color: var(--gold-light);">Profile</span></h1>
</div>

<section class="section" style="min-height: 60vh;">
    <div class="container" style="display: flex; justify-content: center;">
        <div class="card auth-container animate-fade-in" style="max-width: 480px; width: 100%;">
            <div class="card-header-bar"></div>
            <div class="card-body" style="padding: 2.5rem;">
                <h2 style="margin-bottom: 1.5rem; font-size: 1.5rem; color: var(--navy); font-family: 'Roboto', sans-serif;">Profile Settings</h2>
                
                <form method="POST" action="profile.php" enctype="multipart/form-data">
                    <input type="hidden" name="csrf_token" value="<?php echo generate_csrf_token(); ?>">
                    
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <div style="width: 90px; height: 90px; border-radius: 50%; background: var(--sky-pale); margin: 0 auto 0.8rem; overflow: hidden; border: 3px solid var(--gold);">
                            <?php if($user['avatar'] !== 'default.png' && file_exists($user['avatar'])): ?>
                                <img src="<?php echo htmlspecialchars($user['avatar']); ?>" style="width:100%; height:100%; object-fit:cover;">
                            <?php else: ?>
                                <div style="display:flex; align-items:center; justify-content:center; width:100%; height:100%; font-size: 2.2rem; color: var(--navy);">
                                    👤
                                </div>
                            <?php endif; ?>
                        </div>
                        <label for="avatar" style="cursor: pointer; color: var(--navy); font-size: 0.85rem; font-weight: 600;">Change Avatar</label>
                        <input type="file" id="avatar" name="avatar" accept="image/*" style="display: none;">
                    </div>
                    
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" class="form-control" required value="<?php echo htmlspecialchars($user['name']); ?>">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label>Email Address</label>
                        <input type="email" name="email" class="form-control" required value="<?php echo htmlspecialchars($user['email']); ?>">
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">Save Changes</button>
                </form>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>

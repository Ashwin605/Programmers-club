<?php
// includes/header.php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Programmers Club | VEMU Institute of Technology</title>
    <meta name="description" content="Official Programmers Club of Vemu Institute of Technology. Join us for workshops, hackathons, coding competitions, and collaborative projects.">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Top Bar -->
    <div class="top-bar">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
            <span>📞 +91 9573414287 &nbsp;|&nbsp; ✉ programmersclub2026@gmail.com</span>
            <span><a href="https://vemu.org" target="_blank">VEMU Institute of Technology</a> — Autonomous Institution</span>
        </div>
    </div>

    <!-- Main Navbar -->
    <nav class="navbar">
        <a href="index.php" class="navbar-brand">
            <div class="brand-icon">PC</div>
            <div class="brand-text">
                Programmers Club
                <small>VEMU Institute of Technology</small>
            </div>
        </a>
        <div class="nav-links">
            <?php $current_page = basename($_SERVER['PHP_SELF']); ?>
            <a href="index.php" class="nav-link <?php echo ($current_page == 'index.php') ? 'active' : ''; ?>">Home</a>
            <a href="about.php" class="nav-link <?php echo ($current_page == 'about.php') ? 'active' : ''; ?>">About</a>
            <a href="events.php" class="nav-link <?php echo ($current_page == 'events.php') ? 'active' : ''; ?>">Events</a>
            <a href="contact.php" class="nav-link <?php echo ($current_page == 'contact.php') ? 'active' : ''; ?>">Contact</a>
            <?php if (isset($_SESSION['user_id'])): ?>
                <?php if (isset($_SESSION['is_admin']) && $_SESSION['is_admin'] == 1): ?>
                    <a href="admin.php" class="nav-link <?php echo ($current_page == 'admin.php') ? 'active' : ''; ?>" style="<?php echo ($current_page != 'admin.php') ? 'color: var(--gold-light);' : ''; ?>">Admin Panel</a>
                <?php endif; ?>
                <a href="profile.php" class="nav-link <?php echo ($current_page == 'profile.php') ? 'active' : ''; ?>">Profile</a>
                <a href="dashboard.php" class="nav-link <?php echo ($current_page == 'dashboard.php') ? 'active' : ''; ?>">Dashboard</a>
                <a href="logout.php" class="btn btn-logout">Logout</a>
            <?php else: ?>
                <a href="register.php" class="btn btn-join">Join Now</a>
            <?php endif; ?>
        </div>
    </nav>

    <!-- Flash Messages -->
    <div style="position: relative; z-index: 50; padding-top: 0.5rem;">
        <?php 
        if(function_exists('display_flash_message')) {
            display_flash_message(); 
        }
        ?>
    </div>

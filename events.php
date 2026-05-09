<?php 
include 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register_event_id'])) {
    require_login();
    verify_csrf_token($_POST['csrf_token'] ?? '');
    
    $event_id = $_POST['register_event_id'];
    $user_id = $_SESSION['user_id'];
    
    $stmt = $pdo->prepare("SELECT id FROM registrations WHERE user_id = ? AND event_id = ?");
    $stmt->execute([$user_id, $event_id]);
    
    if ($stmt->fetch()) {
        set_flash_message('error', 'You are already registered for this event!');
    } else {
        $stmt = $pdo->prepare("SELECT max_capacity FROM events WHERE id = ?");
        $stmt->execute([$event_id]);
        $capacity = $stmt->fetchColumn();
        
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM registrations WHERE event_id = ?");
        $stmt->execute([$event_id]);
        $current_registrations = $stmt->fetchColumn();
        
        if ($current_registrations >= $capacity) {
            set_flash_message('error', 'Sorry, this event is fully booked.');
        } else {
            $stmt = $pdo->prepare("INSERT INTO registrations (user_id, event_id) VALUES (?, ?)");
            if ($stmt->execute([$user_id, $event_id])) {
                set_flash_message('success', 'Successfully registered for the event!');
            } else {
                set_flash_message('error', 'Failed to register. Please try again.');
            }
        }
    }
    
    header("Location: events.php");
    exit;
}

$stmt = $pdo->query("SELECT * FROM events ORDER BY event_date ASC");
$events = $stmt->fetchAll();

include 'includes/header.php'; 
?>

<!-- Page Banner -->
<div class="page-banner">
    <h1>Upcoming <span style="color: var(--gold-light);">Events</span></h1>
    <p>Discover and register for the latest hackathons, workshops, and coding challenges.</p>
    <div class="gold-bar"></div>
</div>

<section class="section">
    <div class="container">
        <div class="features-grid" style="padding: 0;">
            <?php foreach($events as $event): ?>
                <?php
                $stmt = $pdo->prepare("SELECT COUNT(*) FROM registrations WHERE event_id = ?");
                $stmt->execute([$event['id']]);
                $spots_taken = $stmt->fetchColumn();
                $spots_left = max(0, $event['max_capacity'] - $spots_taken);
                ?>
                <div class="card animate-fade-in">
                    <div class="card-header-bar"></div>
                    <div class="card-body" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="background: var(--sky-pale); padding: 0.4rem 0.8rem; border-radius: 4px;">
                                <span style="color: var(--navy); font-weight: 700; font-size: 0.85rem;"><?php echo date('M d, Y', strtotime($event['event_date'])); ?></span>
                            </div>
                            <span style="color: <?php echo $spots_left > 0 ? 'var(--success)' : 'var(--danger)'; ?>; font-size: 0.85rem; font-weight: 700;">
                                <?php echo $spots_left > 0 ? "$spots_left spots left" : "Sold Out"; ?>
                            </span>
                        </div>
                        
                        <h3 style="font-size: 1.2rem; color: var(--navy); font-weight: 700;"><?php echo htmlspecialchars($event['title']); ?></h3>
                        <p style="color: var(--text-body); flex-grow: 1; font-size: 0.92rem;"><?php echo htmlspecialchars($event['description']); ?></p>
                        
                        <div style="padding-top: 1rem; border-top: 1px solid var(--border);">
                            <?php if (isset($_SESSION['user_id'])): ?>
                                <?php if ($spots_left > 0): ?>
                                    <form method="POST" action="events.php">
                                        <input type="hidden" name="csrf_token" value="<?php echo generate_csrf_token(); ?>">
                                        <input type="hidden" name="register_event_id" value="<?php echo $event['id']; ?>">
                                        <button type="submit" class="btn btn-primary" style="width: 100%;">Register Now</button>
                                    </form>
                                <?php else: ?>
                                    <button class="btn btn-outline" disabled style="width: 100%; opacity: 0.5; cursor: not-allowed;">Fully Booked</button>
                                <?php endif; ?>
                            <?php else: ?>
                                <a href="login.php" class="btn btn-navy" style="width: 100%; display: block; text-align: center;">Login to Register</a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>

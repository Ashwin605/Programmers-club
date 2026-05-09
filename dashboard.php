<?php 
include 'includes/db.php';

if(!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user_id'];

// Get user's registered events count
$stmt = $pdo->prepare("SELECT COUNT(*) FROM registrations WHERE user_id = ?");
$stmt->execute([$user_id]);
$eventCount = $stmt->fetchColumn();

// Get the actual registered events
$stmt = $pdo->prepare("
    SELECT e.title, e.event_date, r.registered_at 
    FROM events e 
    JOIN registrations r ON e.id = r.event_id 
    WHERE r.user_id = ?
    ORDER BY e.event_date DESC
");
$stmt->execute([$user_id]);
$myEvents = $stmt->fetchAll();

include 'includes/header.php'; 
?>

<!-- Page Banner -->
<div class="page-banner">
    <h1>Welcome, <span style="color: var(--gold-light);"><?php echo htmlspecialchars($_SESSION['user_name']); ?>!</span></h1>
    <p>Your personal dashboard — manage events, profile, and club resources.</p>
    <div class="gold-bar"></div>
</div>

<section class="section">
    <div class="container animate-fade-in">
        
        <!-- Stats Grid -->
        <div class="stats-grid" style="margin-bottom: 2.5rem;">
            <div class="stat-card">
                <div class="stat-number"><?php echo $eventCount; ?></div>
                <div class="stat-label">Events Registered</div>
            </div>
            <div class="stat-card" style="border-left-color: var(--sky-blue);">
                <div class="stat-number" style="color: var(--sky-blue);">1</div>
                <div class="stat-label">Active Certificates</div>
            </div>
            <div class="stat-card" style="border-left-color: var(--success);">
                <div class="stat-number" style="color: var(--success);">Active</div>
                <div class="stat-label">Account Status</div>
            </div>
        </div>

        <!-- Registered Events Table -->
        <div class="card">
            <div class="card-header-bar"></div>
            <div class="card-body">
                <h2 class="section-title" style="font-size: 1.3rem; margin-bottom: 1.2rem;">My Registered Events</h2>
                
                <?php if (count($myEvents) > 0): ?>
                    <div style="overflow-x: auto;">
                        <table class="vemu-table">
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Event Date</th>
                                    <th>Registered On</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($myEvents as $event): ?>
                                    <tr>
                                        <td style="font-weight: 600; color: var(--navy);"><?php echo htmlspecialchars($event['title']); ?></td>
                                        <td><?php echo date('M d, Y g:i A', strtotime($event['event_date'])); ?></td>
                                        <td><?php echo date('M d, Y', strtotime($event['registered_at'])); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else: ?>
                    <div style="padding: 2rem; text-align: center; background: var(--off-white); border-radius: 6px;">
                        <p style="color: var(--gray); margin-bottom: 1rem;">You haven't registered for any events yet.</p>
                        <a href="events.php" class="btn btn-primary">Browse Events</a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        
    </div>
</section>

<?php include 'includes/footer.php'; ?>

<?php
include 'includes/db.php';
require_admin($pdo);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf_token($_POST['csrf_token'] ?? '');

    if (isset($_POST['add_event'])) {
        $title = trim($_POST['title']);
        $desc = trim($_POST['description']);
        $date = trim($_POST['event_date']);
        $cap = (int)$_POST['capacity'];
        
        if ($title && $desc && $date && $cap > 0) {
            $stmt = $pdo->prepare("INSERT INTO events (title, description, event_date, max_capacity) VALUES (?, ?, ?, ?)");
            $stmt->execute([$title, $desc, $date, $cap]);
            set_flash_message('success', 'Event added successfully.');
        } else {
            set_flash_message('error', 'All fields are required.');
        }
    } elseif (isset($_POST['delete_event_id'])) {
        $id = (int)$_POST['delete_event_id'];
        $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
        $stmt->execute([$id]);
        set_flash_message('success', 'Event deleted.');
    }
    
    header("Location: admin.php");
    exit;
}

$events = $pdo->query("SELECT * FROM events ORDER BY event_date DESC")->fetchAll();
include 'includes/header.php';
?>

<!-- Page Banner -->
<div class="page-banner" style="background: linear-gradient(135deg, #7c1d1d 0%, #991b1b 100%);">
    <h1>Admin <span style="color: var(--gold-light);">Dashboard</span></h1>
    <p>Manage events, users, and club settings.</p>
    <div class="gold-bar"></div>
</div>

<section class="section">
    <div class="container animate-fade-in">
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
            
            <!-- Add Event Form -->
            <div class="card" style="align-self: start;">
                <div class="card-header-bar" style="background: linear-gradient(to right, #991b1b, var(--gold));"></div>
                <div class="card-body" style="padding: 1.5rem;">
                    <h2 style="font-size: 1.2rem; color: var(--navy); margin-bottom: 1.2rem; font-family: 'Inter', sans-serif;">Add New Event</h2>
                    <form method="POST" action="admin.php">
                        <input type="hidden" name="csrf_token" value="<?php echo generate_csrf_token(); ?>">
                        <input type="hidden" name="add_event" value="1">
                        
                        <div class="form-group">
                            <label>Event Title</label>
                            <input type="text" name="title" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea name="description" class="form-control" rows="4" required style="resize: vertical;"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Date & Time</label>
                            <input type="datetime-local" name="event_date" class="form-control" required>
                        </div>
                        <div class="form-group" style="margin-bottom: 1.5rem;">
                            <label>Max Capacity</label>
                            <input type="number" name="capacity" class="form-control" value="100" min="1" required>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Create Event</button>
                    </form>
                </div>
            </div>
            
            <!-- List Events -->
            <div class="card" style="align-self: start;">
                <div class="card-header-bar" style="background: linear-gradient(to right, var(--navy), var(--sky-blue));"></div>
                <div class="card-body" style="padding: 1.5rem;">
                    <h2 style="font-size: 1.2rem; color: var(--navy); margin-bottom: 1.2rem; font-family: 'Inter', sans-serif;">Manage Events</h2>
                    <div style="overflow-x: auto;">
                        <table class="vemu-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Capacity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach($events as $e): ?>
                                <tr>
                                    <td style="font-weight: 600;"><?php echo htmlspecialchars($e['title']); ?></td>
                                    <td><?php echo date('M d, Y', strtotime($e['event_date'])); ?></td>
                                    <td><?php echo htmlspecialchars($e['max_capacity']); ?></td>
                                    <td>
                                        <form method="POST" action="admin.php" onsubmit="return confirm('Are you sure?');">
                                            <input type="hidden" name="csrf_token" value="<?php echo generate_csrf_token(); ?>">
                                            <input type="hidden" name="delete_event_id" value="<?php echo $e['id']; ?>">
                                            <button type="submit" class="btn" style="padding: 0.3rem 0.7rem; background: var(--danger); color: white; font-size: 0.8rem;">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>

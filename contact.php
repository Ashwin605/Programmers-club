<?php 
include 'includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf_token($_POST['csrf_token'] ?? '');
    
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');
    
    if ($name && $email && $message) {
        set_flash_message('success', 'Thank you for your message! We will get back to you soon.');
        header("Location: contact.php");
        exit;
    } else {
        set_flash_message('error', 'Please fill in all required fields.');
    }
}

include 'includes/header.php'; 
?>

<!-- Page Banner -->
<div class="page-banner">
    <h1>Contact <span style="color: var(--gold-light);">Us</span></h1>
    <p>Have questions? Send us a message and we'll respond as soon as possible.</p>
    <div class="gold-bar"></div>
</div>

<section class="section">
    <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 2.5rem; max-width: 1000px; margin: 0 auto; align-items: start;">
            
            <!-- Left: Contact Info -->
            <div class="contact-info-card animate-fade-in">
                <h3 style="font-size: 1.3rem;">Get in Touch</h3>
                
                <div class="contact-info-item">
                    <div class="icon-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                        <h4>Location</h4>
                        <p>Vemu Institute of Technology,<br>P.Kothakota, Chittoor,<br>Andhra Pradesh - 517112</p>
                    </div>
                </div>

                <div class="contact-info-item">
                    <div class="icon-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>programmersclub2026@gmail.com</p>
                    </div>
                </div>

                <div class="contact-info-item" style="margin-bottom: 0;">
                    <div class="icon-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <div>
                        <h4>Phone</h4>
                        <p>+91 9573414287<br>9989723713</p>
                    </div>
                </div>
            </div>

            <!-- Right: Contact Form -->
            <div class="card animate-fade-in delay-1">
                <div class="card-header-bar"></div>
                <div class="card-body" style="padding: 2rem;">
                    <form method="POST" action="contact.php">
                        <input type="hidden" name="csrf_token" value="<?php echo generate_csrf_token(); ?>">
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="form-group">
                                <label>Your Name</label>
                                <input type="text" name="name" class="form-control" required placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" class="form-control" required placeholder="">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Subject (Optional)</label>
                            <input type="text" name="subject" class="form-control" placeholder="How can we help you?">
                        </div>
                        
                        <div class="form-group" style="margin-bottom: 1.5rem;">
                            <label>Message</label>
                            <textarea name="message" class="form-control" rows="5" required placeholder="Write your message here..." style="resize: vertical;"></textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem; font-size: 1rem;">Send Message</button>
                    </form>
                </div>
            </div>
            
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>

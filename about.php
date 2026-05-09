<?php 
include 'includes/db.php';
include 'includes/header.php'; 
?>

<!-- Page Banner -->
<div class="page-banner">
    <h1>About <span style="color: var(--gold-light);">ProgClub</span></h1>
    <p>More than just a club — we are a community of creators, dreamers, and builders.</p>
    <div class="gold-bar"></div>
</div>

<!-- Our Mission -->
<section class="section">
    <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
            
            <!-- Left: Image -->
            <div class="animate-fade-in">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team collaborating" style="width: 100%; border-radius: 8px; box-shadow: var(--shadow-lg);">
            </div>
            
            <!-- Right: Text -->
            <div class="animate-fade-in delay-1">
                <h2 class="section-title">Our Mission</h2>
                <p style="color: var(--text-body); font-size: 1rem; line-height: 1.8; margin-top: 1rem; margin-bottom: 1rem;">
                    At ProgClub, our mission is to foster a culture of technical excellence and
                    collaborative learning. We believe that the best way to learn is by doing,
                    which is why we focus heavily on hackathons, interactive workshops, and
                    open-source projects.
                </p>
                <p style="color: var(--text-body); font-size: 1rem; line-height: 1.8;">
                    Whether you are a beginner writing your first line of code or an expert
                    system architect, there is a place for you here. We support each other's
                    growth and celebrate every milestone.
                </p>
            </div>
            
        </div>
    </div>
</section>

<!-- Meet the Team -->
<section class="section section-light">
    <div class="container">
        <div style="text-align: center; margin-bottom: 2.5rem;">
            <h2 class="section-title center">Meet the Team</h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem;">
            
            <?php
            $team = [
                ['name' => 'Reddyvari Jahnavi', 'role' => 'President', 'initials' => 'RJ', 'bg' => '#d6eaf8', 'color' => '#1a3a6b', 'linkedin' => 'https://www.linkedin.com/in/reddyvari-jahnavi'],
                ['name' => 'Abburi Yoshitha', 'role' => 'Convener', 'initials' => 'AY', 'bg' => '#fef3c7', 'color' => '#92400e', 'linkedin' => 'https://www.linkedin.com/in/yoshitha-abburi-t6'],
                ['name' => 'Shaik Baaji', 'role' => 'Co Convener', 'initials' => 'SB', 'bg' => '#e0e7ff', 'color' => '#3730a3', 'linkedin' => 'https://www.linkedin.com/in/shaik-baaji-b4bb65363/'],
                ['name' => 'G Bhanu Prasad Reddy', 'role' => 'Member', 'initials' => 'GR', 'bg' => '#1a3a6b', 'color' => '#fff', 'linkedin' => 'https://www.linkedin.com/in/gurram-bhanu-prasad-reddy67/'],
                ['name' => 'A Uday Varma', 'role' => 'Member', 'initials' => 'AV', 'bg' => '#dcfce7', 'color' => '#166534', 'linkedin' => 'https://www.linkedin.com/in/uday-varma-arkad-b3183338a/'],
                ['name' => 'K Leela Vinayak', 'role' => 'Member', 'initials' => 'KV', 'bg' => '#dbeafe', 'color' => '#1e40af', 'linkedin' => 'https://www.linkedin.com/in/leelavinayak'],
                ['name' => 'C Ashwin', 'role' => 'Member', 'initials' => 'CA', 'bg' => '#f0a500', 'color' => '#0f2447', 'linkedin' => 'https://www.linkedin.com/in/ashwin-deve/'],
                ['name' => 'Arif Shaik', 'role' => 'Member', 'initials' => 'AS', 'bg' => '#d6eaf8', 'color' => '#1a3a6b', 'linkedin' => 'https://www.linkedin.com/in/arif-roshan-a2184b403?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'],
            ];

            foreach($team as $member):
            ?>
            <div class="card team-card">
                <div class="card-header-bar"></div>
                <div class="card-body">
                    <div class="avatar" style="background: <?php echo $member['bg']; ?>; color: <?php echo $member['color']; ?>;">
                        <?php echo $member['initials']; ?>
                    </div>
                    
                    <h3><?php echo htmlspecialchars($member['name']); ?></h3>
                    <p class="role"><?php echo htmlspecialchars($member['role']); ?></p>
                    
                    <div class="social-links">
                        <a href="<?php echo htmlspecialchars($member['linkedin']); ?>" target="_blank" title="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
            
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>

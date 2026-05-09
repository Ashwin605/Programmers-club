<?php include 'includes/header.php'; ?>

<!-- Updates Marquee -->
<div class="updates-bar">
    <div class="label">UPDATES</div>
    <div class="marquee">
        <span>🚀 Welcome to the Programmers Club — VEMU Institute of Technology &nbsp;&nbsp;|&nbsp;&nbsp; 📢 New workshops every month &nbsp;&nbsp;|&nbsp;&nbsp; 🏆 Register now for upcoming hackathons &nbsp;&nbsp;|&nbsp;&nbsp; 💻 Open-source contributions welcome!</span>
    </div>
</div>

<!-- Hero Section -->
<section class="hero">
    <div class="container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
        
        <!-- Left Column: Content -->
        <div class="animate-fade-in">
            <p style="color: var(--gold-light); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.8rem; position: relative; z-index: 1;">VEMU Institute of Technology</p>
            <h1>
                Programmers <span class="highlight">Club</span>
            </h1>
            <h2 style="font-size: 1.5rem; font-weight: 400; color: rgba(255,255,255,0.85); margin-bottom: 1.5rem; position: relative; z-index: 1;">
                Code the Future. <span style="color: var(--gold-light); font-weight: 700;">Build the World.</span>
            </h2>
            
            <p>
                A community for passionate developers, designers & innovators.
                Workshops | Hackathons | Real-World Projects
            </p>

            <div class="hero-actions">
                <a href="register.php" class="btn btn-primary" style="padding: 0.8rem 2rem;">Become a Member →</a>
                <a href="events.php" class="btn btn-white" style="padding: 0.8rem 2rem;">Explore Events</a>
            </div>
        </div>

        <!-- Right Column: Code Editor Window -->
        <div class="code-window animate-fade-in delay-1" style="position: relative; z-index: 1;">
            <!-- Editor Header -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.8rem 1rem; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.08);">
                <div style="display: flex; gap: 0.5rem;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56;"></div>
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e;"></div>
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f;"></div>
                </div>
                <div style="color: #94a3b8; font-size: 0.8rem; font-family: monospace;">future.js</div>
            </div>
            
            <!-- Editor Body -->
            <div style="padding: 1.2rem; font-family: 'Fira Code', Consolas, Monaco, monospace; font-size: 0.9rem; line-height: 1.8; color: #a6accd;">
                <div style="display: flex;"><span style="color: #5c6370; width: 2rem; user-select: none;">1</span><span><span style="color: #c678dd;">const</span> <span style="color: #61afef;">createFuture</span> <span style="color: #56b6c2;">=</span> <span style="color: #c678dd;">async</span> () <span style="color: #56b6c2;">=></span> {</span></div>
                <div style="display: flex;"><span style="color: #5c6370; width: 2rem; user-select: none;">2</span><span>&nbsp;&nbsp;<span style="color: #c678dd;">const</span> dream <span style="color: #56b6c2;">=</span> <span style="color: #c678dd;">new</span> <span style="color: #e5c07b;">Dream</span>();</span></div>
                <div style="display: flex;"><span style="color: #5c6370; width: 2rem; user-select: none;">3</span><span>&nbsp;&nbsp;<span style="color: #c678dd;">await</span> dream.<span style="color: #61afef;">compile</span>();</span></div>
                <div style="display: flex;"><span style="color: #5c6370; width: 2rem; user-select: none;">4</span><span>&nbsp;&nbsp;<span style="color: #c678dd;">return</span> dream.<span style="color: #61afef;">launch</span>();</span></div>
                <div style="display: flex;"><span style="color: #5c6370; width: 2rem; user-select: none;">5</span><span>};</span></div>
                <div style="display: flex;"><span style="color: #5c6370; width: 2rem; user-select: none;">6</span><span></span></div>
                <div style="display: flex;"><span style="color: #5c6370; width: 2rem; user-select: none;">7</span><span><span style="color: #5c6370; font-style: italic;">// Initialize ProgClub</span></span></div>
                <div style="display: flex;"><span style="color: #5c6370; width: 2rem; user-select: none;">8</span><span><span style="color: #61afef;">createFuture</span>();</span></div>
            </div>
        </div>

    </div>
</section>

<!-- Features Section -->
<section class="section section-light">
    <div class="container">
        <div style="text-align: center; margin-bottom: 2.5rem;">
            <h2 class="section-title center">Why Join Us?</h2>
            <p class="section-subtitle center" style="margin-top: 0.8rem;">
                We provide the resources, mentorship, and community you need to accelerate your coding journey.
            </p>
        </div>

        <div class="features-grid">
            <div class="card feature-card">
                <div class="card-header-bar"></div>
                <div class="card-body">
                    <div class="feature-icon">💻</div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--navy); margin: 0.8rem 0 0.5rem;">Workshops & Bootcamps</h3>
                    <p style="color: var(--text-body); font-size: 0.92rem;">Hands-on sessions on Web Dev, AI/ML, Cloud Computing, and more led by industry experts.</p>
                </div>
            </div>
            
            <div class="card feature-card">
                <div class="card-header-bar"></div>
                <div class="card-body">
                    <div class="feature-icon">👥</div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--navy); margin: 0.8rem 0 0.5rem;">Vibrant Community</h3>
                    <p style="color: var(--text-body); font-size: 0.92rem;">Connect with like-minded peers, collaborate on projects, and grow your network.</p>
                </div>
            </div>
            
            <div class="card feature-card">
                <div class="card-header-bar"></div>
                <div class="card-body">
                    <div class="feature-icon">🚀</div>
                    <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--navy); margin: 0.8rem 0 0.5rem;">Hackathons</h3>
                    <p style="color: var(--text-body); font-size: 0.92rem;">Participate in 24-48 hour coding marathons, win prizes, and showcase your skills.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>

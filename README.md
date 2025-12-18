<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ahmed Irfan | Cyber Card v2.0</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --cyber-blue: #00f2ff;
            --cyber-blue-dim: rgba(0, 242, 255, 0.2);
            --cyber-red: #ff0055;
            --bg-dark: #020204;
        }

        body {
            background-color: var(--bg-dark);
            color: #e0e0e0;
            font-family: 'JetBrains+Mono', monospace;
            overflow-x: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(
                rgba(18, 16, 16, 0) 50%, 
                rgba(0, 0, 0, 0.25) 50%
            ), linear-gradient(
                90deg, 
                rgba(255, 0, 0, 0.06), 
                rgba(0, 255, 0, 0.02), 
                rgba(0, 0, 255, 0.06)
            );
            background-size: 100% 2px, 3px 100%;
        }

        @keyframes flicker {
            0% { opacity: 0.97; }
            5% { opacity: 0.95; }
            10% { opacity: 0.97; }
            15% { opacity: 0.9; }
            25% { opacity: 0.95; }
            30% { opacity: 1; }
            100% { opacity: 0.98; }
        }

        .diagram-wrapper {
            position: relative;
            width: 100%;
            max-width: 550px;
            padding: 40px 20px;
            animation: flicker 4s infinite;
        }

        .connector-vertical {
            position: absolute;
            width: 2px;
            background: linear-gradient(to bottom, 
                transparent 0%, 
                var(--cyber-blue) 20%, 
                var(--cyber-blue) 80%, 
                transparent 100%);
            left: 30px; 
            top: 40px;
            height: calc(100% - 100px);
            box-shadow: 0 0 15px var(--cyber-blue-dim);
        }
        @media (min-width: 768px) { .connector-vertical { left: 60px; top: 60px; height: calc(100% - 80px); } }

        .connector-horizontal {
            position: absolute;
            height: 2px;
            background: var(--cyber-blue-dim);
            left: 30px;
            z-index: 0;
            transition: all 0.3s ease;
        }
        @media (min-width: 768px) { .connector-horizontal { left: 60px; } }

        .label {
            font-size: 0.55rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: var(--cyber-blue);
            position: absolute;
            white-space: nowrap;
            text-shadow: 0 0 8px var(--cyber-blue);
            opacity: 0.7;
        }

        .node-box {
            position: relative;
            border-left: 3px solid var(--cyber-blue);
            border-right: 1px solid rgba(0, 242, 255, 0.1);
            border-top: 1px solid rgba(0, 242, 255, 0.1);
            border-bottom: 1px solid rgba(0, 242, 255, 0.1);
            padding: 0.85rem 1.25rem;
            background: rgba(0, 20, 30, 0.8);
            backdrop-filter: blur(5px);
            transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
            cursor: pointer;
            z-index: 10;
            display: block;
            text-decoration: none !important;
            color: inherit;
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
            -webkit-tap-highlight-color: transparent;
        }

        .section-container:hover .connector-horizontal {
            background: var(--cyber-blue);
            box-shadow: 0 0 15px var(--cyber-blue);
        }

        .node-box:hover {
            background: rgba(0, 40, 60, 0.9);
            border-color: var(--cyber-blue);
            transform: scale(1.02) translateX(10px);
            box-shadow: -5px 0 20px var(--cyber-blue-dim);
        }

        .cyber-glitch:hover {
            text-shadow: 2px 0 var(--cyber-red), -2px 0 #0ff;
            animation: glitch-anim 0.2s infinite linear alternate-reverse;
        }

        #profile-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
            font-size: 0.75rem;
            line-height: 1.6;
        }
        #profile-content.expanded {
            max-height: 1000px;
            transition: max-height 1s ease-in-out;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px dashed var(--cyber-blue-dim);
        }

        @keyframes glitch-anim {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 1px); }
            40% { transform: translate(-2px, -1px); }
            60% { transform: translate(2px, 1px); }
            80% { transform: translate(2px, -1px); }
            100% { transform: translate(0); }
        }

        #toast {
            visibility: hidden;
            background-color: var(--bg-dark);
            color: var(--cyber-blue);
            border: 1px solid var(--cyber-blue);
            padding: 10px 20px;
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.7rem;
            letter-spacing: 0.2em;
            text-shadow: 0 0 5px var(--cyber-blue);
            z-index: 100;
        }
        #toast.show { visibility: visible; animation: slideIn 0.3s ease; }
        @keyframes slideIn { from { bottom: 0; opacity: 0; } to { bottom: 30px; opacity: 1; } }

        canvas { position: fixed; top: 0; left: 0; z-index: -1; }
    </style>
</head>
<body>

    <canvas id="cyber-bg"></canvas>

    <div class="diagram-wrapper">
        <div class="connector-vertical"></div>

        <!-- IDENTITY -->
        <div class="section-container relative mb-12 md:mb-16 flex items-center">
            <span class="label" style="top: -25px; left: 30px;" class="md:left-[60px]">>&nbsp;SYS.ADMIN_ID</span>
            <div class="node-box ml-[30px] md:ml-[60px]" onclick="toggleProfile()">
                <h1 class="text-xl md:text-3xl font-bold tracking-tighter cyber-glitch" style="color: var(--cyber-blue)">AHMED IRFAN</h1>
                <p class="text-[9px] text-white/50 mt-1 uppercase tracking-[0.5em]">CS_STUDENT // NEURAL_NET_RESEARCH</p>
                <div id="profile-content" class="text-blue-100/80">
                    <p class="mb-3">Hi! I’m Ahmed, a CS student and tech enthusiast passionate about programming, robotics, and innovative digital solutions.</p>
                    <p class="mb-3">This portfolio is a cyberpunk-style interactive digital business card featuring neon animations, glitch effects, and responsive design.</p>
                    <p class="text-blue-400 font-bold italic">"Reflecting creativity and passion for futuristic tech. More projects coming soon!"</p>
                </div>
            </div>
        </div>

        <!-- LINKEDIN -->
        <div class="section-container relative mb-10 md:mb-16 flex items-center">
            <div class="connector-horizontal" style="top: 50%; width: 40px;"></div>
            <span class="label" style="top: -20px; left: 70px;" class="md:left-[100px]">>&nbsp;PROFESSIONAL_LINK</span>
            <div onclick="handleLinkedInClick(event)" class="node-box ml-[40px] md:ml-[100px]">
                <span class="text-xs md:text-sm font-bold">LINKEDIN // PROFILE</span>
                <div class="text-[7px] text-blue-300/40 mt-1">STATUS: SOURCE_VERIFIED</div>
            </div>
        </div>

        <!-- GITHUB 01 -->
        <div class="section-container relative mb-10 md:mb-16 flex items-center">
            <div class="connector-horizontal" style="top: 50%; width: 60px;"></div>
            <span class="label" style="top: -20px; left: 90px;" class="md:left-[120px]">>&nbsp;REPO_01</span>
            <a href="https://github.com/xCYBERx01" target="_blank" rel="noopener noreferrer" class="node-box ml-[60px] md:ml-[120px]">
                <span class="text-xs md:text-sm font-bold">@xCYBERx01</span>
                <div class="text-[7px] text-blue-300/40 mt-1">PROTOCOL: SECURE_CORE</div>
            </a>
        </div>

        <!-- GITHUB 02 -->
        <div class="section-container relative mb-10 md:mb-16 flex items-center">
            <div class="connector-horizontal" style="top: 50%; width: 80px;"></div>
            <span class="label" style="top: -20px; left: 110px;" class="md:left-[140px]">>&nbsp;REPO_02</span>
            <a href="https://github.com/ahmedirfanak" target="_blank" rel="noopener noreferrer" class="node-box ml-[80px] md:ml-[140px]">
                <span class="text-xs md:text-sm font-bold">@ahmedirfanak</span>
                <div class="text-[7px] text-blue-300/40 mt-1">PROTOCOL: DEV_INSTANCE</div>
            </a>
        </div>

        <!-- INSTAGRAM -->
        <div class="section-container relative mb-10 md:mb-16 flex items-center">
            <div class="connector-horizontal" style="top: 50%; width: 50px;"></div>
            <span class="label" style="top: -20px; left: 80px;" class="md:left-[110px]">>&nbsp;VISUAL_FEED</span>
            <a href="https://instagram.com/ahmedirfanak" target="_blank" rel="noopener noreferrer" class="node-box ml-[50px] md:ml-[110px]">
                <span class="text-xs md:text-sm font-bold">@ahmedirfanak</span>
            </a>
        </div>

        <!-- CONTACT (UPDATED SIGNAL) -->
        <div class="section-container relative mb-8 flex items-center">
            <div class="connector-horizontal" style="top: 50%; width: 30px;"></div>
            <span class="label" style="top: -20px; left: 60px;" class="md:left-[90px]">>&nbsp;COMMS_UPLINK</span>
            <div onclick="handleMailClick(event)" class="node-box ml-[30px] md:ml-[90px]">
                <span class="text-[10px] md:text-sm text-blue-200">ahmedirfanak01@gmail.com</span>
                <div class="mt-2 flex items-center gap-2">
                    <span class="w-2 h-2 bg-green-500 rounded-sm animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                    <span class="text-[8px] text-green-400 uppercase font-bold">Signal: AVAILABLE FOR PROJECTS</span>
                </div>
            </div>
        </div>

        <!-- HUD FOOTER -->
        <div class="mt-16 flex justify-between items-end border-t border-white/10 pt-4">
            <div class="text-[8px] text-white/30 space-y-1">
                <p>LOC: 12.87°N, 74.84°E</p>
                <p>OS: CYBER_OS v2.0.4</p>
            </div>
            <div class="text-right text-[8px] text-blue-500/50 space-y-1">
                <p>ENCRYPTION: AES-256</p>
                <p class="font-bold text-blue-400">STATUS: AUTHORIZED</p>
            </div>
        </div>
    </div>

    <div id="toast">ACTION_EXECUTED</div>

    <script>
        function toggleProfile() {
            const content = document.getElementById('profile-content');
            content.classList.toggle('expanded');
        }

        function showToast(message) {
            const toast = document.getElementById("toast");
            toast.innerText = message;
            toast.className = "show";
            setTimeout(() => { toast.className = ""; }, 3000);
        }

        function copyToClipboard(text) {
            const el = document.createElement('textarea');
            el.value = text;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback copy failed', err);
            }
            document.body.removeChild(el);
        }

        function handleLinkedInClick(event) {
            event.stopPropagation();
            const link = "https://www.linkedin.com/in/ahmedirfanak?trk=contact-info";
            copyToClipboard(link);
            showToast("PROFILE_COPIED_TO_MEMORY");
            
            setTimeout(() => {
                window.open(link, '_blank');
            }, 150);
        }

        function handleMailClick(event) {
            event.stopPropagation();
            const email = "ahmedirfanak01@gmail.com";
            copyToClipboard(email);
            showToast("EMAIL_COPIED_TO_MEMORY");
            
            setTimeout(() => {
                window.location.href = "mailto:" + email;
            }, 300);
        }

        const canvas = document.getElementById('cyber-bg');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function init() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for(let i=0; i<60; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2,
                    speed: Math.random() * 1 + 0.2
                });
            }
        }

        function draw() {
            ctx.fillStyle = 'rgba(2, 2, 4, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00f2ff22';
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                p.y -= p.speed;
                if(p.y < 0) p.y = canvas.height;
            });
            
            if(Math.random() > 0.95) {
                ctx.strokeStyle = '#00f2ff11';
                ctx.beginPath();
                let y = Math.random() * canvas.height;
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', init);
        init();
        draw();
    </script>
</body>
</html>

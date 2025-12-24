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
            navigator.clipboard.writeText(text).catch(err => {
                console.error('Failed to copy text: ', err);
            });
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

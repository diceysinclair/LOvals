// ========================================
// FLOATING HEARTS BACKGROUND ANIMATION
// ========================================

// Creates a single heart that floats up the screen
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';  // Random horizontal position
    heart.style.top = '100vh';  // Start at bottom of screen
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';  // Random size
    heart.style.opacity = Math.random() * 0.5 + 0.3;  // Random transparency
    heart.style.pointerEvents = 'none';  // Don't block clicks
    heart.style.zIndex = '0';  // Behind everything
    heart.style.transition = 'all 4s linear';  // Smooth animation
    
    document.querySelector('.hearts-background').appendChild(heart);
    
    // Animate heart moving up
    setTimeout(() => {
        heart.style.top = '-100px';  // Move to top
        heart.style.transform = `translateX(${(Math.random() - 0.5) * 200}px)`;  // Drift sideways
    }, 100);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Create a new heart every 0.5 seconds
setInterval(createHeart, 500);


// ========================================
// SURPRISE BUTTON FUNCTION
// ========================================

// Shows the surprise message when button is clicked
function showLove() {
    const surprise = document.getElementById('surprise');
    surprise.classList.remove('hidden');
    
    // Create burst of 20 hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 100);
    }
}


// ========================================
// FIREWORKS ANIMATION
// ========================================

// Creates a firework explosion at x, y coordinates
function createFirework(x, y) {
    const colors = ['#ff0844', '#ffb199', '#ff6ad5', '#c774e8', '#ad5389', '#ffd700', '#ff1493'];
    const emojis = ['💖', '💕', '💗', '💓', '💝', '✨', '⭐', '🌟', '💫'];
    
    // Create 30 particles for each firework
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const useEmoji = Math.random() > 0.5;  // 50% chance of emoji vs colored dot
        
        if (useEmoji) {
            particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.fontSize = (Math.random() * 20 + 15) + 'px';
        } else {
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        }
        
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';  // On top of everything
        
        // Calculate direction for this particle (360 degrees / 30 particles)
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = Math.random() * 150 + 100;
        const vx = Math.cos(angle) * velocity;  // Horizontal velocity
        const vy = Math.sin(angle) * velocity;  // Vertical velocity
        
        document.body.appendChild(particle);
        
        // Animation variables
        let posX = x;
        let posY = y;
        let opacity = 1;
        let frame = 0;
        
        // Animate particle with physics
        const animate = () => {
            frame++;
            posX += vx / 30;
            posY += vy / 30 + frame * 0.5;  // Add gravity effect
            opacity -= 0.02;  // Fade out
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            
            // Continue animation until particle fades out
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// Launch a firework at a random position
function launchRandomFirework() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.6);  // Top 60% of screen
    createFirework(x, y);
}


// ========================================
// YES BUTTON - MAIN CELEBRATION
// ========================================

function handleYes() {
    const questionSection = document.querySelector('.question-section');
    const celebrationSection = document.getElementById('celebrationSection');
    
    // Hide the question
    questionSection.style.display = 'none';
    
    // Add her image as background
    document.body.style.backgroundImage = "url('/images/lovia.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    
    // Show all the romantic content (if it exists)
    if (celebrationSection) {
        celebrationSection.classList.remove('hidden');
    }
    
    // Create massive heart burst (50 hearts)
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, i * 50);
    }
    
    // Update header text
    document.querySelector('.hero h1').textContent = 'Yay! Happy Valentine\'s Day! 💕';
    
    // Launch 15 initial fireworks
    for (let i = 0; i < 15; i++) {
        setTimeout(launchRandomFirework, i * 300);
    }
    
    // Continue launching fireworks for 5 seconds
    const fireworkInterval = setInterval(launchRandomFirework, 400);
    setTimeout(() => clearInterval(fireworkInterval), 5000);
    
    // Send notification to you via Google Forms
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScdha8MrmXqaA3nqwkfr-kwPSyl5xaFf50qxsfE2-DcE3h5WA/formResponse?entry.2111360667=YES,+Lovia+said+Yes+%F0%9F%92%96%F0%9F%92%96%F0%9F%92%96&submit=Submit';
    
    // Submit form silently in background (you'll get email notification)
    fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors'
    }).catch(() => {
        // Ignore CORS errors - submission still works
    });
}


// ========================================
// NO BUTTON - MAKE IT RUN AWAY
// ========================================

let noClickCount = 0;

function handleNo() {
    const noButton = document.getElementById('noButton');
    noClickCount++;
    
    // First click - button gets smaller and changes text
    if (noClickCount === 1) {
        noButton.textContent = 'Are you sure? 🥺';
        noButton.style.padding = '12px 28px';
        noButton.style.fontSize = '1rem';
    } 
    // Second click - button gets even smaller
    else if (noClickCount === 2) {
        noButton.textContent = 'Really? 😢';
        noButton.style.padding = '10px 22px';
        noButton.style.fontSize = '0.9rem';
        
        // Start making it run away on hover
        noButton.addEventListener('mouseenter', moveNoButton);
    } 
    // Third+ clicks - button runs away to random positions
    else if (noClickCount >= 3) {
        moveNoButton();
        noButton.textContent = 'Please? 🥹';
        noButton.style.padding = '8px 18px';
        noButton.style.fontSize = '0.8rem';
    }
}

// Function to move the No button to a random position
function moveNoButton() {
    const noButton = document.getElementById('noButton');
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 80;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    noButton.style.position = 'fixed';
    noButton.style.left = x + 'px';
    noButton.style.top = y + 'px';
    noButton.style.transition = 'all 0.3s ease';
}

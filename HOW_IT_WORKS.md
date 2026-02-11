# How This Valentine's Website Works 💖

## Project Structure

```
VALs/
├── src/main/
│   ├── java/com/valentine/
│   │   ├── ValentineApplication.java      # Main Spring Boot app
│   │   └── controller/
│   │       └── HomeController.java        # Handles the web page
│   └── resources/
│       ├── application.properties         # App settings (port 8081)
│       ├── static/
│       │   ├── css/
│       │   │   └── style.css             # All the styling
│       │   └── js/
│       │       └── script.js             # All the animations
│       └── templates/
│           └── index.html                # The web page structure
└── pom.xml                               # Maven dependencies
```

---

## How Each File Works

### 1. **HomeController.java** (Backend)
This is the Java code that runs on the server.

**What it does:**
- Calculates days until Valentine's Day (Feb 14, 2026)
- Sets Lovia's name
- Sends this data to the HTML page

**Key code:**
```java
@GetMapping("/")  // When someone visits the homepage
public String home(Model model) {
    // Calculate days until Valentine's Day
    LocalDate valentinesDay = LocalDate.of(2026, 2, 14);
    LocalDate today = LocalDate.now();
    long daysUntil = ChronoUnit.DAYS.between(today, valentinesDay);
    
    // Send data to the HTML page
    model.addAttribute("daysUntil", daysUntil);
    model.addAttribute("girlfriendName", "Lovia");
    
    return "index";  // Show index.html
}
```

---

### 2. **index.html** (Structure)
This is the skeleton of your web page.

**What it contains:**
- Header with "Will You Be My Valentine?"
- Yes/No buttons
- Hidden celebration content (countdown, love letter, reasons, surprise)

**How Thymeleaf works:**
```html
<!-- This gets replaced with "Lovia" from Java -->
<h2 th:text="${girlfriendName}">Lovia</h2>

<!-- This gets replaced with the number of days -->
<div th:text="${daysUntil}">8</div>
```

**Button clicks:**
```html
<button onclick="handleYes()">Yes! 💖</button>
<button onclick="handleNo()">No</button>
```
These call JavaScript functions when clicked.

---

### 3. **style.css** (Styling)
Makes everything look beautiful.

**Key concepts:**

**Colors & Gradients:**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Creates purple gradient background */
```

**Transparency:**
```css
background: rgba(255, 255, 255, 0.1);
/* White with 10% opacity */
```

**Animations:**
```css
@keyframes heartbeat {
    0%, 100% { transform: scale(1); }    /* Normal size */
    25% { transform: scale(1.1); }       /* Bigger */
    50% { transform: scale(1); }         /* Back to normal */
}
```

**Hover effects:**
```css
.yes-button:hover {
    transform: scale(1.15);  /* Grow 15% when mouse over */
}
```

---

### 4. **script.js** (Interactivity)
Makes everything move and respond.

#### **A. Floating Hearts Background**
```javascript
function createHeart() {
    // Create a heart emoji
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    
    // Position it randomly at bottom
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    
    // Add to page
    document.querySelector('.hearts-background').appendChild(heart);
    
    // Animate it moving up
    setTimeout(() => {
        heart.style.top = '-100px';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => heart.remove(), 4000);
}

// Create a new heart every 0.5 seconds
setInterval(createHeart, 500);
```

#### **B. Fireworks**
```javascript
function createFirework(x, y) {
    // Create 30 particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        
        // Calculate direction (360 degrees / 30 = 12° each)
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = Math.random() * 150 + 100;
        const vx = Math.cos(angle) * velocity;  // Horizontal speed
        const vy = Math.sin(angle) * velocity;  // Vertical speed
        
        // Animate with physics (gravity + fade out)
        const animate = () => {
            posX += vx / 30;
            posY += vy / 30 + frame * 0.5;  // Gravity pulls down
            opacity -= 0.02;  // Fade out
            
            if (opacity > 0) {
                requestAnimationFrame(animate);  // Continue animation
            } else {
                particle.remove();  // Clean up
            }
        };
        animate();
    }
}
```

#### **C. Yes Button**
```javascript
function handleYes() {
    // 1. Hide the question
    questionSection.style.display = 'none';
    
    // 2. Show celebration content
    celebrationSection.classList.remove('hidden');
    
    // 3. Launch 50 hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, i * 50);
    }
    
    // 4. Launch fireworks for 5 seconds
    for (let i = 0; i < 15; i++) {
        setTimeout(launchRandomFirework, i * 300);
    }
    
    // 5. Send notification to Google Forms
    fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors'
    });
}
```

#### **D. No Button (Runs Away)**
```javascript
function handleNo() {
    noClickCount++;
    
    if (noClickCount === 1) {
        // First click: change text and shrink
        noButton.textContent = 'Are you sure? 🥺';
        noButton.style.fontSize = '1rem';
    } else if (noClickCount >= 3) {
        // Third+ click: move to random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        noButton.style.position = 'fixed';
        noButton.style.left = x + 'px';
        noButton.style.top = y + 'px';
    }
}
```

---

## How Google Forms Notification Works

1. You created a Google Form
2. You got the pre-filled URL with "YES, Lovia said Yes 💖💖💖"
3. When she clicks Yes, JavaScript sends a POST request to that URL
4. Google Forms receives the submission
5. You get an email notification instantly!

**The URL format:**
```
https://docs.google.com/forms/d/e/FORM_ID/formResponse?entry.ENTRY_ID=YOUR_MESSAGE
```

---

## Key Concepts to Learn

### 1. **Spring Boot MVC Pattern**
- **Model**: Data (daysUntil, girlfriendName)
- **View**: HTML template (index.html)
- **Controller**: Java code that connects them (HomeController.java)

### 2. **DOM Manipulation**
```javascript
document.createElement('div')        // Create element
element.style.left = '100px'        // Change style
element.classList.add('hidden')     // Add CSS class
document.body.appendChild(element)  // Add to page
element.remove()                    // Remove from page
```

### 3. **CSS Positioning**
- `position: fixed` - Stays in place when scrolling
- `position: relative` - Normal position
- `z-index` - Layer order (higher = on top)

### 4. **Animations**
- `@keyframes` - Define animation steps
- `animation` - Apply animation to element
- `transition` - Smooth changes
- `transform` - Move, scale, rotate

### 5. **JavaScript Timing**
```javascript
setTimeout(function, 1000)   // Run once after 1 second
setInterval(function, 1000)  // Run every 1 second
requestAnimationFrame(fn)    // Run on next frame (smooth animation)
```

---

## How to Customize

### Change her name:
**HomeController.java** line 16:
```java
model.addAttribute("girlfriendName", "Lovia");
```

### Change love letter:
**index.html** lines 32-37

### Change reasons:
**index.html** lines 44-51

### Change colors:
**style.css** - Look for color codes like `#667eea` or `rgba(255, 255, 255, 0.1)`

### Change firework count:
**script.js** line 127:
```javascript
for (let i = 0; i < 15; i++) {  // Change 15 to more/less
```

---

## Running the App

1. Open project in IntelliJ IDEA
2. Run `ValentineApplication.java`
3. Open browser to `http://localhost:8081`
4. Share the link with Lovia!

---

## What Happens When She Clicks Yes

1. ✨ Question disappears
2. 🎆 15 fireworks launch
3. 💕 50 hearts float up
4. 🎆 More fireworks for 5 seconds
5. 📧 You get email notification
6. 💖 All romantic content appears
7. 🎉 Header changes to "Yay! Happy Valentine's Day!"

---

Good luck! 💖

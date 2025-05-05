document.addEventListener('DOMContentLoaded', function() {
    const animationToggle = document.getElementById('animation-toggle');
    const animationSpeed = document.getElementById('animation-speed');
    const animationStyle = document.getElementById('animation-style');
    const animatedElement = document.getElementById('animated-element');
    const triggerBtn = document.getElementById('trigger-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Load saved preferences from localStorage
    loadPreferences();
    
    animationToggle.addEventListener('change', savePreferences);
    animationSpeed.addEventListener('change', savePreferences);
    animationStyle.addEventListener('change', savePreferences);
    
    triggerBtn.addEventListener('click', triggerAnimation);
    resetBtn.addEventListener('click', resetPreferences);
    
    // Function to load preferences from localStorage
    function loadPreferences() {
        const preferences = JSON.parse(localStorage.getItem('animationPreferences')) || {
            enabled: false,
            speed: 'normal',
            style: 'bounce'
        };
        
        animationToggle.checked = preferences.enabled;
        animationSpeed.value = preferences.speed;
        animationStyle.value = preferences.style;
        
        applyPreferences();
    }
    
    // Function to save preferences to localStorage
    function savePreferences() {
        const preferences = {
            enabled: animationToggle.checked,
            speed: animationSpeed.value,
            style: animationStyle.value
        };
        
        localStorage.setItem('animationPreferences', JSON.stringify(preferences));
        applyPreferences();
    }
    
    // Function to apply the current preferences
    function applyPreferences() {
        // Remove all animation classes first
        animatedElement.classList.remove('bounce', 'rotate', 'color-change', 'slow', 'normal', 'fast');
        
        if (animationToggle.checked) {
            // Add selected animation class
            animatedElement.classList.add(animationStyle.value);
            
            // Add speed class
            animatedElement.classList.add(animationSpeed.value);
        }
    }
    
    // Function to trigger a special animation
    function triggerAnimation() {
        // First remove any ongoing animations
        animatedElement.classList.remove('bounce', 'rotate', 'color-change');
        
        // Add a temporary class for the triggered animation
        animatedElement.classList.add('bounce', 'fast');
        
        // Remove the animation after it completes
        setTimeout(() => {
            animatedElement.classList.remove('bounce', 'fast');
            applyPreferences(); // Re-apply user preferences
        }, 1000);
    }
    
    // Function to reset preferences
    function resetPreferences() {
        localStorage.removeItem('animationPreferences');
        animationToggle.checked = false;
        animationSpeed.value = 'normal';
        animationStyle.value = 'bounce';
        applyPreferences();
    }
});
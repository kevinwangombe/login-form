// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const togglePassword = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
const eyeOffIcon = document.getElementById('eyeOffIcon');
const loginButton = document.getElementById('loginButton');
const buttonText = document.getElementById('buttonText');
const loadingSpinner = document.getElementById('loadingSpinner');
const messageContainer = document.getElementById('messageContainer');
const rememberCheckbox = document.getElementById('remember');

// Mock user database (in a real app, this would be on a server)
const mockUsers = [
    { email: 'admin@example.com', password: 'admin123', name: 'Admin User' },
    { email: 'user@example.com', password: 'user123', name: 'Regular User' },
    { email: 'test@example.com', password: 'test123', name: 'Test User' }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }
});

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    if (type === 'text') {
        eyeIcon.classList.add('hidden');
        eyeOffIcon.classList.remove('hidden');
    } else {
        eyeIcon.classList.remove('hidden');
        eyeOffIcon.classList.add('hidden');
    }
});

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' 
            ? 'bg-green-500 text-white' 
            : type === 'error'
            ? 'bg-red-500 text-white'
            : 'bg-blue-500 text-white'
    }`;
    
    messageDiv.innerHTML = `
        <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                ${type === 'success' 
                    ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>'
                    : type === 'error'
                    ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>'
                    : '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>'
                }
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    messageContainer.innerHTML = '';
    messageContainer.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// Form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset errors
    emailError.classList.add('hidden');
    passwordError.classList.add('hidden');
    
    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Validate
    let isValid = true;
    
    if (!validateEmail(email)) {
        emailError.classList.remove('hidden');
        isValid = false;
    }
    
    if (password.length < 6) {
        passwordError.classList.remove('hidden');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    buttonText.textContent = 'Signing In...';
    loadingSpinner.classList.remove('hidden');
    loginButton.disabled = true;
    
    // Simulate API call
    try {
        await simulateLogin(email, password);
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        // Reset loading state
        buttonText.textContent = 'Sign In';
        loadingSpinner.classList.add('hidden');
        loginButton.disabled = false;
    }
});

// Simulate login API call
function simulateLogin(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Check credentials against mock database
            const user = mockUsers.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Handle remember me
                if (rememberCheckbox.checked) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                
                // Store session (in real app, this would be a JWT token)
                sessionStorage.setItem('currentUser', JSON.stringify({
                    email: user.email,
                    name: user.name,
                    loginTime: new Date().toISOString()
                }));
                
                showMessage(`Welcome back, ${user.name}! Redirecting...`, 'success');
                
                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    // In a real app, you'd redirect to a dashboard page
                    showMessage('Login successful! You can now access the application.', 'success');
                    console.log('User logged in:', user);
                }, 2000);
                
                resolve(user);
            } else {
                reject(new Error('Invalid email or password. Please try again.'));
            }
        }, 1500); // Simulate network delay
    });
}

// Real-time validation
emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() && !validateEmail(emailInput.value.trim())) {
        emailError.classList.remove('hidden');
    } else {
        emailError.classList.add('hidden');
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.value.trim().length > 0 && passwordInput.value.trim().length < 6) {
        passwordError.classList.remove('hidden');
    } else {
        passwordError.classList.add('hidden');
    }
});

// Check if user is already logged in
function checkLoginStatus() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        showMessage(`Already logged in as ${user.name}`, 'info');
        console.log('Current user session:', user);
    }
}

// Initialize login status check
checkLoginStatus();

// Handle forgot password link
document.querySelector('a[href="#"]').addEventListener('click', (e) => {
    if (e.target.textContent.includes('Forgot password')) {
        e.preventDefault();
        showMessage('Password reset functionality would be implemented here', 'info');
    } else if (e.target.textContent.includes('Sign up')) {
        e.preventDefault();
        showMessage('Sign up page would be implemented here', 'info');
    }
});

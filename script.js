const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const eyeOpen = document.getElementById('eyeIcon');
const eyeClosed = document.getElementById('eyeOffIcon');
const submitBtn = document.getElementById('loginButton');
const btnLabel = document.getElementById('buttonText');
const spinner = document.getElementById('loadingSpinner');
const toastBox = document.getElementById('messageContainer');
const rememberMe = document.getElementById('remember');

// fake users for testing, swap with real API later
const users = [
    { email: 'admin@example.com', password: 'admin123', name: 'Admin User' },
    { email: 'user@example.com', password: 'user123', name: 'Regular User' },
    { email: 'test@example.com', password: 'test123', name: 'Test User' }
];

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('savedEmail');
    if (saved) {
        emailInput.value = saved;
        rememberMe.checked = true;
    }
    checkSession();
});

toggleBtn.addEventListener('click', () => {
    const isHidden = passInput.type === 'password';
    passInput.type = isHidden ? 'text' : 'password';
    eyeOpen.classList.toggle('hidden', isHidden);
    eyeClosed.classList.toggle('hidden', !isHidden);
});

function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function toast(msg, type) {
    const colors = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-blue-500' };
    const icons = {
        success: '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>',
        error: '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>',
        info: '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>'
    };

    const el = document.createElement('div');
    el.className = `p-4 rounded-lg shadow-lg text-white ${colors[type] || colors.info}`;
    el.innerHTML = `<div class="flex items-center gap-2">
        <svg class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">${icons[type] || icons.info}</svg>
        <span>${msg}</span>
    </div>`;

    toastBox.innerHTML = '';
    toastBox.appendChild(el);

    setTimeout(() => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s';
        setTimeout(() => el.remove(), 300);
    }, 5000);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const pass = passInput.value.trim();

    document.getElementById('emailError').classList.add('hidden');
    document.getElementById('passwordError').classList.add('hidden');

    let ok = true;
    if (!isValidEmail(email)) { document.getElementById('emailError').classList.remove('hidden'); ok = false; }
    if (pass.length < 6) { document.getElementById('passwordError').classList.remove('hidden'); ok = false; }
    if (!ok) return;

    btnLabel.textContent = 'Signing In...';
    spinner.classList.remove('hidden');
    submitBtn.disabled = true;

    try {
        await doLogin(email, pass);
    } catch (err) {
        toast(err.message, 'error');
    } finally {
        btnLabel.textContent = 'Sign In';
        spinner.classList.add('hidden');
        submitBtn.disabled = false;
    }
});

function doLogin(email, pass) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const match = users.find(u => u.email === email && u.password === pass);

            if (!match) {
                reject(new Error('Wrong email or password.'));
                return;
            }

            if (rememberMe.checked) {
                localStorage.setItem('savedEmail', email);
            } else {
                localStorage.removeItem('savedEmail');
            }

            sessionStorage.setItem('user', JSON.stringify({
                email: match.email,
                name: match.name,
                at: new Date().toISOString()
            }));

            toast(`Welcome back, ${match.name}!`, 'success');

            // TODO: redirect to dashboard
            setTimeout(() => { console.log('logged in:', match); }, 2000);

            resolve(match);
        }, 1200);
    });
}

emailInput.addEventListener('input', () => {
    const val = emailInput.value.trim();
    const err = document.getElementById('emailError');
    if (val && !isValidEmail(val)) err.classList.remove('hidden');
    else err.classList.add('hidden');
});

passInput.addEventListener('input', () => {
    const val = passInput.value.trim();
    document.getElementById('passwordError').classList.toggle('hidden', val.length === 0 || val.length >= 6);
});

function checkSession() {
    const u = sessionStorage.getItem('user');
    if (u) toast(`Already signed in as ${JSON.parse(u).name}`, 'info');
}

document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        toast(a.textContent.includes('Forgot') ? 'Password reset coming soon.' : 'Sign up page coming soon.', 'info');
    });
});
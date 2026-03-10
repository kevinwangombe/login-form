# Login Page Project

A modern, responsive login page built with HTML, TailwindCSS, and JavaScript featuring form validation, user authentication, and session management.

## Features

### 🎨 **UI/UX**
- Modern, clean design with TailwindCSS
- Responsive layout that works on all devices
- Smooth animations and transitions
- Password visibility toggle
- Loading states during authentication
- Toast-style notifications for success/error messages

### 🔐 **Authentication**
- Email and password validation
- Real-time form validation
- Mock user database for testing
- Session management with sessionStorage
- Remember me functionality with localStorage

### ✨ **Interactive Elements**
- Password show/hide toggle
- Remember email checkbox
- Forgot password link (placeholder)
- Sign up link (placeholder)
- Form submission with loading states

## Files Structure

```
login-page/
├── login.html          # Main login page
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Test Credentials

The application includes mock user accounts for testing:

| Email | Password | User Type |
|-------|----------|-----------|
| `admin@example.com` | `admin123` | Admin User |
| `user@example.com` | `user123` | Regular User |
| `test@example.com` | `test123` | Test User |

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation
1. Clone or download the project files
2. Open `login.html` in your web browser
3. Use the test credentials to log in

### Usage
1. Enter a valid email address and password
2. Optional: Check "Remember me" to save your email
3. Click "Sign In" to authenticate
4. View success/error messages in the top-right corner

## Validation Rules

### Email Validation
- Must be in valid email format (e.g., `user@example.com`)
- Real-time validation as you type

### Password Requirements
- Minimum 6 characters
- Real-time validation feedback

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **TailwindCSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - No external dependencies

### Data Storage
- **sessionStorage** - Current user session
- **localStorage** - Remembered email preference

### Security Features
- Password visibility toggle (user-controlled)
- Input sanitization
- Form validation before submission

## Browser Compatibility

This project is compatible with all modern browsers:
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Customization

### Adding New Users
Edit the `mockUsers` array in `script.js`:

```javascript
const mockUsers = [
    { email: 'newuser@example.com', password: 'password123', name: 'New User' },
    // ... existing users
];
```

### Styling Changes
- Modify TailwindCSS classes in `login.html`
- Add custom CSS in a `<style>` tag if needed

### Integration with Backend
Replace the `simulateLogin()` function in `script.js` with actual API calls:

```javascript
async function authenticateUser(email, password) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}
```

## Future Enhancements

- [ ] Backend API integration
- [ ] Password reset functionality
- [ ] User registration page
- [ ] Multi-factor authentication
- [ ] Social login options
- [ ] Account lockout after failed attempts
- [ ] Password strength meter
- [ ] Dark mode support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues, please open an issue on the project repository.

---

**Note**: This is a frontend-only demonstration. In production, always implement proper backend authentication, HTTPS, and security best practices.

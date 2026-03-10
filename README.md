# login page

Simple login page built with HTML, Tailwind, and vanilla JS.

## test accounts

| email | password |
|-------|----------|
| admin@example.com | admin123 |
| user@example.com | user123 |
| test@example.com | test123 |

## setup

Just open `login.html` in a browser. No build step needed.

## notes

- session stored in sessionStorage (not persistent)
- "remember me" saves email to localStorage
- `doLogin()` in script.js is mocked — replace with a real fetch call when connecting a backend
- redirect after login is a TODO (see the console.log stub)

## TODO

- [ ] hook up real auth API
- [ ] add password reset page
- [ ] registration flow

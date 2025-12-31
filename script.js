// Client-side handling for register, login and products
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const msg = document.getElementById('msg');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const payload = {
                name: document.getElementById('name').value.trim(),
                age: document.getElementById('age').value.trim(),
                mail: document.getElementById('mail').value.trim(),
                password: document.getElementById('password').value
            };
            try {
                const res = await fetch('/register', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (data.success) {
                    window.location.href = 'Login.html';
                } else {
                    (msg || showInlineMessage()).textContent = data.message || 'Sorry! technical error facing';
                }
            } catch (err) {
                (msg || showInlineMessage()).textContent = 'Sorry! technical error facing';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const payload = {
                mail: document.getElementById('email').value.trim(),
                password: document.getElementById('password').value
            };
            try {
                const res = await fetch('/login', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
                });
                const data = await res.json();
                if (data.success) {
                    window.location.href = 'products.html';
                } else {
                    (msg || showInlineMessage()).textContent = 'Invalid data entered please register your data';
                }
            } catch (err) {
                (msg || showInlineMessage()).textContent = 'Invalid data entered please register your data';
            }
        });
    }

    // Buy buttons on products page
    document.querySelectorAll('.buy').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Purchase successful — thank you!');
        });
    });

    function showInlineMessage() {
        let el = document.getElementById('msg');
        if (!el) {
            el = document.createElement('p');
            el.id = 'msg';
            el.className = 'msg';
            document.body.appendChild(el);
        }
        return el;
    }
});
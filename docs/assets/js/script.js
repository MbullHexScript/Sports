// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi semua fungsi
    initNavbar();
    initAnimations();
    initBookingButtons();
    initLoginForm();
});

// Navbar Functionality
function initNavbar() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menuNavigasi = document.querySelector('.menu-navigasi');

    if (hamburgerMenu && menuNavigasi) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('aktif');
            menuNavigasi.classList.toggle('aktif');
        });

        // Tutup menu saat link diklik (mobile)
        const menuLinks = document.querySelectorAll('.menu-navigasi a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('aktif');
                menuNavigasi.classList.remove('aktif');
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar-utama');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(135, 206, 235, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(135, 206, 235, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }
    });
}

// Smooth Animations
function initAnimations() {
    // Intersection Observer untuk animasi on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observasi elemen yang perlu animasi
    const animatedElements = document.querySelectorAll(`
        .kartu-keunggulan,
        .kartu-olahraga,
        .kartu-testimoni,
        .kartu-tempat-olahraga,
        .kartu-fasilitas,
        .item-fasilitas-tambahan,
        .kartu-member
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Booking Buttons Functionality
function initBookingButtons() {
    const bookingButtons = document.querySelectorAll('.tombol-booking');

    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const namaOlahraga = this.closest('.kartu-tempat-olahraga')
                                     .querySelector('h3').textContent;
            const harga = this.closest('.kartu-tempat-olahraga')
                             .querySelector('.label-harga').textContent;

            // Redirect ke WhatsApp dengan pesan booking
            const pesanBooking = `Halo, saya ingin booking ${namaOlahraga} dengan harga ${harga}. Mohon informasi ketersediaan jadwal. Terima kasih!`;
            const whatsappURL = `https://wa.me/6289533736447?text=${encodeURIComponent(pesanBooking)}`;

            window.open(whatsappURL, '_blank');
        });
    });

    // Member buttons
    const memberButtons = document.querySelectorAll('.tombol-pilih-member');

    memberButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jenisMember = this.closest('.kartu-member')
                                   .querySelector('h3').textContent;

            const pesanMember = `Halo, saya tertarik dengan paket ${jenisMember}. Mohon informasi lebih lanjut mengenai pendaftaran. Terima kasih!`;
            const whatsappURL = `https://wa.me/6289533736447?text=${encodeURIComponent(pesanMember)}`;

            window.open(whatsappURL, '_blank');
        });
    });
}

// Login Form Functionality
function initLoginForm() {
    const loginForm = document.getElementById('form-login');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validasi sederhana
            if (!email || !password) {
                showNotification('Mohon isi semua field!', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Format email tidak valid!', 'error');
                return;
            }

            // Simulasi login (karena ini hanya landing page)
            showNotification('Login berhasil! Selamat datang di NaufalNyaa SportEase', 'success');

            // Reset form setelah 2 detik
            setTimeout(() => {
                loginForm.reset();
            }, 2000);
        });
    }

    // Social login buttons
    const googleButton = document.querySelector('.tombol-google');
    const facebookButton = document.querySelector('.tombol-facebook');

    if (googleButton) {
        googleButton.addEventListener('click', function() {
            showNotification('Fitur login Google akan segera tersedia!', 'info');
        });
    }

    if (facebookButton) {
        facebookButton.addEventListener('click', function() {
            showNotification('Fitur login Facebook akan segera tersedia!', 'info');
        });
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `notifikasi notifikasi-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="tutup-notifikasi">&times;</button>
    `;

    // Tambahkan CSS untuk notifikasi jika belum ada
    if (!document.querySelector('#notifikasi-styles')) {
        const style = document.createElement('style');
        style.id = 'notifikasi-styles';
        style.textContent = `
            .notifikasi {
                position: fixed;
                top: 90px;
                right: 20px;
                background: white;
                color: #333;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 15px;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
                border-left: 4px solid #87CEEB;
            }

            .notifikasi-success {
                border-left-color: #28a745;
                background: #d4edda;
                color: #155724;
            }

            .notifikasi-error {
                border-left-color: #dc3545;
                background: #f8d7da;
                color: #721c24;
            }

            .notifikasi-info {
                border-left-color: #17a2b8;
                background: #d1ecf1;
                color: #0c5460;
            }

            .tutup-notifikasi {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: inherit;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }

            .tutup-notifikasi:hover {
                opacity: 1;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Tambahkan ke DOM
    document.body.appendChild(notification);

    // Event listener untuk tombol tutup
    const closeButton = notification.querySelector('.tutup-notifikasi');
    closeButton.addEventListener('click', function() {
        closeNotification(notification);
    });

    // Auto close setelah 5 detik
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

function closeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Smooth scroll untuk link internal
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Adjust for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Loading effect
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Initialize body opacity
document.body.style.opacity = '0';

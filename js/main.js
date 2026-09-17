/* ==========================================================================
   Shattered Backboard Analytics: site behaviour
   Theme toggle, mobile nav, reading progress, chart lightbox, scroll reveal.
   The initial theme class is set by the inline script in each page <head>
   so there is no flash before this file runs.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;
    var root = document.documentElement;

    /* ----------------------------------------------------------------------
       Theme toggle: dark is the default, light is the stored opt-in
       ---------------------------------------------------------------------- */

    var themeToggle = document.querySelector('.theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var light = root.classList.toggle('light-mode');
            themeToggle.setAttribute('aria-pressed', String(light));
            try {
                localStorage.setItem('theme', light ? 'light' : 'dark');
            } catch (e) {
                /* storage blocked, the toggle still works for this page view */
            }
        });

        themeToggle.setAttribute('aria-pressed', String(root.classList.contains('light-mode')));
    }

    /* ----------------------------------------------------------------------
       Mobile navigation
       ---------------------------------------------------------------------- */

    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var open = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(open));
        });

        navLinks.addEventListener('click', function (event) {
            if (event.target.closest('a')) {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ----------------------------------------------------------------------
       Reading progress bar (article pages only)
       ---------------------------------------------------------------------- */

    var progress = document.querySelector('.read-progress');
    var articleBody = document.querySelector('.article-body');

    if (progress && articleBody) {
        var updateProgress = function () {
            var rect = articleBody.getBoundingClientRect();
            var total = rect.height - window.innerHeight;
            var pct = total <= 0 ? 1 : (-rect.top) / total;
            progress.style.width = Math.min(100, Math.max(0, pct * 100)) + '%';
        };

        updateProgress();
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
    }

    /* ----------------------------------------------------------------------
       Chart lightbox: any image marked data-zoom opens full size
       ---------------------------------------------------------------------- */

    var lightbox = document.querySelector('.lightbox');

    if (lightbox) {
        var lightboxImage = lightbox.querySelector('img');
        var lightboxCaption = lightbox.querySelector('.lightbox-caption');
        var lastFocused = null;

        var openLightbox = function (img) {
            lastFocused = document.activeElement;
            lightboxImage.src = img.currentSrc || img.src;
            lightboxImage.alt = img.alt || '';
            lightboxCaption.textContent = img.getAttribute('data-caption') || img.alt || '';
            lightbox.classList.add('is-open');
            lightbox.setAttribute('aria-hidden', 'false');
            body.classList.add('no-scroll');
            lightbox.querySelector('.lightbox-close').focus();
        };

        var closeLightbox = function () {
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            body.classList.remove('no-scroll');
            lightboxImage.removeAttribute('src');
            lightboxCaption.textContent = '';
            if (lastFocused) { lastFocused.focus(); }
        };

        document.querySelectorAll('img[data-zoom]').forEach(function (img) {
            img.addEventListener('click', function () { openLightbox(img); });
        });

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
                closeLightbox();
            }
        });
    }

    /* ----------------------------------------------------------------------
       Scroll reveal
       ---------------------------------------------------------------------- */

    var revealTargets = document.querySelectorAll('.reveal');

    if (revealTargets.length) {
        if (!('IntersectionObserver' in window)) {
            revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
        } else {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

            revealTargets.forEach(function (el) { observer.observe(el); });
        }
    }

    /* ----------------------------------------------------------------------
       Contact form
       Posts to Formspree with fetch so the page never navigates away. The
       form carries novalidate, so the checks below are the only ones that
       run and the messages stay consistent across browsers.
       ---------------------------------------------------------------------- */

    var contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        var status = contactForm.querySelector('.form-status');
        var submitButton = contactForm.querySelector('button[type="submit"]');

        /* Deliberately loose: something, an @, something, a dot, something.
           Anything stricter starts rejecting addresses that really work. */
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        var setError = function (field, message) {
            var slot = contactForm.querySelector('[data-error-for="' + field.id + '"]');
            if (slot) { slot.textContent = message; }
            field.classList.toggle('is-invalid', Boolean(message));
            field.setAttribute('aria-invalid', message ? 'true' : 'false');
        };

        var validate = function () {
            var name = contactForm.querySelector('#cf-name');
            var email = contactForm.querySelector('#cf-email');
            var message = contactForm.querySelector('#cf-message');
            var firstBad = null;

            if (!name.value.trim()) {
                setError(name, 'Please add your name.');
                firstBad = firstBad || name;
            } else { setError(name, ''); }

            if (!email.value.trim()) {
                setError(email, 'Please add your email.');
                firstBad = firstBad || email;
            } else if (!emailPattern.test(email.value.trim())) {
                setError(email, 'That email address does not look right.');
                firstBad = firstBad || email;
            } else { setError(email, ''); }

            if (!message.value.trim()) {
                setError(message, 'Please add a message.');
                firstBad = firstBad || message;
            } else { setError(message, ''); }

            return firstBad;
        };

        var setStatus = function (text, kind) {
            status.textContent = text;
            status.classList.remove('is-ok', 'is-error');
            if (kind) { status.classList.add(kind); }
        };

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            var firstBad = validate();
            if (firstBad) {
                setStatus('', null);
                firstBad.focus();
                return;
            }

            /* A filled honeypot means a bot. Look like it worked, send nothing. */
            var honeypot = contactForm.querySelector('[name="_gotcha"]');
            if (honeypot && honeypot.value) {
                contactForm.reset();
                setStatus('Thanks, your message is on its way.', 'is-ok');
                return;
            }

            submitButton.disabled = true;
            setStatus('Sending...', null);

            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' }
            }).then(function (response) {
                if (response.ok) {
                    contactForm.reset();
                    setStatus('Thanks, your message is on its way.', 'is-ok');
                    return;
                }
                return response.json().then(function (data) {
                    var detail = data && data.errors && data.errors.length
                        ? data.errors.map(function (e) { return e.message; }).join(' ')
                        : 'Something went wrong sending that.';
                    setStatus(detail + ' You can also email eli.bball3@gmail.com.', 'is-error');
                }, function () {
                    setStatus('Something went wrong sending that. You can also email eli.bball3@gmail.com.', 'is-error');
                });
            }).catch(function () {
                setStatus('That did not send, the network may be down. You can also email eli.bball3@gmail.com.', 'is-error');
            }).then(function () {
                submitButton.disabled = false;
            });
        });

        /* Clear a field's complaint as soon as it is being fixed */
        contactForm.querySelectorAll('input, textarea').forEach(function (field) {
            field.addEventListener('input', function () {
                if (field.classList.contains('is-invalid')) { setError(field, ''); }
            });
        });
    }

    /* ----------------------------------------------------------------------
       Footer year
       ---------------------------------------------------------------------- */

    document.querySelectorAll('[data-year]').forEach(function (el) {
        el.textContent = String(new Date().getFullYear());
    });
});

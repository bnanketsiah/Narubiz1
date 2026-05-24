// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", (event) => {
    const isMobile = window.innerWidth < 768;

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Mobile toggle logic
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
            });
        });
    }

    // Active Nav Link Scroll Spy
    const sections = document.querySelectorAll("section[id], header[id]");
    const navItems = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            // 200px offset for fixed navbar
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current) && current !== "") {
                link.classList.add("active");
            }
        });
    });

    // Form Submission Handler
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent("New Message from " + name);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

            window.location.href = `mailto:narubizltd@gmail.com?subject=${subject}&body=${body}`;

            contactForm.reset();
            formStatus.style.display = 'block';
            formStatus.style.color = 'var(--accent)';
            formStatus.innerText = "Opening your email client...";

            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        });
    }

    // Trade Form Submission Handler
    const tradeForm = document.getElementById('trade-form');
    const tradeFormStatus = document.getElementById('trade-form-status');
    if (tradeForm) {
        tradeForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const company = document.getElementById('company').value;
            const contactPerson = document.getElementById('contact-person').value;
            const email = document.getElementById('trade-email').value;
            const country = document.getElementById('country').value;
            const volume = document.getElementById('volume').value;
            const message = document.getElementById('trade-message').value;

            const subject = encodeURIComponent("Trade Enquiry from " + company);
            const body = encodeURIComponent(`Company Name: ${company}\nContact Person: ${contactPerson}\nEmail: ${email}\nCountry: ${country}\nEstimated Volume: ${volume}\n\nMessage:\n${message}`);

            window.location.href = `mailto:narubizltd@gmail.com?subject=${subject}&body=${body}`;

            tradeForm.reset();
            tradeFormStatus.style.display = 'block';
            tradeFormStatus.style.color = 'var(--accent)';
            tradeFormStatus.innerText = "Opening your email client...";

            setTimeout(() => {
                tradeFormStatus.style.display = 'none';
            }, 5000);
        });
    }

    // Animated Metrics Counter
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();

                    const updateCounter = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);

                        // ease out quad
                        const easeProgress = progress * (2 - progress);
                        const currentVal = easeProgress * target;

                        if (target % 1 !== 0) {
                            counter.innerText = currentVal.toFixed(1);
                        } else {
                            counter.innerText = Math.floor(currentVal);
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    requestAnimationFrame(updateCounter);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const metricsSection = document.getElementById('metrics');
    if (metricsSection) {
        counterObserver.observe(metricsSection);
    }

    // GSAP Animations

    // Reveal Up
    gsap.utils.toArray('.gs-reveal-up').forEach(function (elem) {
        gsap.fromTo(elem,
            { y: isMobile ? 20 : 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: isMobile ? 0.5 : 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: isMobile ? "top 95%" : "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Reveal Left — fade only on mobile, slide on desktop
    gsap.utils.toArray('.gs-reveal-left').forEach(function (elem) {
        gsap.fromTo(elem,
            { x: isMobile ? 0 : -50, opacity: 0 },
            {
                x: 0, opacity: 1,
                duration: isMobile ? 0.5 : 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: isMobile ? "top 95%" : "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Reveal Right — fade only on mobile, slide on desktop
    gsap.utils.toArray('.gs-reveal-right').forEach(function (elem) {
        gsap.fromTo(elem,
            { x: isMobile ? 0 : 50, opacity: 0 },
            {
                x: 0, opacity: 1,
                duration: isMobile ? 0.5 : 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: isMobile ? "top 95%" : "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // About cards
    gsap.fromTo(".about-grid .about-card",
        { y: 50, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
            scrollTrigger: { trigger: ".about-grid", start: "top 80%" }
        }
    );

    // Team cards
    gsap.fromTo(".team-grid .about-card",
        { y: 50, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: ".team-grid", start: "top 80%" }
        }
    );

    // Press cards
    gsap.fromTo(".press-grid .about-card",
        { y: 50, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: ".press-grid", start: "top 80%" }
        }
    );

    // Process Steps — no stagger on mobile
    gsap.fromTo(".process-step",
        { y: isMobile ? 20 : 50, opacity: 0 },
        {
            y: 0, opacity: 1,
            duration: 0.8,
            stagger: isMobile ? 0 : 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: ".process-wrapper", start: "top 80%" }
        }
    );

    if (!isMobile) {
        gsap.to(".parallax-img", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".image-break",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

});

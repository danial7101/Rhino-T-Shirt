document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ DOMContentLoaded - Script is running!");
    const toggleButton = document.getElementById('toggleButton');
    const navUl = document.querySelector('#headernav ul');
    const header = document.querySelector('header');
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const section6 = document.getElementById('section6');
    const links = document.querySelectorAll('nav a[href^="#"]');
    const mobileMenu = document.getElementById('mobileMenu');

    if (toggleButton && mobileMenu) {
        toggleButton.addEventListener('click', () => {
            console.log("Hamburger clicked");
            mobileMenu.classList.toggle('show');
        });
    } else {
        console.warn('toggleButton or mobileMenu not found in the DOM');
    }
    // Smooth scroll
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = header.offsetHeight || 60;
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });

                // ✅ Close mobile menu after clicking
                if (mobileMenu.classList.contains('show')) {
                    mobileMenu.classList.remove('show');
                }
            }
        });
    });

    function smoothScrollOutOfSection1() {
        const rect = section1.getBoundingClientRect();

        if (rect.bottom <= 80 && !hasScrolledOut) {
            hasScrolledOut = true;
            if (section2) {
                window.scrollTo({
                    top: section2.offsetTop,
                    behavior: 'smooth'
                });
            }
        } else if (rect.top > 0) {
            hasScrolledOut = false; // Reset once user scrolls back above
        }
    }

    // Reference to section1 and header
    // Toggle transparency when inside/outside section1
    function updateHeaderStyle() {
        const rect = section1.getBoundingClientRect();
        const isInSection1 = rect.top <= 0 && rect.bottom > 80;

        if (isInSection1) {
            header.classList.add('transparent');
        } else {
            header.classList.remove('transparent'); // Resets to default header
        }
    }

    window.addEventListener('scroll', () => {
        updateHeaderStyle();
        smoothScrollOutOfSection1();
    });

    // Run on scroll and resize
    window.addEventListener('scroll', updateHeaderStyle);
    window.addEventListener('resize', updateHeaderStyle);
    document.addEventListener('DOMContentLoaded', updateHeaderStyle);

    // Looping text only for section6
    const loopItems = [
        'DTF PRINTING',
        'UV PRINTING',
        'SUBLIMATION',
        'EMBROIDERY',
        'SILK SCREEN',
        'CUSTOM MADE T SHIRT'
    ];

    const loopingTextInner = section6?.querySelector('#loopingTextInner');

    if (loopingTextInner) {
        // const spanGroup = loopItems.map(text => `<span class="loop-item">||&nbsp;&nbsp;${text}&nbsp;&nbsp;</span>`).join('');
        const spanGroup = loopItems.map(text => `<span> ${text} </span>`).join('');
        loopingTextInner.innerHTML = spanGroup + spanGroup;
    }

    // Scroll
    const scrollContainer = document.getElementById('scrollContainer');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (scrollLeftBtn && scrollRightBtn && scrollContainer) {
        scrollLeftBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    // fade
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Optional: run only once
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(el => observer.observe(el));

});

window.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('scrollContainer');
    let scrollSpeed = 1; // Adjust speed here

    function autoScroll() {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset scroll position for seamless loop
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
        }

        requestAnimationFrame(autoScroll);
    }

    autoScroll();

    // Optional: pause on hover
    // scrollContainer.addEventListener('mouseenter', () => scrollSpeed = 0);
    // scrollContainer.addEventListener('mouseleave', () => scrollSpeed = 1);
});




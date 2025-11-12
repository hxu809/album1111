// 平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 滚动时添加动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    // 为专辑卡片和奖项卡片添加初始样式
    const animatedElements = document.querySelectorAll('.album-card, .award-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Hero image and content scroll animation
    const heroImage = document.getElementById('heroImage');
    const heroContent = document.querySelector('.hero-content');
    let lastScroll = 0;
    const header = document.querySelector('header');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;

                // Header shadow effect
                if (currentScroll > 100) {
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
                } else {
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }

                // Hero image and content animation based on scroll direction
                if (heroImage && heroContent) {
                    if (currentScroll > lastScroll && currentScroll > 50) {
                        // Scrolling down - slide both image and content out to the left
                        heroImage.classList.add('slide-out-left');
                        heroImage.classList.remove('slide-in-right');
                        heroContent.classList.add('slide-out-left');
                        heroContent.classList.remove('slide-in-right');
                    } else if (currentScroll < lastScroll || currentScroll <= 50) {
                        // Scrolling up - slide both image and content in from the right
                        heroImage.classList.remove('slide-out-left');
                        heroImage.classList.add('slide-in-right');
                        heroContent.classList.remove('slide-out-left');
                        heroContent.classList.add('slide-in-right');
                    }
                }

                lastScroll = currentScroll;
                ticking = false;
            });

            ticking = true;
        }
    });

    // 为歌曲列表添加点击提示
    const songItems = document.querySelectorAll('.song-list li');
    songItems.forEach(item => {
        item.addEventListener('click', function() {
            const songName = this.textContent;
            // 简单的反馈效果
            this.style.color = 'var(--accent-color)';
            setTimeout(() => {
                this.style.color = 'var(--text-color)';
            }, 300);
        });
    });
});

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const header = document.querySelector("header");
const themeToggle = document.getElementById("theme-toggle");



const currentTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', currentTheme);

function updateThemeIcon() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (themeToggle) {
        themeToggle.innerHTML = isDark 
            ? '<i class="fas fa-moon"></i>' // Dark Mode: Show Moon
            : '<i class="fas fa-sun"></i>';  // Light Mode: Show Sun
    }
}


function toggleTheme() {
    const currentMode = document.body.getAttribute('data-theme');
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newMode);
    localStorage.setItem('theme', newMode);
    updateThemeIcon();
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    updateThemeIcon(); 
}


document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });

            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});


const contactForm = document.getElementById("contact-form");
if (contactForm) {
    if (!contactForm.getAttribute('action') || contactForm.getAttribute('action') === "https://formspree.io/f/your_form_id") {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Message sent! Thanks for reaching out. (Simulation successful)");
            this.reset();
        });
    }
}


const setActiveLinkOnScroll = () => {
    const headerHeight = header ? header.offsetHeight : 75;
    let currentId = '';

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        
        if (rect.top <= headerHeight) {
            currentId = section.getAttribute('id');
            break;
        }
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
        }
    });
};


const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});


window.addEventListener("scroll", setActiveLinkOnScroll);

window.addEventListener("load", () => {
    setActiveLinkOnScroll();
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.9) {
            section.classList.add('visible');
        }
    });
});


document.getElementById("reviewForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you for your feedback!");
  this.reset();
});
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  counter.innerText = '0';
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;
    const increment = target / 150;
    if (current < target) {
      counter.innerText = `${Math.ceil(current + increment)}`;
      setTimeout(updateCounter, 40);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
});
const toggle = document.querySelector('.theme-toggle');
const icon = document.querySelector('#theme-icon');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  icon.classList.toggle('fa-sun');
  icon.classList.toggle('fa-moon');
});

// ==========================
// CONTACT FORM - WHATSAPP & GMAIL
// ==========================

document.getElementById("send-whatsapp").addEventListener("click", sendWhatsApp);
document.getElementById("send-gmail").addEventListener("click", sendGmail);

function getFormData() {
  return {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim()
  };
}

function sendWhatsApp() {
  const { name, email, message } = getFormData();
  if (!name || !email || !message) {
    alert("Please fill in all fields before sending.");
    return;
  }

  const phone = "254795077967"; // ✅ Your WhatsApp number
  const text = `Hello! My name is ${name}.%0AEmail: ${email}%0A%0A${message}`;
  const url = `https://wa.me/${phone}?text=${text}`;
  window.open(url, "_blank");
}

function sendGmail() {
  const { name, email, message } = getFormData();
  if (!name || !email || !message) {
    alert("Please fill in all fields before sending.");
    return;
  }

  const mailTo = "jemohmutuku@gmail.com"; // ✅ Your Gmail
  const subject = `Message from ${name}`;
  const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${mailTo}&su=${subject}&body=${body}`;
  window.open(url, "_blank");
}

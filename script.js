// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Typing Effect for Tagline
const roles = ["MERN Stack Developer", "Frontend Developer", "Web Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// Fetch Latest Public Repos from GitHub (ajoysushil18)
async function loadGitHubRepos() {
  const container = document.getElementById('projectsContainer');
  try {
    const response = await fetch('https://api.github.com/users/ajoysushil18/repos?sort=updated&per_page=3');
    if (!response.ok) return;
    
    const repos = await response.json();
    repos.forEach(repo => {
      if (repo.fork) return;
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div>
          <div class="project-header">
            <i class="fab fa-github folder-icon"></i>
            <div class="project-links">
              <a href="${repo.html_url}" target="_blank" title="Source Code"><i class="fas fa-external-link-alt"></i></a>
            </div>
          </div>
          <h3>${repo.name.replace(/-/g, ' ')}</h3>
          <p>${repo.description || 'Web development project repository hosted on GitHub.'}</p>
        </div>
        <div class="tech-tags">
          <span>${repo.language || 'Web'}</span>
          <span>GitHub Repo</span>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.log('GitHub repos loaded from static fallback.');
  }
}

loadGitHubRepos();

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('senderName').value;
  const email = document.getElementById('senderEmail').value;
  const message = document.getElementById('senderMessage').value;

  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  
  window.location.href = `mailto:ajoysushil.dev@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent = "Opening your email client to send the message...";
  contactForm.reset();
});
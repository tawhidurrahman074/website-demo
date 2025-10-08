document.addEventListener('DOMContentLoaded', () => {
  // 1. Animate Hero Section on Page Load
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.classList.add('show'); // CSS should define initial + show states
  }

  // 2. Show/Hide Booking Form
  const bookingToggleBtn = document.querySelector('#booking-toggle-btn'); // Button to toggle booking form
  const bookingForm = document.querySelector('#booking-form');
  if (bookingToggleBtn && bookingForm) {
    bookingToggleBtn.addEventListener('click', () => {
      bookingForm.classList.toggle('visible'); // Add CSS to show/hide with this class
    });
  }

  // 3. Validate Booking Form Fields
  const form = document.querySelector('#booking-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[name="email"]').value.trim();
      const phone = form.querySelector('input[name="phone"]').value.trim();
      const name = form.querySelector('input[name="fullname"]').value.trim();
      const eventType = form.querySelector('select[name="eventtype"]').value;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\d\s+\-()]{7,15}$/;

      let errors = [];

      if (!name) errors.push('Full Name is required.');
      if (!email || !emailRegex.test(email)) errors.push('Valid Email is required.');
      if (!phone || !phoneRegex.test(phone)) errors.push('Valid Phone number is required.');
      if (!eventType) errors.push('Please select an Event Type.');

      if (errors.length) {
        alert(errors.join('\n'));
        return;
      }

      // If valid, you can submit form data here or show success message
      alert('Booking submitted successfully!');
      form.reset();
    });
  }

  // 4. Smooth Scrolling for Nav Links
  document.querySelectorAll('nav ul li a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 5. Toggle Mobile Menu Visibility
  const menuToggleBtn = document.querySelector('#menu-toggle-btn');
  const navMenu = document.querySelector('nav ul');
  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active'); // CSS to show/hide nav on mobile
    });
  }

  // 6. Load Testimonials Dynamically
  const testimonialsContainer = document.querySelector('#testimonials .testimonials-cards');
  if (testimonialsContainer) {
    const testimonialsData = [
      {
        name: "Jane Doe",
        message: "Amazing service, made our wedding unforgettable!",
        rating: 5
      },
      {
        name: "John Smith",
        message: "Professional and creative team. Highly recommend!",
        rating: 4
      },
      {
        name: "Emily Davis",
        message: "Handled everything perfectly for our corporate event.",
        rating: 5
      }
    ];

    testimonialsData.forEach(({name, message, rating}) => {
      const card = document.createElement('div');
      card.className = 'card';

      // Create stars
      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        starsHtml += `<i class="fas fa-star${i <= rating ? '' : '-half-alt'}"></i>`;
      }

      card.innerHTML = `
        <p>"${message}"</p>
        <div class="stars">${starsHtml}</div>
        <h4>- ${name}</h4>
      `;
      testimonialsContainer.appendChild(card);
    });
  }

  // 7. Fade-in Animations on Scroll
  const faders = document.querySelectorAll('.fade-in, .fade-in-up');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // 8. Chatbot Button Interaction
  const chatbotBtn = document.querySelector('.chatbot');
  const chatbotWindow = document.querySelector('#chatbot-window'); // Assuming you have one

  if (chatbotBtn && chatbotWindow) {
    chatbotBtn.addEventListener('click', () => {
      chatbotWindow.classList.toggle('visible'); // CSS for show/hide chatbot window
    });
  }
});



document.addEventListener('DOMContentLoaded', () => {
  // Animate hero fade-in on page load
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    setTimeout(() => {
      heroContent.classList.add('visible');
    }, 100); // slight delay for smooth effect
  }

  // Smooth scrolling for nav links
  document.querySelectorAll('nav ul li a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbzLtV-oV-nJqMpn51Mn_uk-dcljBPvTllLM4WfXc6b1uj-3cKMxW7wwGbS_melAGXmI/execE';


document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  const formData = {
    name: e.target[0].value,
    email: e.target[1].value,
    event: e.target[2].value,
    date: e.target[3].value,
    details: e.target[4].value
  };
  fetch(scriptURL, { method: 'POST', body: JSON.stringify(formData) })
    .then(res => alert("Booking successful!"))
    .catch(err => alert("Error: " + err.message));
});



const API_KEY = "YOUR_OPENAI_API_KEY";

async function sendMessage() {
  const input = document.getElementById("user-input").value;
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div class="user-msg">${input}</div>`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    }),
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  chatBox.innerHTML += `<div class="bot-msg">${reply}</div>`;
  document.getElementById("user-input").value = "";
}


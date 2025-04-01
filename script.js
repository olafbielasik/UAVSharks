document.addEventListener("DOMContentLoaded", function() {
  const searchBtn = document.querySelector('#search-btn');
  const cartBtn = document.querySelector('#cart-btn');
  const menuBtn = document.querySelector('#menu-btn');
  const accountBtn = document.querySelector('#account-btn');
  const searchForm = document.querySelector('.search-form');
  const cartItemsContainer = document.querySelector('.cart-items-container');
  const navbar = document.querySelector('.navbar');
  const addToCartButtons = document.querySelectorAll('.items .box .btn');
  const cartCount = document.querySelector('.cart-count');
  const searchBox = document.querySelector('#search-box');
  const items = document.querySelectorAll('.items .box');
  const faqQuestions = document.querySelectorAll('.faq .box h3');
  const newsletterForm = document.querySelector('.newsletter-form');
  const backToTop = document.querySelector('#back-to-top');
  const registerForm = document.querySelector('.register-form');
  const loginForm = document.querySelector('.login-form');
  const userInfo = document.querySelector('#user-info');
  let itemCount = 0;
  let loggedInUser = null;

  searchBtn.addEventListener('click', () => {
      searchForm.classList.toggle('active');
      cartItemsContainer.classList.remove('active');
      navbar.classList.remove('active');
      userInfo.classList.remove('active');
  });

  cartBtn.addEventListener('click', () => {
      cartItemsContainer.classList.toggle('active');
      searchForm.classList.remove('active');
      navbar.classList.remove('active');
      userInfo.classList.remove('active');
  });

  menuBtn.addEventListener('click', () => {
      navbar.classList.toggle('active');
      searchForm.classList.remove('active');
      cartItemsContainer.classList.remove('active');
      userInfo.classList.remove('active');
  });

  accountBtn.addEventListener('click', () => {
      userInfo.classList.toggle('active');
      searchForm.classList.remove('active');
      cartItemsContainer.classList.remove('active');
      navbar.classList.remove('active');
      if (loggedInUser) {
          userInfo.innerHTML = `Welcome, ${loggedInUser.username}! <a href="#" id="logout">Logout</a>`;
          document.querySelector('#logout').addEventListener('click', (e) => {
              e.preventDefault();
              loggedInUser = null;
              userInfo.innerHTML = '';
              alert('Logged out successfully!');
          });
      } else {
          userInfo.innerHTML = 'Please log in or register.';
      }
  });

  window.addEventListener('scroll', () => {
      searchForm.classList.remove('active');
      cartItemsContainer.classList.remove('active');
      navbar.classList.remove('active');
      userInfo.classList.remove('active');
      if (window.scrollY > 300) {
          backToTop.classList.add('active');
      } else {
          backToTop.classList.remove('active');
      }
  });

  addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
          e.preventDefault();
          const itemBox = button.closest('.box');
          const itemName = itemBox.querySelector('h3').textContent;
          const itemPrice = itemBox.querySelector('.price').textContent.split(' ')[0];
          const itemImage = itemBox.querySelector('img').src;
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML = `
              <span class="fas fa-times"></span>
              <img src="${itemImage}" alt="">
              <div class="content">
                  <h3>${itemName}</h3>
                  <div class="price">${itemPrice}</div>
              </div>
          `;
          cartItemsContainer.insertBefore(cartItem, cartItemsContainer.querySelector('.btn'));
          itemCount++;
          cartCount.textContent = itemCount;
          cartBtn.classList.add('shake');
          setTimeout(() => cartBtn.classList.remove('shake'), 500);
          const removeButton = cartItem.querySelector('.fa-times');
          removeButton.addEventListener('click', () => {
              cartItem.remove();
              itemCount--;
              cartCount.textContent = itemCount;
          });
      });
  });

  searchBox.addEventListener('input', () => {
      const searchTerm = searchBox.value.toLowerCase();
      items.forEach(item => {
          const itemName = item.querySelector('h3').textContent.toLowerCase();
          if (itemName.includes(searchTerm)) {
              item.classList.remove('hidden');
          } else {
              item.classList.add('hidden');
          }
      });
  });

  faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
          const box = question.closest('.box');
          box.classList.toggle('active');
      });
  });

  newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#newsletter-email').value;
      if (email.includes('@') && email.includes('.')) {
          alert('Thank you for subscribing!');
          newsletterForm.reset();
      } else {
          alert('Please enter a valid email address.');
      }
  });

  registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.querySelector('#reg-username').value;
      const email = document.querySelector('#reg-email').value;
      const password = document.querySelector('#reg-password').value;
      if (username && email.includes('@') && email.includes('.') && password.length >= 6) {
          loggedInUser = { username, email };
          alert('Account created successfully! You are now logged in.');
          userInfo.innerHTML = `Welcome, ${username}! <a href="#" id="logout">Logout</a>`;
          registerForm.reset();
          document.querySelector('#logout').addEventListener('click', (e) => {
              e.preventDefault();
              loggedInUser = null;
              userInfo.innerHTML = '';
              alert('Logged out successfully!');
          });
      } else {
          alert('Please fill all fields correctly (password must be at least 6 characters).');
      }
  });

  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.querySelector('#login-username').value;
      const password = document.querySelector('#login-password').value;
      if (username && password.length >= 6) {
          loggedInUser = { username };
          alert('Logged in successfully!');
          userInfo.innerHTML = `Welcome, ${username}! <a href="#" id="logout">Logout</a>`;
          loginForm.reset();
          document.querySelector('#logout').addEventListener('click', (e) => {
              e.preventDefault();
              loggedInUser = null;
              userInfo.innerHTML = '';
              alert('Logged out successfully!');
          });
      } else {
          alert('Invalid username or password (password must be at least 6 characters).');
      }
  });

  backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

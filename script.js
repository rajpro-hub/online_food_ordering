// Global variables and utilities
const API_BASE = ''; // Would be your backend API URL
let currentUser = null;
let cart = [];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check for logged in user
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Initialize all functionality
    initializeNavigation();
    initializeCart();
    initializeSearch();
    initializeUserSession();
    initializeRestaurantCards();
    initializeCategoryCards();
    initializeInteractiveElements();
    initializeFormHandlers();
    
    // Update UI based on current state
    updateCartCount();
    updateUserUI();
}

// Navigation functionality
function initializeNavigation() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') && !this.getAttribute('href').startsWith('#')) {
                // Let default navigation work
                return;
            }
            e.preventDefault();
            
            const target = this.getAttribute('href');
            if (target && target !== '#') {
                window.location.href = target;
            }
        });
    });
    
    // Logo click to home
    const logos = document.querySelectorAll('.logo-text');
    logos.forEach(logo => {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    });
}

// Cart functionality
function initializeCart() {
    // Update cart count display
    updateCartCount();
    
    // Add to cart functionality for restaurant cards
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    restaurantCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const restaurantId = index + 1; // Simple ID assignment
            window.location.href = `resturant.html?id=${restaurantId}`;
        });
    });
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function addToCart(restaurantId, restaurantName, itemId, itemName, itemPrice, itemImage) {
    const existingItem = cart.find(item => 
        item.restaurantId === restaurantId && item.itemId === itemId
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            restaurantId,
            restaurantName,
            itemId,
            itemName,
            itemPrice,
            itemImage,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success animation
    showToast(`${itemName} added to cart!`);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.itemId !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartItemQuantity(itemId, change) {
    const item = cart.find(item => item.itemId === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    }
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-input input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterRestaurants(searchTerm);
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase();
                filterRestaurants(searchTerm);
            }
        });
    });
}

function filterRestaurants(searchTerm) {
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    restaurantCards.forEach(card => {
        const name = card.querySelector('.restaurant-name')?.textContent.toLowerCase() || '';
        const cuisine = card.querySelector('.restaurant-cuisine')?.textContent.toLowerCase() || '';
        
        if (name.includes(searchTerm) || cuisine.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// User session management
function initializeUserSession() {
    // Check login status
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    
    if (currentUser) {
        // User is logged in
        if (loginBtn) loginBtn.textContent = 'Profile';
        if (signupBtn) {
            signupBtn.textContent = 'Logout';
            signupBtn.addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
        }
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    window.location.reload();
}

function updateUserUI() {
    // Update UI based on login status
    const userGreeting = document.querySelector('.user-greeting');
    if (currentUser && userGreeting) {
        userGreeting.textContent = `Welcome, ${currentUser.name}`;
    }
}

// Restaurant cards functionality
function initializeRestaurantCards() {
    // Sample restaurant data
    const restaurants = [
        {
            id: 1,
            name: "Burger King",
            cuisine: "Burgers, American, Fast Food",
            rating: 4.2,
            deliveryTime: "30-40 mins",
            price: "₹200 for one",
            image: "image/burgerking_store.png"
        },
        {
            id: 2,
            name: "Domino's Pizza",
            cuisine: "Pizza, Italian, Fast Food",
            rating: 4.0,
            deliveryTime: "25-35 mins",
            price: "₹150 for one",
            image: "image/domino_store.jpg"
        },
        {
            id: 3,
            name: "Paradise Biryani",
            cuisine: "Biryani, Hyderabadi, Indian",
            rating: 4.5,
            deliveryTime: "35-45 mins",
            price: "₹250 for one",
            image: "image/paradisebriyani_store.jpg"
        },
        {
            id: 4,
            name: "KFC",
            cuisine: "Fried Chicken, American, Fast Food",
            rating: 4.1,
            deliveryTime: "20-30 mins",
            price: "₹180 for one",
            image: "image/kfc_store.jpg"
        },
        {
            id: 5,
            name: "Haldiram's",
            cuisine: "North Indian, Sweets, Snacks",
            rating: 4.3,
            deliveryTime: "25-35 mins",
            price: "₹200 for one",
            image: "image/haldiram_store.webp"
        },
        {
            id: 6,
            name: "McDonald's",
            cuisine: "Burgers, American, Fast Food",
            rating: 4.0,
            deliveryTime: "20-30 mins",
            price: "₹150 for one",
            image: "image/mcdonald_store.jpg"
        }
    ];
    
    // Populate restaurant listings
    const restaurantContainer = document.querySelector('.restaurant-container');
    if (restaurantContainer) {
        restaurantContainer.innerHTML = '';
        
        restaurants.forEach(restaurant => {
            const restaurantCard = createRestaurantCard(restaurant);
            restaurantContainer.appendChild(restaurantCard);
        });
    }
}

function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.setAttribute('data-restaurant-id', restaurant.id);
    
    card.innerHTML = `
        <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
        <div class="restaurant-info">
            <h3 class="restaurant-name">${restaurant.name}</h3>
            <p class="restaurant-cuisine">${restaurant.cuisine}</p>
            <div class="restaurant-details">
                <div class="restaurant-rating">
                    <i class="fas fa-star"></i>
                    ${restaurant.rating}
                </div>
                <div class="restaurant-delivery">${restaurant.deliveryTime}</div>
                <div class="restaurant-price">${restaurant.price}</div>
            </div>
        </div>
    `;
    
    // Add click handler
    card.addEventListener('click', function() {
        window.location.href = `resturant.html?id=${restaurant.id}`;
    });
    
    return card;
}

// Category cards functionality
function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const category = this.querySelector('p')?.textContent;
            if (category) {
                filterByCategory(category);
            }
        });
    });
}

function filterByCategory(category) {
    // Filter restaurants by category
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    restaurantCards.forEach(card => {
        const cuisine = card.querySelector('.restaurant-cuisine')?.textContent.toLowerCase() || '';
        if (cuisine.toLowerCase().includes(category.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    showToast(`Filtered by: ${category}`);
}

// Interactive elements
function initializeInteractiveElements() {
    // Add hover effects
    const interactiveElements = document.querySelectorAll('.restaurant-card, .category-card, .collection-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animations
    const buttons = document.querySelectorAll('button, .add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Form handlers
function initializeFormHandlers() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Cart checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    // Check against stored users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => (u.email === email || u.phone === email) && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showToast('Login successful!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showToast('Invalid credentials', 'error');
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!name || !email || !phone || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.email === email || u.phone === phone);
    
    if (userExists) {
        showToast('User already exists', 'error');
        return;
    }
    
    // Create new user
    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    showToast('Account created successfully!');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function handleCheckout() {
    if (!currentUser) {
        showToast('Please login to checkout', 'error');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=cart';
        }, 1000);
        return;
    }
    
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    // Process checkout
    showToast('Order placed successfully!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Utility functions
function showToast(message, type = 'success') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Style the toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        background: ${type === 'success' ? '#48c479' : '#ff7e8b'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Export functions for use in other files
window.FoodExpress = {
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    showToast,
    logout
};

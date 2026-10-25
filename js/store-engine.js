// store-engine.js — Stackly Multiverse Multi-Purpose E-Commerce & Interactive Animation Engine
'use strict';

const STACKLY_PRODUCTS = [
  // ── ELECTRONICS & TECH ──
  {
    id: "p-laptop-1",
    name: "UltraBook Pro X1 M3 Chip 16GB",
    brand: "Apple",
    category: "Laptops",
    department: "electronics",
    price: 89999,
    originalPrice: 119999,
    discount: "-25%",
    badge: "🔥 HOT",
    rating: 4.9,
    reviews: 2140,
    image: "images/product-laptop.webp",
    specs: ["Apple M3 10-Core", "16GB Unified RAM", "512GB NVMe SSD", "14.2 Liquid Retina XDR", "18-hr Battery"],
    description: "Engineered for intense workflows, creative software, and machine learning tasks with Liquid Retina XDR display."
  },
  {
    id: "p-phone-1",
    name: "Galaxy X20 Ultra 5G 256GB",
    brand: "Samsung",
    category: "Smartphones",
    department: "electronics",
    price: 74999,
    originalPrice: 89999,
    discount: "-17%",
    badge: "✨ NEW",
    rating: 4.8,
    reviews: 3410,
    image: "images/product-smartphone.webp",
    specs: ["Snapdragon 8 Gen 3", "12GB LPDDR5X", "200MP Quad Camera", "6.8 Dynamic AMOLED 2X", "5000mAh Battery"],
    description: "The ultimate flagship Android experience with pro-grade zoom cameras, titanium frame, and Galaxy AI."
  },
  {
    id: "p-audio-1",
    name: "AuraSound Pro Wireless ANC Headphones",
    brand: "Sony",
    category: "Audio",
    department: "electronics",
    price: 24999,
    originalPrice: 41990,
    discount: "-40%",
    badge: "-40% OFF",
    rating: 4.7,
    reviews: 1820,
    image: "images/product-headphones.webp",
    specs: ["Industry-Leading ANC", "LDAC Hi-Res Audio", "30-hr Battery Life", "Multipoint Bluetooth 5.3", "Speak-to-Chat"],
    description: "Immerse yourself in acoustic clarity. Dual noise sensor microphones and tailored spatial audio drivers."
  },
  {
    id: "p-watch-1",
    name: "ProWatch Ultra GPS Titanium",
    brand: "Garmin",
    category: "Wearables",
    department: "electronics",
    price: 49999,
    originalPrice: 64999,
    discount: "-23%",
    badge: "⭐ BEST",
    rating: 4.9,
    reviews: 890,
    image: "images/product-smartwatch.webp",
    specs: ["Grade 5 Titanium Case", "Dual-Frequency GPS", "ECG & SpO2 Monitor", "100m Water Resistance", "14-day Battery"],
    description: "Built for elite explorers and fitness enthusiasts. Rugged sapphire glass with aerospace titanium housing."
  },
  {
    id: "p-deal-1",
    name: "IdeaPad Gaming 5i RTX 4060",
    brand: "Lenovo",
    category: "Laptops",
    department: "electronics",
    price: 62999,
    originalPrice: 125999,
    discount: "-50%",
    badge: "⚡ 50% OFF",
    rating: 4.8,
    reviews: 980,
    image: "images/product-laptop.webp",
    specs: ["Intel Core i7-13620H", "NVIDIA RTX 4060 8GB", "16GB DDR5 RAM", "15.6 144Hz IPS", "Coldfront 5.0 Cooling"],
    description: "Dominating performance for AAA gaming titles and 4K video editing with whisper-quiet thermal architecture."
  },
  {
    id: "p-deal-2",
    name: "OnePlus 13 Pro 5G 512GB",
    brand: "OnePlus",
    category: "Smartphones",
    department: "electronics",
    price: 51999,
    originalPrice: 79999,
    discount: "-35%",
    badge: "⚡ 35% OFF",
    rating: 4.8,
    reviews: 1450,
    image: "images/product-smartphone.webp",
    specs: ["Snapdragon 8 Gen 3", "16GB RAM", "100W SUPERVOOC", "Hasselblad Optics", "Cryo-velocity VC"],
    description: "Hyper-fast smooth performance, ceramic-glass unibody, Hasselblad color tuning, and charging in 22 minutes."
  },

  // ── FRESH GROCERY & SUPERMARKET ──
  {
    id: "p-groc-1",
    name: "Washington Red Gala Crisp Apples (1 kg)",
    brand: "Organic Orchard",
    category: "Fresh Produce",
    department: "grocery",
    price: 199,
    originalPrice: 280,
    discount: "-29%",
    badge: "🍏 ORGANIC",
    rating: 4.9,
    reviews: 1240,
    image: "images/product-apples.webp",
    specs: ["100% Certified Organic", "Farm Picked Within 24h", "Crisp & Sweet Profile", "Rich in Dietary Fiber"],
    description: "Crisp, sweet, and handpicked Washington Red Apples directly sourced from sustainable organic orchards."
  },
  {
    id: "p-groc-2",
    name: "Amul Pasteurised Fresh Whole Pure Milk (1L)",
    brand: "Amul",
    category: "Dairy & Chilled",
    department: "grocery",
    price: 68,
    originalPrice: 78,
    discount: "-12%",
    badge: "🥛 ESSENTIAL",
    rating: 4.9,
    reviews: 3820,
    image: "images/product-milk.webp",
    specs: ["Standardized Whole Milk", "Rich in Natural Calcium", "Cold-Chain Preserved", "Tamper-Evident Pack"],
    description: "Pure, wholesome pasteurised standardized milk rich in calcium and natural proteins for daily balance."
  },
  {
    id: "p-groc-3",
    name: "Fortune Premium Cold-Pressed Sunflower Oil (1L)",
    brand: "Fortune",
    category: "Pantry Staples",
    department: "grocery",
    price: 145,
    originalPrice: 190,
    discount: "-24%",
    badge: "❤️ HEART CARE",
    rating: 4.8,
    reviews: 950,
    image: "images/product-sunfloweroil.webp",
    specs: ["Enriched with Vitamins A & D", "Light Non-Greasy Formula", "Triple Filtered", "High Smoke Point"],
    description: "Refined sunflower oil enriched with Vitamins A and D. Lightweight formula designed for crisp everyday cooking."
  },
  {
    id: "p-groc-4",
    name: "India Gate 2-Year Aged Super Basmati Rice (5kg)",
    brand: "India Gate",
    category: "Pantry Staples",
    department: "grocery",
    price: 549,
    originalPrice: 799,
    discount: "-31%",
    badge: "👑 AGED 2 YRS",
    rating: 4.9,
    reviews: 2150,
    image: "images/product-basmatirice.webp",
    specs: ["Extra-Long Slender Grains", "Aged 24 Months", "Aromatic Pearl White", "Non-Sticky Cooked Texture"],
    description: "Exquisite long-grain aromatic basmati rice aged to perfection. The ultimate choice for authentic biryanis."
  },
  {
    id: "p-groc-5",
    name: "Raw Wildflower Himalayan Mountain Honey (500g)",
    brand: "Pure Hive",
    category: "Organic Sweeteners",
    department: "grocery",
    price: 380,
    originalPrice: 520,
    discount: "-27%",
    badge: "🍯 UNFILTERED",
    rating: 4.9,
    reviews: 1420,
    image: "images/product-honey.webp",
    specs: ["100% Raw & Unheated", "High Altitude Wildflower Nectar", "Natural Antioxidants", "Zero Added Sugar"],
    description: "Pure, unheated, unfiltered raw honey straight from sustainable alpine bee sanctuaries in the Himalayas."
  },
  {
    id: "p-groc-6",
    name: "Cold-Pressed Extra Virgin Olive Oil (750ml)",
    brand: "San Giuliano",
    category: "Gourmet Oils",
    department: "grocery",
    price: 890,
    originalPrice: 1250,
    discount: "-28%",
    badge: "🌿 FIRST PRESS",
    rating: 4.8,
    reviews: 860,
    image: "images/product-oliveoil.webp",
    specs: ["First Cold Extraction <27°C", "Ultra-Low Acidity <0.3%", "UV Dark Glass Bottle", "Polyphenol Rich"],
    description: "First cold-pressed from Mediterranean hand-picked olives. Packed with polyphenol antioxidants and flavor."
  },

  // ── FASHION & LIFESTYLE ──
  {
    id: "p-fash-1",
    name: "AeroTech Water-Resistant Storm Jacket",
    brand: "North Peak",
    category: "Outerwear",
    department: "fashion",
    price: 3499,
    originalPrice: 5999,
    discount: "-42%",
    badge: "🧥 TRENDING",
    rating: 4.8,
    reviews: 620,
    image: "images/product-jacket.webp",
    specs: ["Ripstop DWR Fabric", "Thermal Fleece Lining", "YKK Waterproof Zippers", "Reflective 3M Accents"],
    description: "Designed for all-weather urban utility. Breathable yet impervious to torrential rains and freezing winds."
  },
  {
    id: "p-fash-2",
    name: "CloudMotion Pro Performance Running Sneakers",
    brand: "AeroStep",
    category: "Footwear",
    department: "fashion",
    price: 4299,
    originalPrice: 6999,
    discount: "-38%",
    badge: "👟 RUNNER CHOICE",
    rating: 4.9,
    reviews: 940,
    image: "images/product-sneakers.webp",
    specs: ["Responsive EVA Foam Midsole", "Engineered Knit Mesh Upper", "Carbon Fiber Energy Plate", "High Traction Grip"],
    description: "Featherlight endurance shoes featuring responsive cushioning and energy return for marathoners and sprinters."
  },

  // ── HOME & KITCHEN ──
  {
    id: "p-home-1",
    name: "DualZone Smart Digital Air Fryer (8.5L)",
    brand: "KitchenPro",
    category: "Kitchen Appliances",
    department: "home",
    price: 7999,
    originalPrice: 13999,
    discount: "-43%",
    badge: "🍳 CHEF EDITION",
    rating: 4.9,
    reviews: 1120,
    image: "images/product-airfryer.webp",
    specs: ["Dual Independent Baskets", "360° Rapid Vortex Airflow", "12 One-Touch Smart Presets", "Non-Stick Dishwasher Safe"],
    description: "Cook two separate meals simultaneously at different temperatures. 90% less oil with crisp golden results."
  },
  {
    id: "p-home-2",
    name: "AeroPure HEPA-13 Smart Air Purifier & Ionizer",
    brand: "PureLife",
    category: "Home Comfort",
    department: "home",
    price: 11499,
    originalPrice: 18999,
    discount: "-39%",
    badge: "🍃 CLEAN AIR",
    rating: 4.8,
    reviews: 780,
    image: "images/product-airpurifier.webp",
    specs: ["True Medical H13 HEPA Filter", "Cleans 500 sq ft in 12 mins", "Real-Time PM2.5 LED Display", "Whisper Quiet 22dB Sleep Mode"],
    description: "Captures 99.97% of airborne pollen, smoke, bacteria, and allergens with intelligent smartphone controls."
  },

  // ── BEAUTY & WELLNESS ──
  {
    id: "p-beauty-1",
    name: "Hyaluronic Acid 2% + B5 Hydration Serum (50ml)",
    brand: "DermaGlow",
    category: "Skincare",
    department: "beauty",
    price: 649,
    originalPrice: 999,
    discount: "-35%",
    badge: "✨ RADIANCE",
    rating: 4.9,
    reviews: 1890,
    image: "images/product-serum.webp",
    specs: ["Multi-Molecular Hyaluronic Acid", "Pro-Vitamin B5 Healing", "Fragrance-Free & Vegan", "Instant Glass-Skin Finish"],
    description: "Ultra-hydrating serum formulated to penetrate deep cellular layers, smoothing fine lines and plumping the skin."
  },

  // ── SPORTS & FITNESS ──
  {
    id: "p-sport-1",
    name: "QuickSelect Adjustable Dumbbell Set (20kg)",
    brand: "FlexGear",
    category: "Fitness Gear",
    department: "sports",
    price: 6999,
    originalPrice: 11999,
    discount: "-41%",
    badge: "🏋️ HOME GYM",
    rating: 4.8,
    reviews: 650,
    image: "images/product-dumbbell.webp",
    specs: ["Quick Dial Weight Switch 2-20kg", "Laser-Cut Cast Iron Plates", "Anti-Slip Contoured Grip", "Compact Storage Tray"],
    description: "Replaces 10 pairs of individual dumbbells with a single turn of the dial. Engineered for home strength training."
  }
];

window.StacklyStore = {
  cart: [],
  wishlist: [],
  appliedCoupon: null,

  init() {
    this.loadState();
    this.injectUI();
    this.updateBadges();
    this.bindEvents();
    this.initLiveActivityStream();
    this.initReadingProgressBar();
  },

  loadState() {
    try {
      this.cart = JSON.parse(localStorage.getItem('stackly_cart')) || [
        { id: "p-laptop-1", name: "UltraBook Pro X1 M3 Chip 16GB", price: 89999, qty: 1, image: "images/product-laptop.webp" }
      ];
      this.wishlist = JSON.parse(localStorage.getItem('stackly_wishlist')) || ["p-phone-1", "p-watch-1"];
      this.appliedCoupon = JSON.parse(localStorage.getItem('stackly_coupon')) || null;
    } catch (e) {
      this.cart = [];
      this.wishlist = [];
    }
  },

  saveState() {
    try {
      localStorage.setItem('stackly_cart', JSON.stringify(this.cart));
      localStorage.setItem('stackly_wishlist', JSON.stringify(this.wishlist));
      localStorage.setItem('stackly_coupon', JSON.stringify(this.appliedCoupon));
    } catch (e) {}
    this.updateBadges();
  },

  updateBadges() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-badge-count').forEach(el => {
      el.textContent = totalItems;
      el.style.display = totalItems > 0 ? 'flex' : 'none';
    });

    const wishlistCount = this.wishlist.length;
    document.querySelectorAll('.wishlist-badge-count').forEach(el => {
      el.textContent = wishlistCount;
      el.style.display = wishlistCount > 0 ? 'flex' : 'none';
    });
  },

  formatPrice(num) {
    return '₹' + Number(num).toLocaleString('en-IN');
  },

  addToCart(productId, qty = 1, btnEl = null) {
    const product = STACKLY_PRODUCTS.find(p => p.id === productId);
    if (!product) {
      if (window.showToast) window.showToast("Product added to your cart! 🛒", "success");
      return;
    }
    const existing = this.cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: qty
      });
    }
    this.saveState();
    this.renderCart();

    // Trigger cart bounce animation on nav cart
    document.querySelectorAll('.trigger-cart, .cart-badge-count').forEach(el => {
      el.classList.remove('cart-bounce');
      void el.offsetWidth;
      el.classList.add('cart-bounce');
      setTimeout(() => el.classList.remove('cart-bounce'), 700);
    });

    // Animate clicked button if provided
    if (btnEl) {
      const orig = btnEl.innerHTML;
      btnEl.innerHTML = '<span>Added! ✓</span>';
      btnEl.style.background = '#10B981';
      btnEl.style.borderColor = '#10B981';
      setTimeout(() => {
        btnEl.innerHTML = orig;
        btnEl.style.background = '';
        btnEl.style.borderColor = '';
      }, 1200);
    }

    if (window.showToast) {
      window.showToast(`Added ${product.name.slice(0, 22)}... to cart! 🛒`, "success");
    }
  },

  filterByDepartment(department, btnEl = null) {
    const container = document.getElementById('featured-products-grid');
    if (!container) return;

    if (btnEl) {
      document.querySelectorAll('.dept-pill').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }

    const matches = department === 'all' 
      ? STACKLY_PRODUCTS 
      : STACKLY_PRODUCTS.filter(p => p.department === department);

    container.innerHTML = matches.map((p, idx) => `
      <div class="product-card tilt-card shimmer-card reveal" style="animation: fadeInUp 0.4s ease ${idx * 0.04}s forwards; opacity: 0;">
        <div class="product-card__image-wrap">
          <img src="${p.image}" alt="${p.name}" class="product-card__image" loading="lazy" />
          <span class="product-card__badge" style="background:${p.badge.includes('HOT')||p.badge.includes('60')||p.badge.includes('50')?'#FF1361':p.badge.includes('ORGANIC')||p.badge.includes('CLEAN')?'#10B981':'#0284C7'}">${p.badge}</span>
          <button class="product-card__fav trigger-wishlist" onclick="event.stopPropagation(); StacklyStore.toggleWishlist('${p.id}')" aria-label="Add to Wishlist">
            ${StacklyStore.wishlist.includes(p.id) ? '❤️' : '🤍'}
          </button>
          <div class="product-card__overlay">
            <button class="btn btn-secondary btn-sm" onclick="StacklyStore.openQuickView('${p.id}')">Quick View</button>
          </div>
        </div>
        <div class="product-card__body">
          <div class="product-card__category" style="display:flex;justify-content:space-between">
            <span>${p.category}</span>
            <span style="font-size:0.75rem;color:#10b981;font-weight:700">★ ${p.rating}</span>
          </div>
          <h3 class="product-card__name" onclick="StacklyStore.openQuickView('${p.id}')" style="cursor:pointer">${p.name}</h3>
          <div class="product-card__rating">
            <span style="color:#FBBF24">★★★★★</span>
            <span class="product-card__reviews">(${p.reviews.toLocaleString()} reviews)</span>
          </div>
          <div class="product-card__footer">
            <div class="product-card__pricing">
              <span class="product-card__price">${StacklyStore.formatPrice(p.price)}</span>
              <span class="product-card__original-price">${StacklyStore.formatPrice(p.originalPrice)}</span>
            </div>
            <button class="btn btn-primary btn-sm magnetic" onclick="window.location.href='404.html'">+ Add</button>
          </div>
        </div>
      </div>
    `).join('');
  },

  initLiveActivityStream() {
    if (document.getElementById('live-activity-stream')) return;
    const toast = document.createElement('div');
    toast.id = 'live-activity-stream';
    toast.className = 'live-activity-toast';
    toast.style.display = 'none';
    document.body.appendChild(toast);

    const activities = [
      { user: "Kabir", city: "Mumbai", item: "UltraBook Pro X1 M3 Chip", img: "images/product-laptop.webp", time: "2 mins ago" },
      { user: "Priya", city: "Bengaluru", item: "Organic Raw Mountain Honey 500g", img: "images/product-honey.webp", time: "Just now" },
      { user: "Arjun", city: "Delhi NCR", item: "AuraSound Pro ANC Headphones", img: "images/product-headphones.webp", time: "4 mins ago" },
      { user: "Ananya", city: "Pune", item: "Washington Red Gala Apples (1 kg)", img: "images/product-apples.webp", time: "1 min ago" },
      { user: "Rohan", city: "Hyderabad", item: "ProWatch Ultra Titanium GPS", img: "images/product-smartwatch.webp", time: "6 mins ago" },
      { user: "Sneha", city: "Kolkata", item: "India Gate 2-Yr Aged Basmati 5kg", img: "images/product-basmatirice.webp", time: "3 mins ago" },
      { user: "Vikram", city: "Chennai", item: "Cold-Pressed Extra Virgin Olive Oil", img: "images/product-oliveoil.webp", time: "Just now" },
      { user: "Neha", city: "Ahmedabad", item: "DualZone Smart Digital Air Fryer", img: "images/product-airfryer.webp", time: "5 mins ago" }
    ];

    let actIdx = 0;
    const showNextActivity = () => {
      const act = activities[actIdx];
      actIdx = (actIdx + 1) % activities.length;
      toast.innerHTML = `
        <span class="live-beacon"></span>
        <img src="${act.img}" alt="${act.item}" style="width:38px;height:38px;border-radius:8px;object-fit:cover;flex-shrink:0" />
        <div style="flex:1;min-width:0">
          <div style="font-size:0.75rem;color:var(--white-70);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
            <strong style="color:#fff">${act.user}</strong> in ${act.city} bought
          </div>
          <div style="font-size:0.8rem;font-weight:700;color:var(--cyan-400);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
            ${act.item}
          </div>
          <div style="font-size:0.65rem;color:var(--white-50)">${act.time} · Verified Purchase</div>
        </div>
        <button onclick="document.getElementById('live-activity-stream').style.display='none'" style="background:none;border:none;color:var(--white-40);cursor:pointer;font-size:0.85rem;padding:0 0.2rem">✕</button>
      `;
      toast.style.display = 'flex';
      toast.className = 'live-activity-toast toast-enter';

      setTimeout(() => {
        toast.className = 'live-activity-toast toast-leave';
        setTimeout(() => {
          toast.style.display = 'none';
        }, 400);
      }, 4800);
    };

    setTimeout(() => {
      showNextActivity();
      setInterval(showNextActivity, 14000);
    }, 3500);
  },

  initReadingProgressBar() {
    if (!window.location.pathname.includes('blog.html') && !document.querySelector('.article-card')) return;
    if (document.getElementById('reading-progress-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'reading-progress-bar';
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const progress = h > 0 ? (window.scrollY / h) * 100 : 0;
      bar.style.width = Math.min(progress, 100) + '%';
    });
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveState();
    this.renderCart();
    if (window.showToast) window.showToast("Item removed from cart.", "info");
  },

  updateQty(productId, delta) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.saveState();
    this.renderCart();
  },

  applyCoupon() {
    const input = document.getElementById('coupon-input');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    if (!code) return;

    if (code === 'STACK60') {
      this.appliedCoupon = { code: 'STACK60', discount: 0.60, label: 'Flash 60% OFF' };
      if (window.showToast) window.showToast("Code STACK60 applied! You saved 60%! ⚡", "success");
    } else if (code === 'STACK20') {
      this.appliedCoupon = { code: 'STACK20', discount: 0.20, label: 'VIP 20% OFF' };
      if (window.showToast) window.showToast("Code STACK20 applied! 20% discount granted! 🎉", "success");
    } else if (code === 'WELCOME10') {
      this.appliedCoupon = { code: 'WELCOME10', discount: 0.10, label: 'Welcome 10% OFF' };
      if (window.showToast) window.showToast("Welcome discount applied! 10% off. ✓", "success");
    } else {
      if (window.showToast) window.showToast("Invalid promo code. Try STACK60 or STACK20.", "error");
      return;
    }
    this.saveState();
    this.renderCart();
  },

  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    const product = STACKLY_PRODUCTS.find(p => p.id === productId);
    const title = product ? product.name.slice(0, 20) : "Product";
    if (index > -1) {
      this.wishlist.splice(index, 1);
      if (window.showToast) window.showToast(`Removed ${title} from wishlist.`, "info");
    } else {
      this.wishlist.push(productId);
      if (window.showToast) window.showToast(`Saved ${title} to wishlist! ❤️`, "success");
    }
    this.saveState();
    this.renderWishlist();
  },

  openCart() {
    this.renderCart();
    const overlay = document.getElementById('cyber-overlay');
    const drawer = document.getElementById('cart-drawer');
    if (overlay && drawer) {
      overlay.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeCart() {
    const overlay = document.getElementById('cyber-overlay');
    const drawer = document.getElementById('cart-drawer');
    if (overlay && drawer) {
      overlay.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  openWishlist() {
    this.renderWishlist();
    const overlay = document.getElementById('cyber-overlay');
    const drawer = document.getElementById('wishlist-drawer');
    if (overlay && drawer) {
      overlay.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeWishlist() {
    const overlay = document.getElementById('cyber-overlay');
    const drawer = document.getElementById('wishlist-drawer');
    if (overlay && drawer) {
      overlay.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  closeAllDrawers() {
    this.closeCart();
    this.closeWishlist();
    const modals = document.querySelectorAll('.cyber-modal-wrap');
    modals.forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  },

  renderCart() {
    const body = document.getElementById('cart-drawer-items');
    const footer = document.getElementById('cart-drawer-footer');
    if (!body || !footer) return;

    if (this.cart.length === 0) {
      body.innerHTML = `
        <div class="drawer-empty">
          <div class="drawer-empty-icon">🛒</div>
          <div class="drawer-empty-text">Your cart is empty</div>
          <div class="drawer-empty-sub">Explore the future of tech shopping and add premium gadgets to your bag.</div>
          <button class="btn btn-primary btn-sm magnetic" onclick="StacklyStore.closeCart(); location.href='index.html#featured'">Explore Products</button>
        </div>
      `;
      footer.style.display = 'none';
      return;
    }

    footer.style.display = 'flex';
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discountAmount = this.appliedCoupon ? Math.round(subtotal * this.appliedCoupon.discount) : 0;
    const shippingThreshold = 999;
    const freeShipping = (subtotal - discountAmount) >= shippingThreshold;
    const shipping = freeShipping ? 0 : 99;
    const total = Math.max(0, subtotal - discountAmount + shipping);
    const progressPct = Math.min(100, Math.round(((subtotal - discountAmount) / shippingThreshold) * 100));

    body.innerHTML = this.cart.map(item => `
      <div class="drawer-item">
        <img src="${item.image}" alt="${item.name}" class="drawer-item-img" />
        <div class="drawer-item-info">
          <div class="drawer-item-title">${item.name}</div>
          <div class="drawer-item-price">${this.formatPrice(item.price)}</div>
          <div class="drawer-item-controls">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="StacklyStore.updateQty('${item.id}', -1)">-</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" onclick="StacklyStore.updateQty('${item.id}', 1)">+</button>
            </div>
            <button class="item-remove-btn" onclick="StacklyStore.removeFromCart('${item.id}')" title="Remove">✕</button>
          </div>
        </div>
      </div>
    `).join('');

    footer.innerHTML = `
      <div class="shipping-meter">
        <div class="shipping-meter-text">
          <span>${freeShipping ? '✓ <strong>Free Express Delivery</strong> unlocked!' : `Add ${this.formatPrice(shippingThreshold - subtotal + discountAmount)} more for <strong>Free Delivery</strong>`}</span>
          <span style="color:var(--cyan-400)">${progressPct}%</span>
        </div>
        <div class="shipping-track">
          <div class="shipping-fill" style="width:${progressPct}%"></div>
        </div>
      </div>

      <div class="drawer-coupon-wrap">
        <input type="text" id="coupon-input" class="drawer-coupon-input" placeholder="Promo code (e.g. STACK60)" value="${this.appliedCoupon ? this.appliedCoupon.code : ''}" />
        <button class="btn btn-outline btn-sm" onclick="StacklyStore.applyCoupon()">Apply</button>
      </div>

      <div class="drawer-summary-row">
        <span>Subtotal</span>
        <span>${this.formatPrice(subtotal)}</span>
      </div>
      ${this.appliedCoupon ? `
        <div class="drawer-summary-row" style="color:#10b981">
          <span>Discount (${this.appliedCoupon.label})</span>
          <span>-${this.formatPrice(discountAmount)}</span>
        </div>
      ` : ''}
      <div class="drawer-summary-row">
        <span>Delivery Fee</span>
        <span>${freeShipping ? '<span style="color:#10b981">FREE</span>' : this.formatPrice(shipping)}</span>
      </div>
      <div class="drawer-summary-total">
        <span>Total Amount</span>
        <span style="color:var(--cyan-300)">${this.formatPrice(total)}</span>
      </div>

      <button class="btn btn-primary btn-lg w-full magnetic" style="width:100%" onclick="StacklyStore.openCheckout()">
        Proceed to Checkout ⚡
      </button>
    `;
  },

  renderWishlist() {
    const body = document.getElementById('wishlist-drawer-items');
    if (!body) return;

    if (this.wishlist.length === 0) {
      body.innerHTML = `
        <div class="drawer-empty">
          <div class="drawer-empty-icon">❤️</div>
          <div class="drawer-empty-text">Your wishlist is empty</div>
          <div class="drawer-empty-sub">Keep track of your dream devices by tapping the heart icon on any product.</div>
          <button class="btn btn-primary btn-sm magnetic" onclick="StacklyStore.closeWishlist(); location.href='index.html#featured'">Browse Collection</button>
        </div>
      `;
      return;
    }

    const items = STACKLY_PRODUCTS.filter(p => this.wishlist.includes(p.id));
    body.innerHTML = items.map(item => `
      <div class="drawer-item">
        <img src="${item.image}" alt="${item.name}" class="drawer-item-img" />
        <div class="drawer-item-info">
          <div class="drawer-item-title">${item.name}</div>
          <div class="drawer-item-price">${this.formatPrice(item.price)}</div>
          <div style="display:flex;gap:0.5rem;margin-top:0.4rem">
            <button class="btn btn-primary btn-sm" style="padding:0.3rem 0.75rem;font-size:0.75rem" onclick="StacklyStore.addToCart('${item.id}'); StacklyStore.toggleWishlist('${item.id}')">
              Move to Cart 🛒
            </button>
            <button class="item-remove-btn" onclick="StacklyStore.toggleWishlist('${item.id}')" title="Remove">✕</button>
          </div>
        </div>
      </div>
    `).join('');
  },

  openQuickView(productId) {
    window.location.href = '404.html';
  },

  openCheckout() {
    this.closeCart();
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;
    this.setCheckoutStep(1);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  setCheckoutStep(step) {
    document.querySelectorAll('.checkout-step-tab').forEach((tab, idx) => {
      tab.classList.toggle('active', idx + 1 === step);
      tab.classList.toggle('completed', idx + 1 < step);
    });
    document.querySelectorAll('.checkout-pane').forEach((pane, idx) => {
      pane.classList.toggle('active', idx + 1 === step);
    });
  },

  autofillDemoAddress() {
    const name = document.getElementById('chk-name');
    const mobile = document.getElementById('chk-phone');
    const address = document.getElementById('chk-address');
    const city = document.getElementById('chk-city');
    const pincode = document.getElementById('chk-pincode');
    if (name) name.value = "Kabir Sharma";
    if (mobile) mobile.value = "9876543210";
    if (address) address.value = "42, Tech Hub Boulevard, 4th Block";
    if (city) city.value = "Bangalore, Karnataka";
    if (pincode) pincode.value = "560034";
    if (window.showToast) window.showToast("Demo address populated! ✓", "info");
  },

  autofillDemoCard() {
    const card = document.getElementById('chk-card-num');
    const exp = document.getElementById('chk-card-exp');
    const cvv = document.getElementById('chk-card-cvv');
    if (card) card.value = "4532 •••• •••• 8891";
    if (exp) exp.value = "08/29";
    if (cvv) cvv.value = "382";
    if (window.showToast) window.showToast("Demo test card populated! ✓", "info");
  },

  finishCheckout() {
    const orderId = 'STK-EL-' + Math.floor(100000 + Math.random() * 900000);
    const orderTotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const summaryEl = document.getElementById('checkout-receipt-summary');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div style="text-align:center;padding:1.5rem 0">
          <div style="font-size:3.5rem;margin-bottom:0.75rem;animation:pulseGlow 2s infinite">⚡</div>
          <h3 style="font-size:1.5rem;font-weight:900;color:var(--white);margin-bottom:0.25rem">Payment Successful!</h3>
          <p style="font-size:0.875rem;color:var(--white-70);margin-bottom:1.5rem">Thank you for your order. We are preparing your shipment.</p>
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:var(--radius-xl);padding:1.25rem;text-align:left;max-width:440px;margin:0 auto">
            <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;font-size:0.85rem">
              <span style="color:var(--white-50)">Order Tracking ID:</span>
              <strong style="color:var(--cyan-400)">#${orderId}</strong>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;font-size:0.85rem">
              <span style="color:var(--white-50)">Estimated Delivery:</span>
              <strong style="color:#10b981">Tomorrow, by 4:00 PM</strong>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.85rem">
              <span style="color:var(--white-50)">Total Paid:</span>
              <strong style="color:var(--white)">${this.formatPrice(orderTotal)}</strong>
            </div>
          </div>
          <div style="margin-top:2rem;display:flex;gap:1rem;justify-content:center">
            <button class="btn btn-primary magnetic" onclick="StacklyStore.closeAllDrawers(); location.href='index.html'">Continue Shopping</button>
          </div>
        </div>
      `;
    }
    this.cart = [];
    this.appliedCoupon = null;
    this.saveState();
    this.setCheckoutStep(4);
    if (window.showToast) window.showToast("Order #" + orderId + " confirmed! 🚀", "success");
  },

  openSearch() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-box-input');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 100);
      this.filterSearch('');
    }
  },

  filterSearch(query) {
    const container = document.getElementById('search-results-list');
    if (!container) return;
    const q = query.toLowerCase().trim();
    const matches = STACKLY_PRODUCTS.filter(p => 
      !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      container.innerHTML = `<div style="text-align:center;padding:2rem;color:var(--white-50);font-size:0.9rem">No matching electronics found for "${query}"</div>`;
      return;
    }

    container.innerHTML = matches.map(p => `
      <div style="display:flex;align-items:center;gap:1rem;padding:0.75rem 1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.2s" onclick="StacklyStore.openQuickView('${p.id}')">
        <img src="${p.image}" alt="${p.name}" style="width:50px;height:50px;object-fit:cover;border-radius:var(--radius-md)" />
        <div style="flex:1">
          <div style="font-size:0.875rem;font-weight:700;color:var(--white)">${p.name}</div>
          <div style="font-size:0.75rem;color:var(--white-50)">${p.brand} · ${p.category}</div>
        </div>
        <div style="font-size:0.95rem;font-weight:800;color:var(--cyan-400)">${this.formatPrice(p.price)}</div>
      </div>
    `).join('');
  },

  // 1-Click Demo Login
  demoLogin(role) {
    const roleSelect = document.getElementById('login-role');
    const emailInput = document.getElementById('login-email');
    const pwInput = document.getElementById('login-password');
    const rememberMe = document.getElementById('remember-me');
    if (roleSelect) roleSelect.value = (role === 'admin' ? 'admin' : 'user');
    if (rememberMe) rememberMe.checked = true;
    if (role === 'admin') {
      if (emailInput) emailInput.value = 'admin.stackly@gmail.com';
      if (pwInput) pwInput.value = 'AdminPass@2026';
      if (window.showToast) window.showToast("Logged in as Administrator! ⚡", "success");
      setTimeout(() => location.href = 'admin-dashboard.html', 800);
    } else {
      if (emailInput) emailInput.value = 'kabir.sharma@gmail.com';
      if (pwInput) pwInput.value = 'CustomerPass@2026';
      if (window.showToast) window.showToast("Welcome back, Kabir Sharma! 👤", "success");
      setTimeout(() => location.href = 'user-dashboard.html', 800);
    }
  },

  // 1-Click Demo Sign Up
  demoRegister() {
    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const phoneInput = document.getElementById('reg-mobile') || document.getElementById('reg-phone');
    const pwInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('reg-confirm-password') || document.getElementById('reg-confirm');
    if (nameInput) nameInput.value = "Kabir Sharma";
    if (emailInput) emailInput.value = "kabir.sharma@example.com";
    if (phoneInput) phoneInput.value = "9876543210";
    if (pwInput) pwInput.value = "SecurePass@2026";
    if (confirmInput) confirmInput.value = "SecurePass@2026";
    if (window.showToast) window.showToast("Account created successfully! Welcome to Stackly. 🚀", "success");
    setTimeout(() => location.href = 'user-dashboard.html', 900);
  },

  injectUI() {
    if (document.getElementById('cart-drawer')) return;

    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'cyber-overlay';
    overlay.className = 'cyber-overlay';
    overlay.onclick = () => this.closeAllDrawers();
    document.body.appendChild(overlay);

    // Cart Drawer
    const cartDrawer = document.createElement('div');
    cartDrawer.id = 'cart-drawer';
    cartDrawer.className = 'cyber-drawer';
    cartDrawer.innerHTML = `
      <div class="drawer-header">
        <div class="drawer-title">
          <span>🛒</span> Shopping Cart
        </div>
        <button class="drawer-close" onclick="StacklyStore.closeCart()">✕</button>
      </div>
      <div class="drawer-body" id="cart-drawer-items"></div>
      <div class="drawer-footer" id="cart-drawer-footer"></div>
    `;
    document.body.appendChild(cartDrawer);

    // Wishlist Drawer
    const wishDrawer = document.createElement('div');
    wishDrawer.id = 'wishlist-drawer';
    wishDrawer.className = 'cyber-drawer';
    wishDrawer.innerHTML = `
      <div class="drawer-header">
        <div class="drawer-title">
          <span>❤️</span> Saved Wishlist
        </div>
        <button class="drawer-close" onclick="StacklyStore.closeWishlist()">✕</button>
      </div>
      <div class="drawer-body" id="wishlist-drawer-items"></div>
    `;
    document.body.appendChild(wishDrawer);

    // Quick View Modal
    const qvModal = document.createElement('div');
    qvModal.id = 'quick-view-modal';
    qvModal.className = 'cyber-modal-wrap';
    qvModal.innerHTML = `
      <div class="cyber-modal">
        <button class="modal-close-corner" onclick="StacklyStore.closeAllDrawers()">✕</button>
        <div id="quick-view-content"></div>
      </div>
    `;
    qvModal.onclick = (e) => { if (e.target === qvModal) this.closeAllDrawers(); };
    document.body.appendChild(qvModal);

    // Checkout Modal
    const chkModal = document.createElement('div');
    chkModal.id = 'checkout-modal';
    chkModal.className = 'cyber-modal-wrap';
    chkModal.innerHTML = `
      <div class="cyber-modal" style="max-width:680px">
        <button class="modal-close-corner" onclick="StacklyStore.closeAllDrawers()">✕</button>
        <div class="checkout-modal-inner">
          <div class="checkout-steps-nav">
            <button class="checkout-step-tab active" type="button" onclick="StacklyStore.setCheckoutStep(1)">
              <div class="checkout-step-num">1</div>
              <span class="checkout-step-label">Address</span>
            </button>
            <button class="checkout-step-tab" type="button" onclick="StacklyStore.setCheckoutStep(2)">
              <div class="checkout-step-num">2</div>
              <span class="checkout-step-label">Delivery</span>
            </button>
            <button class="checkout-step-tab" type="button" onclick="StacklyStore.setCheckoutStep(3)">
              <div class="checkout-step-num">3</div>
              <span class="checkout-step-label">Payment</span>
            </button>
            <button class="checkout-step-tab" type="button">
              <div class="checkout-step-num">✓</div>
              <span class="checkout-step-label">Confirmation</span>
            </button>
          </div>

          <!-- Step 1: Address -->
          <div class="checkout-pane active" id="chk-step-1">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
              <h3 style="font-size:1.15rem;font-weight:800;color:#fff">Shipping Address</h3>
              <button class="btn btn-outline btn-sm" type="button" onclick="StacklyStore.autofillDemoAddress()">⚡ Autofill Demo</button>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1rem">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" id="chk-name" class="form-input" placeholder="Your Name" />
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input type="tel" id="chk-phone" class="form-input" placeholder="10-digit number" />
              </div>
            </div>
            <div class="form-group" style="margin-bottom:0.75rem">
              <label class="form-label">Street Address</label>
              <input type="text" id="chk-address" class="form-input" placeholder="House/Flat, Street, Area" />
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.5rem">
              <div class="form-group">
                <label class="form-label">City, State</label>
                <input type="text" id="chk-city" class="form-input" placeholder="Bangalore, Karnataka" />
              </div>
              <div class="form-group">
                <label class="form-label">Pincode</label>
                <input type="text" id="chk-pincode" class="form-input" placeholder="560034" />
              </div>
            </div>
            <button class="btn btn-primary w-full magnetic" style="width:100%" onclick="StacklyStore.setCheckoutStep(2)">Continue to Delivery →</button>
          </div>

          <!-- Step 2: Delivery -->
          <div class="checkout-pane" id="chk-step-2">
            <h3 style="font-size:1.15rem;font-weight:800;color:#fff;margin-bottom:1rem">Select Delivery Speed</h3>
            <div style="display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1.5rem">
              <label style="display:flex;align-items:center;gap:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(2,132,199,0.4);border-radius:var(--radius-lg);padding:1rem;cursor:pointer">
                <input type="radio" name="chk-delivery" checked />
                <div>
                  <div style="font-weight:700;color:#fff">⚡ Express Same-Day Delivery</div>
                  <div style="font-size:0.75rem;color:var(--white-60)">Delivered within 6 hours across major metro cities</div>
                </div>
                <span style="margin-left:auto;color:#10b981;font-weight:800;font-size:0.85rem">FREE</span>
              </label>
              <label style="display:flex;align-items:center;gap:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:var(--radius-lg);padding:1rem;cursor:pointer">
                <input type="radio" name="chk-delivery" />
                <div>
                  <div style="font-weight:700;color:#fff">📦 Standard White-Glove Courier</div>
                  <div style="font-size:0.75rem;color:var(--white-60)">2-3 business days with shockproof sealed packing</div>
                </div>
                <span style="margin-left:auto;color:#10b981;font-weight:800;font-size:0.85rem">FREE</span>
              </label>
            </div>
            <div style="display:flex;gap:1rem">
              <button class="btn btn-secondary" onclick="StacklyStore.setCheckoutStep(1)">← Back</button>
              <button class="btn btn-primary w-full magnetic" style="flex:1" onclick="StacklyStore.setCheckoutStep(3)">Continue to Payment →</button>
            </div>
          </div>

          <!-- Step 3: Payment -->
          <div class="checkout-pane" id="chk-step-3">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
              <h3 style="font-size:1.15rem;font-weight:800;color:#fff">Select Payment Method</h3>
              <button class="btn btn-outline btn-sm" type="button" onclick="StacklyStore.autofillDemoCard()">⚡ Autofill Demo Card</button>
            </div>
            <div style="display:flex;gap:0.5rem;margin-bottom:1rem">
              <button class="btn btn-primary btn-sm" type="button" style="flex:1">Credit / Debit Card</button>
              <button class="btn btn-secondary btn-sm" type="button" style="flex:1">UPI / QR Code</button>
              <button class="btn btn-secondary btn-sm" type="button" style="flex:1">Cash on Delivery</button>
            </div>
            <div class="form-group" style="margin-bottom:0.75rem">
              <label class="form-label">Card Number</label>
              <input type="text" id="chk-card-num" class="form-input" placeholder="4532 •••• •••• ••••" />
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.5rem">
              <div class="form-group">
                <label class="form-label">Expiry (MM/YY)</label>
                <input type="text" id="chk-card-exp" class="form-input" placeholder="MM/YY" />
              </div>
              <div class="form-group">
                <label class="form-label">CVV</label>
                <input type="password" id="chk-card-cvv" class="form-input" placeholder="•••" maxlength="4" />
              </div>
            </div>
            <div style="display:flex;gap:1rem">
              <button class="btn btn-secondary" onclick="StacklyStore.setCheckoutStep(2)">← Back</button>
              <button class="btn btn-primary w-full magnetic" style="flex:1" onclick="StacklyStore.finishCheckout()">Pay & Place Order 🔒</button>
            </div>
          </div>

          <!-- Step 4: Summary -->
          <div class="checkout-pane" id="chk-step-4">
            <div id="checkout-receipt-summary"></div>
          </div>
        </div>
      </div>
    `;
    chkModal.onclick = (e) => { if (e.target === chkModal) this.closeAllDrawers(); };
    document.body.appendChild(chkModal);

    // Search Modal
    const searchModal = document.createElement('div');
    searchModal.id = 'search-modal';
    searchModal.className = 'cyber-modal-wrap';
    searchModal.innerHTML = `
      <div class="search-modal-box">
        <div class="search-input-header">
          <span style="font-size:1.2rem">🔍</span>
          <input type="text" id="search-box-input" placeholder="Search laptops, smartphones, headphones, smartwatches..." oninput="StacklyStore.filterSearch(this.value)" />
          <button class="drawer-close" style="width:28px;height:28px;font-size:0.8rem" onclick="StacklyStore.closeAllDrawers()">✕</button>
        </div>
        <div class="search-results-list" id="search-results-list"></div>
      </div>
    `;
    searchModal.onclick = (e) => { if (e.target === searchModal) this.closeAllDrawers(); };
    document.body.appendChild(searchModal);
  },

  bindEvents() {
    // Keyboard shortcut Ctrl+K / Cmd+K for search
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openSearch();
      }
      if (e.key === 'Escape') {
        this.closeAllDrawers();
      }
    });

    // Wire up navbar cart and wishlist triggers if present
    document.querySelectorAll('.trigger-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCart();
      });
    });
    document.querySelectorAll('.trigger-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openWishlist();
      });
    });
    document.querySelectorAll('.trigger-search').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openSearch();
      });
    });
  }
};

// Auto-initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  StacklyStore.init();
});

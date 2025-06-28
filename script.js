// DOM Elements
const filterButtons = document.querySelectorAll(".filter-btn")
const productCards = document.querySelectorAll(".product-card")
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const mobileMenu = document.querySelector(".mobile-menu")
const searchInput = document.getElementById("searchInput")
const sidebar = document.getElementById("sidebar")
const mobileToggle = document.getElementById("mobileToggle")
const categoryCards = document.querySelectorAll(".category-card")
const contentCards = document.querySelectorAll(".content-card")
const searchInputSidebar = document.querySelector(".search-input-sidebar")
const playButtons = document.querySelectorAll(".play-button")
const searchBtn = document.getElementById("searchBtn")
const contentGrid = document.getElementById("contentGrid")
const cartNotification = document.getElementById("cartNotification")
const notificationText = document.getElementById("notificationText")
const contactForm = document.getElementById("contactForm")

// Navigation elements
const navItems = document.querySelectorAll(".nav-item")
const sections = document.querySelectorAll(".section")

// Mobile Menu Toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    const icon = mobileMenuBtn.querySelector("i")
    icon.classList.toggle("fa-bars")
    icon.classList.toggle("fa-times")
  })
}

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active")
    const icon = mobileToggle.querySelector("i")

    if (sidebar.classList.contains("active")) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })
}

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 1024) {
    if (sidebar && !sidebar.contains(e.target) && mobileToggle && !mobileToggle.contains(e.target)) {
      sidebar.classList.remove("active")
      const icon = mobileToggle.querySelector("i")
      if (icon) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    }
  }
})

// Filter Functionality
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    button.classList.add("active")

    const category = button.getAttribute("data-category")

    // Filter products with animation
    productCards.forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"

      setTimeout(() => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 50)
        } else {
          card.style.display = "none"
        }
      }, 200)
    })
  })
})

// Navigation System - CORREGIDO
document.addEventListener("DOMContentLoaded", () => {
  // Manejar clicks en los elementos de navegación
  const navItems = document.querySelectorAll(".nav-item")

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault()

      // Obtener el href del enlace
      const href = item.getAttribute("href")

      // Si es un enlace a otra página, navegar directamente
      if (href && href !== "#" && href !== window.location.pathname) {
        window.location.href = href
        return
      }

      // Para navegación interna (si la hubiera)
      navItems.forEach((nav) => nav.classList.remove("active"))
      item.classList.add("active")

      // Cerrar menú móvil
      if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById("sidebar")
        const mobileToggle = document.getElementById("mobileToggle")

        if (sidebar) {
          sidebar.classList.remove("active")
        }

        if (mobileToggle) {
          const icon = mobileToggle.querySelector("i")
          if (icon) {
            icon.classList.remove("fa-times")
            icon.classList.add("fa-bars")
          }
        }
      }
    })
  })

  // Resto del código de inicialización...
  const animatedElements = document.querySelectorAll(".content-card, .category-card, .popular-item, .support-item")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })

  // Initialize category count
  updateCategoryCount("all")

  // Check for category filter in URL
  const urlParams = new URLSearchParams(window.location.search)
  const categoryFromUrl = urlParams.get("category")
  if (categoryFromUrl && document.querySelector(".content-grid")) {
    // Find and activate the category
    const targetCard = document.querySelector(`[data-category="${categoryFromUrl}"]`)
    if (targetCard) {
      const categoryCards = document.querySelectorAll(".category-card")
      categoryCards.forEach((c) => c.classList.remove("active"))
      targetCard.classList.add("active")
      filterContent(categoryFromUrl)

      // Scroll to categories section
      setTimeout(() => {
        const categoriesSection = document.getElementById("categories")
        if (categoriesSection) {
          categoriesSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 500)
    }
  }

  // Initialize search placeholder animation
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    const searchPlaceholders = [
      "Buscar Netflix...",
      "Buscar Disney+...",
      "Buscar HBO Max...",
      "Buscar Spotify...",
      "Buscar YouTube Premium...",
      "Buscar Apple TV+...",
      "Buscar Paramount+...",
      "Buscar Crunchyroll...",
      "Buscar Game Pass...",
      "Buscar Canva Pro...",
    ]

    let placeholderIndex = 0
    setInterval(() => {
      searchInput.placeholder = searchPlaceholders[placeholderIndex]
      placeholderIndex = (placeholderIndex + 1) % searchPlaceholders.length
    }, 3000)
  }
})

// Show Section Function
function showSection(sectionId) {
  // Hide all sections
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Show target section
  const targetSection = document.getElementById(sectionId)
  if (targetSection) {
    targetSection.classList.add("active")
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Scroll to Section Function
function scrollToSection(sectionId) {
  showSection(sectionId)

  // Update navigation
  navItems.forEach((nav) => nav.classList.remove("active"))
  const targetNav = document.querySelector(`[data-section="${sectionId}"]`)
  if (targetNav) {
    targetNav.classList.add("active")
  }
}

// Category Filter System
categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Remove active class from all cards
    categoryCards.forEach((c) => c.classList.remove("active"))
    // Add active class to clicked card
    card.classList.add("active")

    const category = card.getAttribute("data-category")
    filterContent(category)
  })
})

// Filter Content Function
function filterContent(category) {
  const contentCards = document.querySelectorAll(".content-card")

  contentCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category")

    // Add exit animation
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"

    setTimeout(() => {
      if (category === "all" || cardCategory === category) {
        card.style.display = "block"
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 50)
      } else {
        card.style.display = "none"
      }
    }, 200)
  })

  // Update category count
  updateCategoryCount(category)
}

// Update Category Count
function updateCategoryCount(activeCategory) {
  const categoryCounts = {
    all: document.querySelectorAll(".content-card").length,
    netflix: document.querySelectorAll('[data-category="netflix"]').length,
    disney: document.querySelectorAll('[data-category="disney"]').length,
    prime: document.querySelectorAll('[data-category="prime"]').length,
    streaming: document.querySelectorAll('[data-category="streaming"]').length,
    music: document.querySelectorAll('[data-category="music"]').length,
    sports: document.querySelectorAll('[data-category="sports"]').length,
    productivity: document.querySelectorAll('[data-category="productivity"]').length,
    education: document.querySelectorAll('[data-category="education"]').length,
    gaming: document.querySelectorAll('[data-category="gaming"]').length,
  }

  categoryCards.forEach((card) => {
    const category = card.getAttribute("data-category")
    const countElement = card.querySelector(".category-count")
    if (countElement && categoryCounts[category] !== undefined) {
      countElement.textContent = categoryCounts[category]
    }
  })
}

// Search Functionality
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    performSearch(searchTerm)
  })
}

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase()
    performSearch(searchTerm)
  })
}

// Perform Search Function
function performSearch(searchTerm) {
  const contentCards = document.querySelectorAll(".content-card")

  if (!searchTerm) {
    // Show all content if search is empty
    contentCards.forEach((card) => {
      card.style.display = "block"
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    })
    return
  }

  contentCards.forEach((card) => {
    const title = card.querySelector(".card-title")?.textContent.toLowerCase() || ""
    const description = card.querySelector(".card-description")?.textContent.toLowerCase() || ""
    const name = card.getAttribute("data-name") || ""

    if (title.includes(searchTerm) || description.includes(searchTerm) || name.includes(searchTerm)) {
      card.style.display = "block"
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    } else {
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"
      setTimeout(() => {
        card.style.display = "none"
      }, 200)
    }
  })
}

// Buy Product Function
function buyProduct(productName, price) {
  // Show notification
  if (notificationText && cartNotification) {
    notificationText.textContent = `${productName} - Redirigiendo a WhatsApp...`
    cartNotification.classList.add("show")

    // Hide notification after 3 seconds
    setTimeout(() => {
      cartNotification.classList.remove("show")
    }, 3000)
  }

  console.log(`Comprando: ${productName} por ${price}`)

  // WhatsApp redirect for purchase with Colombian number
  setTimeout(() => {
    const message = `🥳 ¡Hola! Quiero comprar *${productName}* 

💰 Precio: ${price}
📱 Desde: Electroflix Website
🚀 Entrega: Inmediata

¿Podrías ayudarme con la compra?`
    const whatsappUrl = `https://wa.me/573243052782?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }, 1000)
}

// Contact Form Handling
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name")?.value
    const email = document.getElementById("email")?.value
    const message = document.getElementById("message")?.value
    const phone = document.getElementById("phone")?.value
    const subject = document.getElementById("subject")?.value

    if (name && email && message) {
      // Show success notification
      if (notificationText && cartNotification) {
        notificationText.textContent = "Mensaje enviado correctamente!"
        cartNotification.classList.add("show")
      }

      // Clear form
      contactForm.reset()

      // Hide notification
      setTimeout(() => {
        if (cartNotification) {
          cartNotification.classList.remove("show")
        }
      }, 3000)

      // Send to WhatsApp
      const whatsappMessage = `📧 *Nuevo mensaje de contacto*

👤 *Nombre:* ${name}
📧 *Email:* ${email}
📱 *Teléfono:* ${phone || "No proporcionado"}
📋 *Asunto:* ${subject || "Consulta general"}

💬 *Mensaje:*
${message}`

      setTimeout(() => {
        const whatsappUrl = `https://wa.me/573243052782?text=${encodeURIComponent(whatsappMessage)}`
        window.open(whatsappUrl, "_blank")
      }, 1500)

      console.log("Formulario enviado:", { name, email, phone, subject, message })
    }
  })
}

// Scroll to Categories Function
function scrollToCategories() {
  const categoriesSection = document.getElementById("categories")
  if (categoriesSection) {
    categoriesSection.scrollIntoView({ behavior: "smooth" })
  }
}

// Navigation Functions for Category Pages
function goToCategory(category) {
  // Redirect to index with category filter
  window.location.href = `index.html?category=${category}`
}

// FAQ Functions for Support Page
function toggleFAQ() {
  const faqSection = document.getElementById("faqSection")
  if (faqSection) {
    faqSection.style.display = faqSection.style.display === "none" ? "block" : "none"
  }
}

function toggleAnswer(questionElement) {
  const answer = questionElement.nextElementSibling
  const icon = questionElement.querySelector("i")

  if (answer.style.display === "block") {
    answer.style.display = "none"
    icon.classList.remove("fa-chevron-up")
    icon.classList.add("fa-chevron-down")
  } else {
    answer.style.display = "block"
    icon.classList.remove("fa-chevron-down")
    icon.classList.add("fa-chevron-up")
  }
}

function openWhatsApp() {
  const message = "🎧 Hola! Necesito ayuda con soporte técnico"
  const whatsappUrl = `https://wa.me/573243052782?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

function requestSupport() {
  const message = "🔧 Hola! Necesito soporte técnico especializado"
  const whatsappUrl = `https://wa.me/573243052782?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

function showWarranty() {
  const message = "🛡️ Hola! Quiero información sobre la garantía"
  const whatsappUrl = `https://wa.me/573243052782?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

function showGuides() {
  const message = "📖 Hola! Quiero guías de configuración"
  const whatsappUrl = `https://wa.me/573243052782?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

function reportIssue() {
  const message = "🐛 Hola! Quiero reportar un problema con mi servicio"
  const whatsappUrl = `https://wa.me/573243052782?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, "_blank")
}

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".content-card, .category-card, .popular-item, .support-item")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })

  // Initialize category count
  updateCategoryCount("all")

  // Check for category filter in URL
  const urlParams = new URLSearchParams(window.location.search)
  const categoryFromUrl = urlParams.get("category")
  if (categoryFromUrl && document.querySelector(".content-grid")) {
    // Find and activate the category
    const targetCard = document.querySelector(`[data-category="${categoryFromUrl}"]`)
    if (targetCard) {
      categoryCards.forEach((c) => c.classList.remove("active"))
      targetCard.classList.add("active")
      filterContent(categoryFromUrl)

      // Scroll to categories section
      setTimeout(() => {
        const categoriesSection = document.getElementById("categories")
        if (categoriesSection) {
          categoriesSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 500)
    }
  }

  // Initialize search placeholder animation
  if (searchInput) {
    const searchPlaceholders = [
      "Buscar Netflix...",
      "Buscar Disney+...",
      "Buscar HBO Max...",
      "Buscar Spotify...",
      "Buscar YouTube Premium...",
      "Buscar Apple TV+...",
      "Buscar Paramount+...",
      "Buscar Crunchyroll...",
      "Buscar Game Pass...",
      "Buscar Canva Pro...",
    ]

    let placeholderIndex = 0
    setInterval(() => {
      searchInput.placeholder = searchPlaceholders[placeholderIndex]
      placeholderIndex = (placeholderIndex + 1) % searchPlaceholders.length
    }, 3000)
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header scroll effect (hide/show on scroll)
let lastScrollTop = 0

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Only apply on mobile
  if (window.innerWidth <= 1024) {
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down - hide sidebar if open
      if (sidebar && sidebar.classList.contains("active")) {
        sidebar.classList.remove("active")
        const icon = mobileToggle?.querySelector("i")
        if (icon) {
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }
      }
    }
  }

  lastScrollTop = scrollTop
})

// Parallax Effect for Hero Background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-bg")

  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Dynamic Color Animation for Logo Symbol
const symbolParts = document.querySelectorAll(".symbol-part")
const colors = ["#FF0040", "#0080FF", "#8000FF", "#00FF80"]

if (symbolParts.length > 0) {
  setInterval(() => {
    symbolParts.forEach((part, index) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      part.style.background = `linear-gradient(135deg, ${randomColor}, ${colors[(index + 1) % colors.length]})`
    })
  }, 2000)
}

// Content Card Hover Effects
const contentCardsForHover = document.querySelectorAll(".content-card")
const logoColors = [
  "var(--glow-red)",
  "var(--glow-orange)",
  "var(--glow-green)",
  "var(--glow-blue)",
  "var(--glow-purple)",
]

contentCardsForHover.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const randomGlow = logoColors[Math.floor(Math.random() * logoColors.length)]
    card.style.boxShadow = randomGlow
    card.style.transform = "translateY(-15px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "none"
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close mobile menu
    if (sidebar) {
      sidebar.classList.remove("active")
      const icon = mobileToggle?.querySelector("i")
      if (icon) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    }

    // Clear search
    if (searchInput) {
      searchInput.value = ""
      performSearch("")
    }
  }

  // Search shortcut (Ctrl/Cmd + K)
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault()
    if (searchInput) {
      searchInput.focus()
    }
  }
})

// Performance optimization: Debounce search
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to search
const debouncedSearch = debounce((searchTerm) => {
  performSearch(searchTerm)
}, 300)

// Replace direct search with debounced version
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    debouncedSearch(searchTerm)
  })
}

// Performance: Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-bg")

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  }, 16),
)

// Loading Animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Add CSS for ripple animation
const style = document.createElement("style")
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
`
document.head.appendChild(style)

// Add ripple effect to buttons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")

    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Error handling
window.addEventListener("error", (e) => {
  console.error("Error:", e.error)
})

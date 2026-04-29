// Initialize AOS Animation
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
});

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// Language Toggle
const langToggle = document.getElementById('lang-toggle');
const body = document.body;

langToggle.addEventListener('click', () => {
    body.classList.toggle('lang-bn');

    // Toggle Display of text spans
    const enTexts = document.querySelectorAll('.en-text');
    const bnTexts = document.querySelectorAll('.bn-text');

    if (body.classList.contains('lang-bn')) {
        enTexts.forEach(el => el.style.display = 'none');
        bnTexts.forEach(el => el.style.display = 'inline-block'); // or block based on element type, usually inline-block for spans
        langToggle.innerText = 'বাংলা | EN';
    } else {
        enTexts.forEach(el => el.style.display = 'inline-block');
        bnTexts.forEach(el => el.style.display = 'none');
        langToggle.innerText = 'EN | বাংলা';
    }
});

// Exit Intent Popup
const exitPopup = document.getElementById('exit-popup');
const closePopup = document.getElementById('close-popup');
let popupShown = sessionStorage.getItem('exitPopupShown');

document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0 && !popupShown) {
        exitPopup.classList.add('active');
        sessionStorage.setItem('exitPopupShown', 'true');
        popupShown = true;
    }
});

closePopup.addEventListener('click', () => {
    exitPopup.classList.remove('active');
});

// Close popup on outside click
exitPopup.addEventListener('click', (e) => {
    if (e.target === exitPopup) {
        exitPopup.classList.remove('active');
    }
});



// Contact Form Inquiry Submit to WhatsApp
const inquirySubmit = document.getElementById('inquiry-submit');
if (inquirySubmit) {
    inquirySubmit.addEventListener('click', () => {
        const name = document.getElementById('inq-name')?.value || '';
        const company = document.getElementById('inq-company')?.value || '';
        const email = document.getElementById('inq-email')?.value || '';
        const phone = document.getElementById('inq-phone')?.value || '';
        const msg = document.getElementById('inq-msg')?.value || '';

        const message = `*New Inquiry from ${name}*\n\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\n\n*Message:*\n${msg}`;
        const encodedMessage = encodeURIComponent(message);

        // WhatsApp to 2nd number: +880 1772-860586
        window.open(`https://wa.me/8801772860586?text=${encodedMessage}`, '_blank');
    });
}


// ===== FAQ Logic =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close others
        faqItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});

// ===== Legal Terms Generator (40 Points) =====
const legalContainer = document.getElementById('legal-accordion');
if (legalContainer) {
    const legalPoints = [
        "1. Parties: This agreement is between Riseup Buying House and the Client.",
        "2. Scope: Defines the manufacturing of apparel as per the agreed Tech Pack.",
        "3. MOQ: Minimum order quantities apply to all orders.",
        "4. Pricing: All prices are quoted in USD, FOB Chittagong unless otherwise stated.",
        "5. Payment Terms: 30% advance via TT or L/C, 70% before shipment.",
        "6. Sampling: Sample costs are fully refundable upon bulk order placement.",
        "7. Approvals: Client must approve pre-production samples in writing.",
        "8. Production Time: Standard timeline is 30-45 days post sample approval.",
        "9. Delays: Riseup is not liable for force majeure delays.",
        "10. Quality Control: AQL 2.5 standard is applied unless specified.",
        "11. Tolerances: Size tolerance of ±1.5cm is standard.",
        "12. Fabric Sourcing: We guarantee fabric compliance as per tech pack.",
        "13. Color Matching: 95% commercial color match is guaranteed.",
        "14. Trims & Accessories: Approved trims must be supplied or sourced before production.",
        "15. Intellectual Property: Client retains all IP rights to their designs.",
        "16. Confidentiality: Both parties agree to NDA terms.",
        "17. Shipping: Client covers all freight and insurance costs unless FOB.",
        "18. Customs: Client is responsible for import duties at destination.",
        "19. Documentation: We provide Invoice, Packing List, BL, and CO.",
        "20. Defects: Defective rate under 2% is considered commercially acceptable.",
        "21. Claims: Any quality claims must be made within 14 days of receipt.",
        "22. Refunds: Refunds are only issued for critical defects beyond AQL.",
        "23. Cancellations: Order cannot be cancelled after fabric cutting.",
        "24. Compliance: All factories are socially compliant (BSCI/SEDEX).",
        "25. Child Labor: Strictly prohibited across our supply chain.",
        "26. Sustainability: Eco-friendly materials available upon request.",
        "27. Subcontracting: We reserve the right to use compliant partner facilities.",
        "28. Communication: All official communication via registered email.",
        "29. Revisions: Mid-production design changes will incur extra costs.",
        "30. Lab Testing: 3rd party testing costs are borne by the client.",
        "31. Packaging: Standard polybag and carton packing included.",
        "32. Labeling: Care labels must comply with destination country laws.",
        "33. Currency Fluctuation: Prices valid for 30 days.",
        "34. Insurance: Marine insurance is recommended for all shipments.",
        "35. Storage: Unclaimed goods after 30 days incur storage fees.",
        "36. Marketing: We may use production photos unless NDA prohibits.",
        "37. Dispute Resolution: Subject to the jurisdiction of Bangladesh courts.",
        "38. Amendments: Agreement modifications must be in writing.",
        "39. Severability: If one clause is invalid, others remain effective.",
        "40. Acceptance: Placing an order implies acceptance of these terms."
    ];

    legalPoints.forEach(point => {
        const item = document.createElement('div');
        item.className = 'faq-item'; // Reusing FAQ styles for accordion

        const titleText = point.split(':')[0];
        const descText = point.split(':')[1] || point;

        item.innerHTML = `
            <div class="faq-question">
                <h4>${titleText}</h4>
                <i class="fas fa-plus"></i>
            </div>
            <div class="faq-answer">
                <p>${descText.trim()}</p>
            </div>
        `;

        legalContainer.appendChild(item);

        // Add click event
        item.querySelector('.faq-question').addEventListener('click', () => {
            const allLegalItems = legalContainer.querySelectorAll('.faq-item');
            allLegalItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });
}

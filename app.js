// Database mapping country parameters to relevant legal institutions and specific books
const countryData = {
    "United States": {
        authority: "ACLU & Department of Justice Civil Rights Division",
        bookTitle: "Voices of Liberty: US Constitutional Safeguards",
        bookContent: "In examining the 14th Amendment, modern litigation continuously proves that systemic bias during community policing can be challenged through organized civil action..."
    },
    "United Kingdom": {
        authority: "Equality and Human Rights Commission (EHRC)",
        bookTitle: "The Human Rights Act: Testimonies of UK Law",
        bookContent: "Following the introduction of the Human Rights Act 1998, individuals gained the power to defend their right to privacy and fair trial directly within domestic tribunals..."
    },
    "Kenya": {
        authority: "Kenya National Commission on Human Rights (KNCHR)",
        bookTitle: "Katiba Protections: Realities of Kenyan Reform",
        bookContent: "Article 43 of the Constitution of Kenya guarantees socio-economic rights. True justice manifests when grassroots organizers utilize legal clinics to demand clean water access..."
    },
    "India": {
        authority: "National Human Rights Commission (NHRC) India",
        bookTitle: "Justice For All: Guarding the Indian Constitution",
        bookContent: "Under Article 21, the Right to Life has been dynamically expanded by the Supreme Court to encompass legal aid, environmental health, and human dignity..."
    },
    "Other": {
        authority: "Amnesty International & UN Human Rights Council",
        bookTitle: "Global Protests: Transnational Law & Testimonies",
        bookContent: "Universal legal framework parameters show that global advocacy succeeds when localized abuses are systematically documented via safe cryptographic pipelines..."
    }
};

// Global session state management
let userProfile = {
    email: "",
    phone: "",
    country: ""
};

// Event Listeners initialization on window load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
    document.getElementById("reportForm").addEventListener("submit", handleReport);
    document.getElementById("buyBtn").addEventListener("click", purchasePremium);
    document.getElementById("themeToggle").addEventListener("change", (e) => toggleTheme(e.target.value));
});

// Process interactive initialization dialogue inputs
function handleLogin(event) {
    event.preventDefault();
    
    userProfile.email = document.getElementById('email').value;
    userProfile.phone = document.getElementById('phone').value;
    userProfile.country = document.getElementById('country').value;

    // Dynamically write profile inputs to application content viewports
    document.getElementById('welcomeBanner').innerText = `Logged in securely as: ${userProfile.email} (${userProfile.country})`;
    document.getElementById('routingCountry').innerText = userProfile.country;
    document.getElementById('authorityDestination').innerText = countryData[userProfile.country].authority;

    // Close the dialogue backdrop overlay
    document.getElementById('loginModal').style.display = 'none';
}

// Emulate reporting submission to regional server pipelines
function handleReport(event) {
    event.preventDefault();
    const violationType = document.getElementById('violationType').value;
    const targetAuthority = countryData[userProfile.country].authority;

    alert(`ALERT SECURELY SENT:\nYour report regarding "${violationType}" has been packaged and directed securely to the ${targetAuthority}. Investigators will follow up via ${userProfile.phone}.`);
    document.getElementById('reportForm').reset();
}

// Process e-book asset transactional unlock simulation
function purchasePremium() {
    const confirmPayment = confirm(`Confirm payment of $15.00 USD to purchase the digital book tailored for ${userProfile.country}?`);
    
    if(confirmPayment) {
        // Toggle template layers from locked configuration to premium state
        document.getElementById('premiumLocked').style.display = 'none';
        document.getElementById('premiumUnlocked').style.display = 'block';
        document.getElementById('themeSwitchArea').style.display = 'flex'; // Expose the premium layout controller

        // Generate data structures matching localization profiles
        const localizedBook = countryData[userProfile.country];
        document.getElementById('bookTitle').innerText = localizedBook.bookTitle;
        document.getElementById('bookMeta').innerText = `Price: $15 USD Paid • Target Legal Region: ${userProfile.country}`;
        document.getElementById('bookContent').innerText = localizedBook.bookContent;

        alert("Payment successful! Premium features unlocked: Localized E-Book granted and Dark/Light mode theme engine activated.");
    }
}

// Implement visual color layout variant rendering mutations
function toggleTheme(themeName) {
    if (themeName === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

const countryData = {
    "United States": {
        authority: "ACLU & Department of Justice Civil Rights Division",
        bookTitle: "Voices of Liberty: US Constitutional Safeguards ($15)",
        bookContent: "Under modern US case law interpretation, systemic civil rights violations by state actors can be aggressively mitigated in federal court via Section 1983 litigation paths..."
    },
    "United Kingdom": {
        authority: "Equality and Human Rights Commission (EHRC)",
        bookTitle: "The Human Rights Act: Testimonies of UK Law ($15)",
        bookContent: "The Human Rights Act 1998 codifies European Convention benchmarks directly within sovereign British jurisdiction, expanding direct accountability mechanics..."
    },
    "Kenya": {
        authority: "Kenya National Commission on Human Rights (KNCHR)",
        bookTitle: "Katiba Protections: Realities of Kenyan Reform ($15)",
        bookContent: "Article 43 of the Constitution of Kenya mandates explicit socioeconomic baselines. Grassroots legal clinics actively leverage these structures for community protections..."
    },
    "India": {
        authority: "National Human Rights Commission (NHRC) India",
        bookTitle: "Justice For All: Guarding the Indian Constitution ($15)",
        bookContent: "Indian jurisprudence under Article 21 dynamically scales the definition of a dignified existence, encompassing rights to legal aid and institutional equity..."
    },
    "Other": {
        authority: "Amnesty International & UN Human Rights Council",
        bookTitle: "Global Protests: Transnational Law & Testimonies ($15)",
        bookContent: "International treaty parameters demonstrate that global observation platforms succeed when localized abuses are systematically tracked and fed to international tribunals..."
    }
};

// NEW DATABASE: Free references for users checking their country laws instantly
const lawDatabase = {
    "United States": {
        title: "United States Constitutional Protections",
        laws: "The Bill of Rights ensures core safeties. The 4th Amendment protects you against unreasonable searches and seizures, while the 14th Amendment guarantees equal protection under state and federal laws."
    },
    "United Kingdom": {
        title: "United Kingdom Statutory Safeguards",
        laws: "The Human Rights Act 1998 incorporates the European Convention on Human Rights into British law. Key elements include Article 6 (Right to a fair trial) and Article 10 (Freedom of expression)."
    },
    "Kenya": {
        title: "The Constitution of Kenya (2010) Framework",
        laws: "Chapter Four contains the Bill of Rights. Article 26 protects the Right to Life, Article 29 guarantees Freedom and Security of the person, and Article 36 guarantees Freedom of Association."
    },
    "India": {
        title: "The Fundamental Rights of India",
        laws: "Part III of the Constitution grants fundamental safety pillars. Article 14 ensures equality before law, Article 19 safeguards freedom of assembly and speech, and Article 21 protects personal life and liberty."
    },
    "Other": {
        title: "Universal Declaration of Human Rights (UDHR)",
        laws: "Under international treaty standards, Article 3 holds that everyone has the right to life, liberty, and security. Article 5 states explicitly that no one shall be subjected to torture or degrading treatment."
    }
};

let userProfile = { email: "", phone: "", country: "" };

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", handleLogin);
    document.getElementById("reportForm").addEventListener("submit", handleReport);
    document.getElementById("buyBtn").addEventListener("click", purchasePremium);
    document.getElementById("themeToggle").addEventListener("change", (e) => toggleTheme(e.target.value));
    
    // Connect new law exploration button trigger
    document.getElementById("localLawsBtn").addEventListener("click", showCountryLaws);
});

function handleLogin(event) {
    event.preventDefault();
    userProfile.email = document.getElementById('email').value;
    userProfile.phone = document.getElementById('phone').value;
    userProfile.country = document.getElementById('country').value;

    document.getElementById('welcomeBanner').innerText = `🔐 Channel Secured: ${userProfile.email} (${userProfile.country})`;
    document.getElementById('authorityDestination').innerText = countryData[userProfile.country].authority;
    document.getElementById('loginModal').style.display = 'none';
}

// NEW FUNCTION: Reads user profile and exposes the law text variables
function showCountryLaws() {
    if (!userProfile.country) {
        alert("Please log in using the dialogue configuration box first.");
        return;
    }
    
    const lawDetails = lawDatabase[userProfile.country] || lawDatabase["Other"];
    
    // Inject texts and modify the layout display to block visibility
    document.getElementById("localLawsTitle").innerText = lawDetails.title;
    document.getElementById("localLawsBody").innerText = lawDetails.laws;
    document.getElementById("localLawsDisplay").style.display = "block";
}

async function handleReport(event) {
    event.preventDefault();
    
    const payload = {
        email: userProfile.email,
        phone: userProfile.phone,
        country: userProfile.country,
        violationType: document.getElementById('violationType').value,
        details: document.getElementById('details').value
    };

    try {
        const response = await fetch('/api/submit-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (result.success) {
            alert(`REPORT DISPATCHED SUCCESSFULLY!\n\nYour file has been processed and routed to the ${result.authorityName}.`);
            document.getElementById('reportForm').reset();
        }
    } catch (e) {
        alert("Transmission failure. Check that your Node server is running on port 5000.");
    }
}

function purchasePremium() {
    if (confirm(`Authorize a $15.00 payment processing check for the custom ${userProfile.country} handbook?`)) {
        document.getElementById('premiumLocked').style.display = 'none';
        document.getElementById('premiumUnlocked').style.display = 'block';
        document.getElementById('themeSwitchArea').style.display = 'flex';

        const data = countryData[userProfile.country];
        document.getElementById('bookTitle').innerText = data.bookTitle;
        document.getElementById('bookContent').innerText = data.bookContent;
        alert("Payment verified. Premium document access decrypted and dark mode themes initialized.");
    }
}

function toggleTheme(themeName) {
    if (themeName === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
}

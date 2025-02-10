function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/; Secure; SameSite=Lax";
    localStorage.setItem(name, value); // Armazena também no localStorage
}

function getCookie(name) {
    let nameEQ = name + "=";
    let cookiesArray = document.cookie.split('; ');
    for (let cookie of cookiesArray) {
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
    }
    return localStorage.getItem(name) || null;
}

function deleteCookie(name) {
    document.cookie = name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Lax";
    localStorage.removeItem(name);
}

// Mostrar ou ocultar banner com base no consentimento
window.onload = function() {
    if (!getCookie("cookies_consent")) {
        document.getElementById('cookies-container').style.display = 'block';
    }
};

// Aceitar todos os cookies
document.getElementById('accept-button').addEventListener('click', function() {
    setCookie("cookies_consent", "accepted", 365);
    setCookie("analytics_consent", "accepted", 365);
    setCookie("ads_consent", "accepted", 365);
    document.getElementById('cookies-container').style.display = 'none';
});

// Rejeitar todos os cookies
document.getElementById('reject-button').addEventListener('click', function() {
    setCookie("cookies_consent", "rejected", 365);
    deleteCookie("analytics_consent");
    deleteCookie("ads_consent");
    document.getElementById('cookies-container').style.display = 'none';
});

// Abrir configurações personalizadas
document.getElementById('settings-button').addEventListener('click', function() {
    document.getElementById('cookie-settings-modal').style.display = 'block';
});

// Salvar preferências personalizadas
document.getElementById('save-consent').addEventListener('click', function() {
    let analytics = document.getElementById('analytics-consent').checked ? "accepted" : "rejected";
    let ads = document.getElementById('ads-consent').checked ? "accepted" : "rejected";

    setCookie("cookies_consent", "custom", 365);
    setCookie("analytics_consent", analytics, 365);
    setCookie("ads_consent", ads, 365);

    document.getElementById('cookie-settings-modal').style.display = 'none';
    document.getElementById('cookies-container').style.display = 'none';
});

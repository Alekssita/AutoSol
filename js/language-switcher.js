document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('language-select');
    if (!select) return;

    const currentPath = window.location.pathname;
    const currentLang = currentPath.match(/_(ua|ru|es)\.html$/) ? currentPath.match(/_(ua|ru|es)\.html$/)[1] : 'ua';
    select.value = currentLang;

    select.addEventListener('change', () => {
        const newLang = select.value;
        localStorage.setItem('language', newLang);

        // Extract page name (e.g., 'costa-blanca' from 'costa-blanca_ua.html' or 'costa-blanca.html')
        const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1).replace(/_(ua|ru|es)?\.html$/, '');

        // Construct new URL (e.g., 'costa-blanca_ru.html')
        const newPath = `${pageName}_${newLang}.html`;

        window.location.href = newPath;
    });
});
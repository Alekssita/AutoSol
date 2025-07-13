document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Закриваємо всі відкриті пункти
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Відкриваємо поточний, якщо він не був активним
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});
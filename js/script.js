// Утиліти
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isWhatsAppInstalled() {
    return /WhatsApp/i.test(navigator.userAgent);
}

function isTelegramInstalled() {
    return /Telegram/i.test(navigator.userAgent);
}

function validatePhoneNumber(phone) {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    return /^\+?[1-9]\d{10,14}$/.test(cleanPhone);
}

function formatMessage(text) {
    const maxLength = 1000;
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function getPageLanguage() {
    const lang = document.documentElement.lang || 'uk';
    return ['uk', 'ru', 'es'].includes(lang) ? lang : 'uk';
}

// Локалізовані тексти
const translations = {
    uk: {
        placeholderDate: 'дд.мм.рррр гг:хх',
        dateFromLabel: 'Дата і час (з):',
        dateToLabel: 'Дата і час (до):',
        carBrand: 'Марка автомобіля',
        validationErrors: {
            dateFrom: 'Будь ласка, оберіть дату та час (з)',
            dateTo: 'Будь ласка, оберіть дату та час (по)',
            dateOrder: 'Дата та час "по" мають бути пізнішими за "з"',
            carNotSelected: 'Марка автомобіля не вибрана',
            invalidPhone: 'Помилка: невірний номер телефону',
            whatsappError: 'Не вдалося відкрити WhatsApp. Спробуйте ще раз або зверніться до підтримки.',
            telegramError: 'Не вдалося відкрити Telegram. Спробуйте ще раз або зверніться до підтримки.',
            mobileError: 'Не вдалося відкрити програму для дзвінків. Спробуйте ще раз.',
            generalError: 'Виникла помилка при відправці повідомлення. Спробуйте ще раз.',
            errorTitle: 'Помилка:'
        }
    },
    ru: {
        placeholderDate: 'дд.мм.гггг чч:мм',
        dateFromLabel: 'Дата и время (с):',
        dateToLabel: 'Дата и время (до):',
        carBrand: 'Марка автомобиля',
        validationErrors: {
            dateFrom: 'Пожалуйста, выберите дату и время (с)',
            dateTo: 'Пожалуйста, выберите дату и время (по)',
            dateOrder: 'Дата и время "по" должны быть позже чем "с"',
            carNotSelected: 'Марка автомобиля не выбрана',
            invalidPhone: 'Ошибка: неверный номер телефона',
            whatsappError: 'Не удалось открыть WhatsApp. Попробуйте еще раз или обратитесь в поддержку.',
            telegramError: 'Не удалось открыть Telegram. Попробуйте еще раз или обратитесь в поддержку.',
            mobileError: 'Не удалось открыть программу для звонков. Попробуйте еще раз.',
            generalError: 'Произошла ошибка при отправке сообщения. Попробуйте еще раз.',
            errorTitle: 'Ошибка:'
        }
    },
    es: {
        placeholderDate: 'dd.mm.aaaa hh:mm',
        dateFromLabel: 'Fecha y hora (desde):',
        dateToLabel: 'Fecha y hora (hasta):',
        carBrand: 'Marca del coche',
        validationErrors: {
            dateFrom: 'Por favor, seleccione fecha y hora (desde)',
            dateTo: 'Por favor, seleccione fecha y hora (hasta)',
            dateOrder: 'La fecha y hora "hasta" debe ser posterior a "desde"',
            carNotSelected: 'Marca del coche no seleccionada',
            invalidPhone: 'Error: número de teléfono inválido',
            whatsappError: 'No se pudo abrir WhatsApp. Inténtelo de nuevo o contacte con soporte.',
            telegramError: 'No se pudo abrir Telegram. Inténtelo de nuevo o contacte con soporte.',
            mobileError: 'No se pudo abrir la aplicación de llamadas. Inténtelo de nuevo.',
            generalError: 'Se produjo un error al enviar el mensaje. Inténtelo de nuevo.',
            errorTitle: 'Error:'
        }
    }
};

function getTranslation(key, lang = null) {
    const currentLang = lang || getPageLanguage();
    const keys = key.split('.');
    let value = translations[currentLang];

    for (const k of keys) {
        value = value?.[k];
    }

    return value || key;
}

function formatDateTime(dateTime, lang = null) {
    const currentLang = lang || getPageLanguage();
    const date = new Date(dateTime);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return {
        date: `${day}.${month}.${date.getFullYear()}`,
        time: `${hours}:${minutes}`
    };
}

function generateFullMessage(carModel, dateFrom, dateTo, lang) {
    if (!dateFrom || !dateTo) {
        const templates = {
            uk: `Вітаю! Мені потрібна допомога з вибором автомобіля.`,
            ru: `Здравствуйте! Нужна помощь с выбором автомобиля.`,
            es: `¡Hola! Necesito ayuda para elegir un coche.`
        };
        return formatMessage(templates[lang]);
    }
    const { date: dateFromFormatted, time: timeFrom } = formatDateTime(dateFrom, lang);
    const { date: dateToFormatted, time: timeTo } = formatDateTime(dateTo, lang);
    const templates = {
        uk: `Вітаю! Зацікавила ${carModel}. Чи можливо забронювати ${dateFromFormatted} на ${timeFrom} по ${dateToFormatted} на ${timeTo}?`,
        ru: `Здравствуйте! Заинтересовала ${carModel}. Можно ли забронировать ${dateFromFormatted} на ${timeFrom} по ${dateToFormatted} на ${timeTo}?`,
        es: `¡Hola! Me interesa ${carModel}. ¿Es posible reservar desde ${dateFromFormatted} a las ${timeFrom} hasta ${dateToFormatted} a las ${timeTo}?`
    };
    return formatMessage(templates[lang]);
}

function generateDisplayMessage(carModel, dateFrom, dateTo, lang = null) {
    const currentLang = lang || getPageLanguage();
    const { date: dateFromFormatted, time: timeFrom } = formatDateTime(dateFrom, currentLang);
    const { date: dateToFormatted, time: timeTo } = formatDateTime(dateTo, currentLang);
    const carBrandText = getTranslation('carBrand', currentLang);
    return `${carBrandText}: ${carModel}, з ${dateFromFormatted} ${timeFrom} по ${dateToFormatted} ${timeTo}`;
}

function generateWhatsAppLink(phone, message) {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    const formattedMessage = encodeURIComponent(message);
    const urls = {
        mobile: `https://wa.me/${cleanPhone}?text=${formattedMessage}`,
        mobileEncoded: `https://wa.me/${cleanPhone}?text=${formattedMessage}`,
        webForced: `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${formattedMessage}`
    };

    if (isMobile()) {
        if (isWhatsAppInstalled()) {
            return urls.mobile;
        } else {
            return urls.mobileEncoded;
        }
    } else {
        return urls.webForced;
    }
}

function generateTelegramLink(phone, message) {
    const formattedMessage = encodeURIComponent(message);
    return `https://t.me/+${phone}?text=${formattedMessage}`;
}

function generateMobileLink(phone) {
    return `tel:+${phone.replace(/[^\d]/g, '')}`;
}

function openLink(link) {
    try {
        const newWindow = window.open(link, '_blank');
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            window.location.href = link;
        }
        return true;
    } catch (error) {
        console.error('Помилка відкриття посилання:', error);
        try {
            window.location.href = link;
            return true;
        } catch (fallbackError) {
            console.error('Fallback помилка:', fallbackError);
            return false;
        }
    }
}

// Оновлення placeholder та labels для полів дати
function updateDatePlaceholders() {
    const lang = getPageLanguage();
    const placeholder = getTranslation('placeholderDate', lang);
    const dateFromLabel = getTranslation('dateFromLabel', lang);
    const dateToLabel = getTranslation('dateToLabel', lang);

    const bookingDateFrom = document.getElementById('bookingDateFrom');
    const bookingDateTo = document.getElementById('bookingDateTo');

    if (bookingDateFrom) {
        bookingDateFrom.setAttribute('placeholder', placeholder);
        // Також можемо оновити title атрибут для кращого UX
        bookingDateFrom.setAttribute('title', placeholder);
    }

    if (bookingDateTo) {
        bookingDateTo.setAttribute('placeholder', placeholder);
        bookingDateTo.setAttribute('title', placeholder);
    }

    // Оновлюємо labels якщо вони існують
    const labelFrom = document.querySelector('label[for="bookingDateFrom"]');
    const labelTo = document.querySelector('label[for="bookingDateTo"]');

    if (labelFrom) {
        labelFrom.textContent = dateFromLabel;
    }

    if (labelTo) {
        labelTo.textContent = dateToLabel;
    }
}

// Показ попап-повідомлення
function showPopupNotification() {
    const popup = document.getElementById('popupNotification');
    if (popup) {
        setTimeout(() => {
            popup.style.display = 'block';
        }, 10000); // 10 секунд
    }
}

// Закриття попап-повідомлення
function closePopupNotification() {
    const popup = document.getElementById('popupNotification');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Відкриття модального вікна для бронювання
function openBookingModal(carModel) {
    try {
        const bookingModal = document.getElementById('bookingModal');
        if (!bookingModal) {
            console.error('Модальне вікно бронювання не знайдено');
            return false;
        }

        window.scrollPosition = window.scrollY;
        bookingModal.style.display = 'block';
        window.selectedCar = carModel || 'Не вказано';

        const bookingDateFrom = document.getElementById('bookingDateFrom');
        const bookingDateTo = document.getElementById('bookingDateTo');
        const messageField = document.getElementById('message');

        if (bookingDateFrom) bookingDateFrom.value = '';
        if (bookingDateTo) bookingDateTo.value = '';

        // Оновлення placeholder та початкового повідомлення з урахуванням мови
        updateDatePlaceholders();

        const lang = getPageLanguage();
        const carBrandText = getTranslation('carBrand', lang);
        if (messageField) {
            messageField.value = window.selectedCar ? `${carBrandText}: ${window.selectedCar}` : '';
        }

        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollPosition}px`;
        document.body.style.width = '100%';

        // Додаємо обробники для оновлення повідомлення
        if (bookingDateFrom && bookingDateTo) {
            bookingDateFrom.addEventListener('change', updateMessageField);
            bookingDateTo.addEventListener('change', updateMessageField);
        }

        return true;
    } catch (error) {
        console.error('Помилка відкриття модального вікна бронювання:', error);
        return false;
    }
}

// Відкриття модального вікна для контакту
function openContactModal() {
    try {
        const contactModal = document.getElementById('contactModal');
        if (!contactModal) {
            console.error('Модальне вікно контакту не знайдено');
            return false;
        }

        window.scrollPosition = window.scrollY;
        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollPosition}px`;
        document.body.style.width = '100%';

        // Закриваємо попап
        closePopupNotification();

        return true;
    } catch (error) {
        console.error('Помилка відкриття модального вікна контакту:', error);
        return false;
    }
}

// Закриття модального вікна
function closeModal(modalId) {
    try {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, window.scrollPosition || 0);

            // Видаляємо обробники подій для бронювання
            if (modalId === 'bookingModal') {
                const bookingDateFrom = document.getElementById('bookingDateFrom');
                const bookingDateTo = document.getElementById('bookingDateTo');
                if (bookingDateFrom) bookingDateFrom.removeEventListener('change', updateMessageField);
                if (bookingDateTo) bookingDateTo.removeEventListener('change', updateMessageField);
            }

            return true;
        }
        return false;
    } catch (error) {
        console.error(`Помилка закриття модального вікна ${modalId}:`, error);
        return false;
    }
}

// Оновлення повідомлення в полі message для бронювання
function updateMessageField() {
    const bookingDateFrom = document.getElementById('bookingDateFrom');
    const bookingDateTo = document.getElementById('bookingDateTo');
    const messageField = document.getElementById('message');
    const lang = getPageLanguage();

    if (bookingDateFrom && bookingDateTo && bookingDateFrom.value && bookingDateTo.value && window.selectedCar) {
        const message = generateDisplayMessage(window.selectedCar, bookingDateFrom.value, bookingDateTo.value, lang);
        if (messageField) {
            messageField.value = message;
        }
    } else {
        const carBrandText = getTranslation('carBrand', lang);
        if (messageField) {
            messageField.value = window.selectedCar ? `${carBrandText}: ${window.selectedCar}` : '';
        }
    }
}

// Функція валідації форми бронювання
function validateBookingForm() {
    const bookingDateFrom = document.getElementById('bookingDateFrom');
    const bookingDateTo = document.getElementById('bookingDateTo');
    const lang = getPageLanguage();
    const errors = [];

    if (!bookingDateFrom || !bookingDateFrom.value) {
        errors.push(getTranslation('validationErrors.dateFrom', lang));
    }

    if (!bookingDateTo || !bookingDateTo.value) {
        errors.push(getTranslation('validationErrors.dateTo', lang));
    }

    if (bookingDateFrom && bookingDateTo && bookingDateFrom.value && bookingDateTo.value) {
        const dateFrom = new Date(bookingDateFrom.value);
        const dateTo = new Date(bookingDateTo.value);
        if (dateTo <= dateFrom) {
            errors.push(getTranslation('validationErrors.dateOrder', lang));
        }
    }

    if (!window.selectedCar) {
        errors.push(getTranslation('validationErrors.carNotSelected', lang));
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Функція відправки повідомлення для WhatsApp (бронювання)
function sendWhatsAppMessage() {
    try {
        const validation = validateBookingForm();
        const lang = getPageLanguage();

        if (!validation.isValid) {
            alert(getTranslation('validationErrors.errorTitle', lang) + '\n' + validation.errors.join('\n'));
            return false;
        }

        const bookingDateFrom = document.getElementById('bookingDateFrom').value;
        const bookingDateTo = document.getElementById('bookingDateTo').value;
        const message = generateFullMessage(window.selectedCar, bookingDateFrom, bookingDateTo, lang);

        const phone = '34643330661';
        if (!validatePhoneNumber(phone)) {
            console.error('Невірний номер телефону:', phone);
            alert(getTranslation('validationErrors.invalidPhone', lang));
            return false;
        }

        const whatsappLink = generateWhatsAppLink(phone, message);
        console.log('Generated WhatsApp link:', whatsappLink);

        const success = openLink(whatsappLink);
        if (success) {
            setTimeout(() => {
                closeModal('bookingModal');
            }, 1000);
            return true;
        } else {
            alert(getTranslation('validationErrors.whatsappError', lang));
            return false;
        }
    } catch (error) {
        console.error('Помилка відправки повідомлення WhatsApp:', error);
        const lang = getPageLanguage();
        alert(getTranslation('validationErrors.generalError', lang));
        return false;
    }
}

// Функція відправки повідомлення для Telegram (бронювання)
function sendTelegramMessage() {
    try {
        const validation = validateBookingForm();
        const lang = getPageLanguage();

        if (!validation.isValid) {
            alert(getTranslation('validationErrors.errorTitle', lang) + '\n' + validation.errors.join('\n'));
            return false;
        }

        const bookingDateFrom = document.getElementById('bookingDateFrom').value;
        const bookingDateTo = document.getElementById('bookingDateTo').value;
        const message = generateFullMessage(window.selectedCar, bookingDateFrom, bookingDateTo, lang);

        const phone = '34643330661';
        if (!validatePhoneNumber(phone)) {
            console.error('Невірний номер телефону:', phone);
            alert(getTranslation('validationErrors.invalidPhone', lang));
            return false;
        }

        const telegramLink = generateTelegramLink(phone, message);
        console.log('Generated Telegram link:', telegramLink);

        const success = openLink(telegramLink);
        if (success) {
            setTimeout(() => {
                closeModal('bookingModal');
            }, 1000);
            return true;
        } else {
            alert(getTranslation('validationErrors.telegramError', lang));
            return false;
        }
    } catch (error) {
        console.error('Помилка відправки повідомлення Telegram:', error);
        const lang = getPageLanguage();
        alert(getTranslation('validationErrors.generalError', lang));
        return false;
    }
}

// Функція для Mobile кнопки (бронювання)
function handleMobileAction() {
    try {
        const validation = validateBookingForm();
        const lang = getPageLanguage();

        if (!validation.isValid) {
            alert(getTranslation('validationErrors.errorTitle', lang) + '\n' + validation.errors.join('\n'));
            return false;
        }

        const phone = '34643330661';
        if (!validatePhoneNumber(phone)) {
            console.error('Невірний номер телефону:', phone);
            alert(getTranslation('validationErrors.invalidPhone', lang));
            return false;
        }

        if (isMobile()) {
            const mobileLink = generateMobileLink(phone);
            console.log('Generated Mobile link:', mobileLink);
            const success = openLink(mobileLink);
            if (success) {
                setTimeout(() => {
                    closeModal('bookingModal');
                }, 1000);
                return true;
            } else {
                alert(getTranslation('validationErrors.mobileError', lang));
                return false;
            }
        } else {
            alert(`Номер телефону для зв'язку: +${phone}`);
            return true;
        }
    } catch (error) {
        console.error('Помилка обробки Mobile дії:', error);
        const lang = getPageLanguage();
        alert(getTranslation('validationErrors.generalError', lang));
        return false;
    }
}

// Функція відправки повідомлення для WhatsApp (контакт)
function sendContactWhatsAppMessage() {
    try {
        const lang = getPageLanguage();
        const message = generateFullMessage(null, null, null, lang);
        const phone = '34643330661';
        if (!validatePhoneNumber(phone)) {
            console.error('Невірний номер телефону:', phone);
            alert(getTranslation('validationErrors.invalidPhone', lang));
            return false;
        }

        const whatsappLink = generateWhatsAppLink(phone, message);
        console.log('Generated WhatsApp link:', whatsappLink);

        const success = openLink(whatsappLink);
        if (success) {
            setTimeout(() => {
                closeModal('contactModal');
            }, 1000);
            return true;
        } else {
            alert(getTranslation('validationErrors.whatsappError', lang));
            return false;
        }
    } catch (error) {
        console.error('Помилка відправки повідомлення WhatsApp (контакт):', error);
        const lang = getPageLanguage();
        alert(getTranslation('validationErrors.generalError', lang));
        return false;
    }
}

// Функція відправки повідомлення для Telegram (контакт)
function sendContactTelegramMessage() {
    try {
        const lang = getPageLanguage();
        const message = generateFullMessage(null, null, null, lang);
        const phone = '34643330661';
        if (!validatePhoneNumber(phone)) {
            console.error('Невірний номер телефону:', phone);
            alert(getTranslation('validationErrors.invalidPhone', lang));
            return false;
        }

        const telegramLink = generateTelegramLink(phone, message);
        console.log('Generated Telegram link:', telegramLink);

        const success = openLink(telegramLink);
        if (success) {
            setTimeout(() => {
                closeModal('contactModal');
            }, 1000);
            return true;
        } else {
            alert(getTranslation('validationErrors.telegramError', lang));
            return false;
        }
    } catch (error) {
        console.error('Помилка відправки повідомлення Telegram (контакт):', error);
        const lang = getPageLanguage();
        alert(getTranslation('validationErrors.generalError', lang));
        return false;
    }
}

// Функція для Mobile кнопки (контакт)
function handleContactMobileAction() {
    try {
        const lang = getPageLanguage();
        const phone = '34643330661';
        if (!validatePhoneNumber(phone)) {
            console.error('Невірний номер телефону:', phone);
            alert(getTranslation('validationErrors.invalidPhone', lang));
            return false;
        }

        if (isMobile()) {
            const mobileLink = generateMobileLink(phone);
            console.log('Generated Mobile link:', mobileLink);
            const success = openLink(mobileLink);
            if (success) {
                setTimeout(() => {
                    closeModal('contactModal');
                }, 1000);
                return true;
            } else {
                alert(getTranslation('validationErrors.mobileError', lang));
                return false;
            }
        } else {
            alert(`Номер телефону для зв'язку: +${phone}`);
            return true;
        }
    } catch (error) {
        console.error('Помилка обробки Mobile дії (контакт):', error);
        const lang = getPageLanguage();
        alert(getTranslation('validationErrors.generalError', lang));
        return false;
    }
}

// Ініціалізація після завантаження DOM
document.addEventListener('DOMContentLoaded', function () {
    try {
        // Показ попапу через 10 секунд
        showPopupNotification();

        // Обробник для закриття попапу по хрестику
        const closePopupButton = document.getElementById('closePopup');
        if (closePopupButton) {
            closePopupButton.onclick = closePopupNotification;
        }

        // Обробник для закриття попапу по кліку поза ним
        const popupNotification = document.getElementById('popupNotification');
        if (popupNotification) {
            popupNotification.onclick = function (event) {
                if (event.target === popupNotification) {
                    closePopupNotification();
                }
            };
        }

        // Обробник для кнопки "Зв'язатися" у попапі
        const contactButton = document.getElementById('contactButton');
        if (contactButton) {
            contactButton.onclick = openContactModal;
        }

        // Обробник закриття модального вікна бронювання
        const closeBookingModalButton = document.getElementById('closeBookingModal');
        if (closeBookingModalButton) {
            closeBookingModalButton.onclick = () => closeModal('bookingModal');
        }

        // Обробник закриття модального вікна контакту
        const closeContactModalButton = document.getElementById('closeContactModal');
        if (closeContactModalButton) {
            closeContactModalButton.onclick = () => closeModal('contactModal');
        }

        // Обробники для кнопок бронювання
        const whatsappButton = document.getElementById('whatsappButton');
        if (whatsappButton) {
            whatsappButton.onclick = sendWhatsAppMessage;
        }

        const telegramButton = document.getElementById('telegramButton');
        if (telegramButton) {
            telegramButton.onclick = sendTelegramMessage;
        }

        const mobileButton = document.getElementById('mobileButton');
        if (mobileButton) {
            mobileButton.onclick = handleMobileAction;
        }

        // Обробники для кнопок контакту
        const contactWhatsappButton = document.getElementById('contactWhatsappButton');
        if (contactWhatsappButton) {
            contactWhatsappButton.onclick = sendContactWhatsAppMessage;
        }

        const contactTelegramButton = document.getElementById('contactTelegramButton');
        if (contactTelegramButton) {
            contactTelegramButton.onclick = sendContactTelegramMessage;
        }

        const contactMobileButton = document.getElementById('contactMobileButton');
        if (contactMobileButton) {
            contactMobileButton.onclick = handleContactMobileAction;
        }

        // Обробка клавіші Escape
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                const bookingModal = document.getElementById('bookingModal');
                const contactModal = document.getElementById('contactModal');
                const popupNotification = document.getElementById('popupNotification');
                if (bookingModal && bookingModal.style.display === 'block') {
                    closeModal('bookingModal');
                }
                if (contactModal && contactModal.style.display === 'block') {
                    closeModal('contactModal');
                }
                if (popupNotification && popupNotification.style.display === 'block') {
                    closePopupNotification();
                }
            }
        });

        console.log('Booking Script ініціалізовано успішно');
    } catch (error) {
        console.error('Помилка ініціалізації:', error);
    }
});

// Експорт функцій в глобальну область
window.openBookingModal = openBookingModal;
window.openContactModal = openContactModal;
window.closeModal = closeModal;
window.sendWhatsAppMessage = sendWhatsAppMessage;
window.sendTelegramMessage = sendTelegramMessage;
window.handleMobileAction = handleMobileAction;
window.sendContactWhatsAppMessage = sendContactWhatsAppMessage;
window.sendContactTelegramMessage = sendContactTelegramMessage;
window.handleContactMobileAction = handleContactMobileAction;
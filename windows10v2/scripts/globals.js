const COMPONENTS = [];
const WINDOWS_FORMS = [];
const TASKBAR_ITEMS = {};

let LANGUAGE_PICKER_IS_OPEN = false;
let LANGUAGE_CHOSEN = 'EN';
let DATE_CONTROL_IS_OPEN = false;
let NOTIFICATION_IS_OPEN = false;

let SYSTEMTHEME = {
    titleBarColor: '#2B2B2B',
    titleBarActiveColor: '#757575'
};

window.addEventListener('load', () => {
    document.body.classList.remove('preload');
});

setInterval(() => {
    let formsLength = WINDOWS_FORMS.length;
    for (let i = 0; i < formsLength; i++) {
        WINDOWS_FORMS[i].alignSizeWithForm();
    }
}, 0);

setInterval(() => {
    let currDate = new Date();
    let year = currDate.getFullYear();
    let dayOfMonth = currDate.getDate();
    let hour = currDate.getHours();
    let minute = currDate.getMinutes();
    let second = currDate.getSeconds();
    let ampm = hour >= 12 ? 'PM' : 'AM';

    let days;
    let months;
    switch (LANGUAGE_CHOSEN) {
        case 'EN':
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            break;
        case 'MN':
            days = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
            months = ['1 Сар', '2 Сар', '3 Сар', '4 Сар', '5 Сар', '6 Сар', '7 Сар', '8 Сар', '9 Сар', '10 Сар', '11 Сар', '12 Сар'];
            break;
    }

    let day = days[currDate.getDay()];
    let month = months[currDate.getMonth()];

    hour = hour % 12;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;
    document.getElementById('_calendarPanelUpperTimerText').textContent = `${hour}:${minute}:${second}`;
    document.getElementById('_calendarPanelUpperHourTypeText').textContent = ampm;
    document.getElementById('_calendarPanelUpperDateText').textContent = `${day}, ${month} ${dayOfMonth}, ${year}`;
    document.getElementById('_calendarPanelLowerMonthYearText').textContent = `${month} ${year}`;
}, 100);

function unfocusAllWinforms() {
    let formsLength = WINDOWS_FORMS.length;
    for (let i = 0; i < formsLength; i++) {
        WINDOWS_FORMS[i].unfocus();
    }
}
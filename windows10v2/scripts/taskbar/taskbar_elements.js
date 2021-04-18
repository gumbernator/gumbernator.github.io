document.getElementById('_taskbar').addEventListener('click', () => {
    unfocusAllWinforms();
});

document.getElementById('_wallpaper').addEventListener('click', () => {
    unfocusAllWinforms();
});

document.getElementById('_systemTray').addEventListener('click', (e) => {
    let panel = document.getElementById('_systemTrayPanel');
    if (panel.style.visibility == 'visible') {
        panel.style.visibility = 'hidden';
        return
    }
    panel.style.visibility = 'visible';
});

document.getElementById('_languagePicker').addEventListener('click', (e) => {
    let panel = document.getElementById('_languagePickerPanel');
    if (LANGUAGE_PICKER_IS_OPEN) {
        panel.className = 'languagePickerPanelClose';
        LANGUAGE_PICKER_IS_OPEN = false;
        return
    }
    panel.className = 'languagePickerPanelOpen';
    LANGUAGE_PICKER_IS_OPEN = true;
});

document.getElementById('_languagePickerOptionEN').addEventListener('click', (e) => {
    languageChange('EN');
    document.getElementById('_languagePicker').click();
});

document.getElementById('_languagePickerOptionMN').addEventListener('click', (e) => {
    languageChange('MN');
    document.getElementById('_languagePicker').click();
});

document.getElementById('_dateControl').addEventListener('click', (e) => {
    let panel = document.getElementById('_calendarPanel');
    if (DATE_CONTROL_IS_OPEN) {
        panel.className = 'calendarPanelClose';
        DATE_CONTROL_IS_OPEN = false;
        return;
    }
    panel.className = 'calendarPanelOpen';
    DATE_CONTROL_IS_OPEN = true;
});

document.getElementById("_notificationCenter").addEventListener('click', (e) => {
    let panel = document.getElementById("_notificationPanel");
    if (NOTIFICATION_IS_OPEN) {
        panel.className = 'notificationPanelClose';
        NOTIFICATION_IS_OPEN = false;
        return;
    }
    panel.className = 'notificationPanelOpen';
    NOTIFICATION_IS_OPEN = true;
});

function languageChange(lang) {
    LANGUAGE_CHOSEN = lang;
    switch (lang) {
        case 'EN':
            document.getElementById('_languagePickerText').textContent = 'ENG';
            document.getElementById('_languagePickerOptionEN').className = 'languagePickerChosenEN';
            document.getElementById('_languagePickerOptionMN').className = 'languagePickerOptionMN';
            for (const elementId in LANG_ENGLISH) {
                document.getElementById(elementId).textContent = LANG_ENGLISH[elementId];
            }
            break;
        case 'MN':
            document.getElementById('_languagePickerText').textContent = 'МОН';
            document.getElementById('_languagePickerOptionEN').className = 'languagePickerOptionEN';
            document.getElementById('_languagePickerOptionMN').className = 'languagePickerChosenMN';
            for (const elementId in LANG_MONGOLIAN) {
                document.getElementById(elementId).textContent = LANG_MONGOLIAN[elementId];
            }
            break;
    }
}
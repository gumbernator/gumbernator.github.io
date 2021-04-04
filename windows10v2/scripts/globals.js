const COMPONENTS = [];
const WINDOWS_FORMS = [];
const TASKBAR_ITEMS = {};

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

function unfocusAllWinforms() {
    let formsLength = WINDOWS_FORMS.length;
    for (let i = 0; i < formsLength; i++) {
        WINDOWS_FORMS[i].unfocus();
    }
}

document.getElementById('_taskbar').addEventListener('click', (e) => {
    unfocusAllWinforms();
});

document.getElementById('_wallpaper').addEventListener('click', (e) => {
    unfocusAllWinforms();
});
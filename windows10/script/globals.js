const ALLCOMPONENTS = [];
let Z_INDEX_TASKBAR = 1000;
let WINFORMS = [];

let systemTheme = {
    titleBarColor: '#2B2B2B',
    titleBarActiveColor: '#757575'
};

window.addEventListener('resize', () => {
    let componentCount = ALLCOMPONENTS.length;
    for (let i = 0; i < componentCount; i++) {
        ALLCOMPONENTS[i].reposition();
    }
});
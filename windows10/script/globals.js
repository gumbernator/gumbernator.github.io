const ALLCOMPONENTS = [];
let Z_INDEX = 0;

let systemTheme = {
    color: '#444'
};

window.onresize = (e) => {
    let componentCount = ALLCOMPONENTS.length;
    for (let i = 0; i < componentCount; i++) {
        ALLCOMPONENTS[i].reposition();
    }
}
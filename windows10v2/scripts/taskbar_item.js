class TaskbarItem {

    _state = 1;
    app;
    static states = {
        unopened: 1,
        opened: 2,
        focused: 3
    };

    constructor(appId, iconPath, position, pinned, appClass) {
        this.appId = appId;
        this.iconPath = iconPath;
        this.position = position;
        this.pinned = pinned;
        this.appClass = appClass;

        this.elmnt = document.createElement('div');
        this.elmnt.style.position = 'absolute';
        this.elmnt.style.left = `calc(4.5vh + ${position} * (1px + 4.5vh))`;
        this.elmnt.style.width = '4.5vh';
        this.elmnt.style.height = '100%';
        this.elmnt.style.backgroundImage = `url(${iconPath})`;
        this.elmnt.style.backgroundSize = 'contain';
        this.elmnt.style.backgroundRepeat = 'no-repeat';
        this.elmnt.style.backgroundPosition = 'center';
        this.elmnt.style.userSelect = 'none';
        this.elmnt.style.transition = '100ms';
        this.elmnt.style.zIndex = '999';

        this.indicator = document.createElement('div');
        this.elmnt.appendChild(this.indicator);

        document.getElementById('_taskbar').appendChild(this.elmnt);

        this.state = TaskbarItem.states.unopened;

        TASKBAR_ITEMS[appId] = this;
    }

    set state(newState) {
        this._state = newState;
        switch (newState) {
            case TaskbarItem.states.unopened:
                this.elmnt.className = 'taskbarItemUnopened';
                this.elmnt.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.app = this.appClass.create(this);
                };
                break;
            case TaskbarItem.states.opened:
                this.elmnt.className = 'taskbarItemOpened';
                this.elmnt.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.app.expand();
                    this.app.focus();
                };
                break;
            case TaskbarItem.states.focused:
                this.elmnt.className = 'taskbarItemFocused';
                this.elmnt.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.app.unfocus();
                    this.app.minimize();
                };
                break;
            default:
                console.log(`TaskbarItem has no state called: ${newState}`);
        }
    }

    remove() {
        let removedPosition = this.position;
        for (const [key, item] of Object.entries(TASKBAR_ITEMS)) {
            if (item.position > removedPosition) {
                console.log('found');
                TASKBAR_ITEMS[key].position -= 1;
                TASKBAR_ITEMS[key].elmnt.style.left = `calc(4.5vh + ${TASKBAR_ITEMS[key].position} * (1px + 4.5vh))`;
            }
        }
        this.elmnt.remove();
    }
}
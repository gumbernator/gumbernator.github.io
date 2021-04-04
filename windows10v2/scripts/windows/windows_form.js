class WindowsForm {
    appId;

    top;
    left;
    width;
    height;

    titleHeight = '3vh';
    titleMinWidth = '15vw';
    formMinHeight = '10vh';
    modifiersWidth = '2.4vw';

    titleBar;
    titleIcon;
    titleText;
    closeIcon;
    expandAndShrinkIcon;
    minimizeIcon;

    taskbarItem;

    form;

    windowIndex;
    maximized;

    constructor(params) {
        this.appId = params.appId;
        this.taskbarItem = params.taskbarItem;
        this.top = params.top;
        this.left = params.left;
        this.width = params.width;
        this.height = params.height;
        this.maximized = false;

        this.titleBar = this.createTitleBar();
        this.form = this.createForm();

        this.titleBar.setDraggable(true, () => {
            this.form.style.left = this.titleBar.style.left;
            this.form.style.top = `calc(${this.titleBar.style.height} + ${this.titleBar.style.top})`;
        });

        if (!this.taskbarItem) {
            this.taskbarItem = new TaskbarItem(this.appId, params.iconPath, Object.keys(TASKBAR_ITEMS).length, false, null);
            this.taskbarItem.app = this;
            this.taskbarItem.state = TaskbarItem.states.opened;
        }

        WINDOWS_FORMS.push(this);
        this.windowIndex = WINDOWS_FORMS.length - 1;

        this.focus();
    }

    focus() {
        for (let i = 0; i < WINDOWS_FORMS.length - 1; i++) {
            if (i >= this.windowIndex) {
                WINDOWS_FORMS[i] = WINDOWS_FORMS[i + 1];
            }
        }
        WINDOWS_FORMS[WINDOWS_FORMS.length - 1] = this;

        for (let i = 0; i < WINDOWS_FORMS.length; i++) {
            WINDOWS_FORMS[i].windowIndex = i;
            WINDOWS_FORMS[i].zIndex = i;
            WINDOWS_FORMS[i].unfocus();
        }

        this.titleBar.style.backgroundColor = SYSTEMTHEME.titleBarActiveColor;
        this.form.style.borderColor = SYSTEMTHEME.titleBarActiveColor;

        this.taskbarItem.state = TaskbarItem.states.focused;
    }

    unfocus() {
        this.titleBar.style.backgroundColor = SYSTEMTHEME.titleBarColor;
        this.form.style.borderColor = SYSTEMTHEME.titleBarColor;

        this.taskbarItem.state = TaskbarItem.states.opened;
    }

    minimize() {
        this.titleBar.element.classList.add('minimizeWindow_0');
        this.form.element.classList.add('minimizeWindow_0');
        this.unfocus();
    }

    maximize() {
        this.top = this.titleBar.style.top;
        this.left = this.titleBar.style.left;
        this.width = this.form.style.width;
        this.height = this.form.style.height;

        this.titleBar.style.top = '0px';
        this.titleBar.style.left = '0px';
        this.titleBar.style.width = '100%';
        this.form.style.top = this.titleBar.style.height;
        this.form.style.left = '0px';
        this.form.style.width = '100%';
        this.form.style.height = `calc(100vh - ${this.titleBar.style.height})`;

        this.focus();
    }

    expand() {
        this.titleBar.element.classList.remove('minimizeWindow_0');
        this.form.element.classList.remove('minimizeWindow_0');
        this.focus();
    }

    shrink() {
        this.titleBar.style.top = this.top;
        this.titleBar.style.left = this.left;
        this.titleBar.style.width = this.width;
        this.form.style.top = `calc(${this.top} + ${this.titleBar.style.height})`;
        this.form.style.left = this.left;
        this.form.style.width = this.width;
        this.form.style.height = this.height;
    }

    close() {
        WINDOWS_FORMS.splice(this.windowIndex, 1);
        this.titleBar.removeElement();
        this.form.removeElement();
        this.titleBar = null;
        this.form = null;

        if (this.taskbarItem.pinned) {
            this.taskbarItem.state = TaskbarItem.states.unopened;
        } else {
            this.taskbarItem.remove();
            delete TASKBAR_ITEMS[this.appId];
        }
    }

    createTitleBar() {
        let titlebar = new AbsoluteDivComponent({
            styles: {
                top: this.top,
                left: this.left,
                width: this.width,
                height: this.titleHeight,
                minWidth: this.titleMinWidth,
                backgroundColor: SYSTEMTHEME.titleBarColor,
                userSelect: 'none',
                zIndex: this.windowIndex
            },
            events: {
                mousedown: () => { this.focus(); },
                dblclick: () => {
                    if (this.maximized) {
                        this.shrink();
                        this.maximized = false;
                    } else {
                        this.maximize();
                        this.maximized = true;
                    }
                }
            }
        });

        this.closeIcon = new AbsoluteDivComponent({
            properties: {
                className: 'closeButton'
            },
            styles: {
                top: '0px',
                right: `calc(0 * ${this.modifiersWidth})`,
                width: this.modifiersWidth,
                height: this.titleHeight,
                backgroundImage: 'url(./vectors/cancel.svg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                userSelect: 'none'
            },
            events: {
                click: () => { this.close(); }
            }
        });

        this.expandAndShrinkIcon = new AbsoluteDivComponent({
            properties: {
                className: 'shrinkAndExpandButton'
            },
            styles: {
                top: '0px',
                right: `calc(1 * ${this.modifiersWidth})`,
                width: this.modifiersWidth,
                height: this.titleHeight,
                backgroundImage: 'url(./vectors/expand-shrink.svg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                userSelect: 'none'
            },
            events: {
                click: () => {
                    if (this.maximized) {
                        this.shrink();
                        this.maximized = false;
                    } else {
                        this.maximize();
                        this.maximized = true;
                    }
                }
            }
        });

        this.minimizeIcon = new AbsoluteDivComponent({
            properties: {
                className: 'minimizeButton'
            },
            styles: {
                top: '0px',
                right: `calc(2 * ${this.modifiersWidth})`,
                width: this.modifiersWidth,
                height: this.titleHeight,
                backgroundImage: 'url(./vectors/minimize.svg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                userSelect: 'none'
            },
            events: {
                click: () => {
                    this.minimize();
                }
            }
        });

        titlebar.addChildComponent(this.closeIcon);
        titlebar.addChildComponent(this.expandAndShrinkIcon);
        titlebar.addChildComponent(this.minimizeIcon);

        return titlebar;
    }

    createForm() {
        let form = new AbsoluteDivComponent({
            styles: {
                top: `calc(${this.titleBar.style.top} + ${this.titleBar.style.height})`,
                left: this.titleBar.style.left,
                width: this.width,
                height: this.height,
                minWidth: this.titleMinWidth,
                minHeight: this.formMinHeight,
                backgroundColor: '#191919',
                userSelect: 'none',
                zIndex: this.windowIndex,
                borderLeft: 'solid 1px ' + SYSTEMTHEME.titleBarColor,
                borderRight: 'solid 1px ' + SYSTEMTHEME.titleBarColor,
                borderBottom: 'solid 1px ' + SYSTEMTHEME.titleBarColor,
                boxSizing: 'border-box',
                resize: 'both',
                overflow: 'hidden'
            },
            events: {
                mousedown: () => { this.focus(); }
            }
        });

        return form;
    }

    alignSizeWithForm() {
        this.titleBar.style.width = this.form.style.width;
    }

    set zIndex(idx) {
        this.windowIndex = idx;
        this.titleBar.style.zIndex = idx;
        this.titleBar.style.backgroundColor = SYSTEMTHEME.titleBarColor;
        this.form.style.zIndex = idx;
        this.form.style.borderColor = SYSTEMTHEME.titleBarColor;
    }
}
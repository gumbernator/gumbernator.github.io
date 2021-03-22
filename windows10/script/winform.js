class WinForm {
    top;
    left;
    width;
    height;
    iconPath;

    titleHeight = '3vh';
    titleMinWidth = '15vw';
    formMinHeight = '10vh';
    modifiersWidth = '2.4vw';

    titleBar;
    form;

    winformsIndex;
    maximized;

    constructor(params) {
        this.top = params.top;
        this.left = params.left;
        this.width = params.width;
        this.height = params.height;
        this.iconPath = params.iconPath;
        this.maximized = false;

        if (params.iconPath) {
            this.titleBar = this.createTitleBar(params.iconPath);
        }

        this.form = this.createForm();

        WINFORMS.push(this);
        this.winformsIndex = WINFORMS.length - 1;
    }

    focus() {
        for (let i = this.winformsIndex; i < WINFORMS.length - 1; i++) {
            WINFORMS[i] = WINFORMS[i + 1];
            WINFORMS[i].zIndex = WINFORMS[i].winformsIndex - 1;
        }
        WINFORMS[WINFORMS.length - 1] = this;
        this.winformsIndex = WINFORMS.length - 1;
        this.zIndex = this.winformsIndex;

        this.titleBar.element.style.backgroundColor = systemTheme.titleBarActiveColor;
        this.form.element.style.borderColor = systemTheme.titleBarActiveColor;
    }

    createTitleBar(iconPath) {
        let titlebar = new Component({
            tag: 'div',
            styles: {
                top: this.top,
                left: this.left,
                width: this.width,
                height: this.titleHeight,
                minWidth: this.titleMinWidth,
                backgroundColor: systemTheme.titleBarColor,
                userSelect: 'none',
                zIndex: this.winformsIndex
            },
            events: {
                mousedown: () => { this.focus(); }
            }
        });

        let formIcon = new Component({
            tag: 'div',
            styles: {
                top: '0px',
                left: '0px',
                width: this.titleHeight,
                height: this.titleHeight,
                backgroundImage: `url(${iconPath})`,
                backgroundSize: 'contain',
                userSelect: 'none'
            }
        });
        titlebar.addChildComponent(formIcon);

        let cancelIcon = new Component({
            tag: 'div',
            styles: {
                top: '0px',
                right: `calc(0 * ${this.modifiersWidth})`,
                width: this.modifiersWidth,
                height: this.titleHeight,
                backgroundImage: 'url(./vector_graphics/cancel.svg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                userSelect: 'none'
            },
            events: {
                mouseenter: () => { cancelIcon.element.className = 'closeiconenterclass'; },
                mouseleave: () => { cancelIcon.element.className = 'closeiconleaveclass'; },
                click: () => {
                    WINFORMS.splice(this.winformsIndex, 1);
                    this.titleBar.removeElement();
                    this.form.removeElement();
                    this.titleBar = null;
                    this.form = null;
                }
            }
        });

        let expandAndShrinkIcon = new Component({
            tag: 'div',
            styles: {
                top: '0px',
                rigth: '0px',
                width: this.modifiersWidth,
                height: this.titleHeight,
                backgroundImage: 'url(./vector_graphics/expand-shrink.svg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                userSelect: 'none'
            },
            place: {
                rightToLeftOf: cancelIcon
            },
            events: {
                mouseenter: () => { expandAndShrinkIcon.element.className = 'taskiconenterclass'; },
                mouseleave: () => { expandAndShrinkIcon.element.className = 'taskiconleaveclass'; },
                click: () => {
                    if (this.maximized) {

                    }
                }
            }
        });

        let minimizeIcon = new Component({
            tag: 'div',
            styles: {
                top: '0px',
                rigth: '0px',
                width: this.modifiersWidth,
                height: this.titleHeight,
                backgroundImage: 'url(./vector_graphics/minimize.svg)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                userSelect: 'none'
            },
            events: {
                mouseenter: () => { minimizeIcon.element.className = 'taskiconenterclass'; },
                mouseleave: () => { minimizeIcon.element.className = 'taskiconleaveclass'; }
            },
            place: {
                rightToLeftOf: expandAndShrinkIcon
            }
        });

        titlebar.addChildComponent(cancelIcon);
        titlebar.addChildComponent(expandAndShrinkIcon);
        titlebar.addChildComponent(minimizeIcon);

        return titlebar;
    }

    createForm() {
        let form = new Component({
            tag: 'div',
            styles: {
                width: this.width,
                height: this.height,
                minWidth: this.titleMinWidth,
                minHeight: this.formMinHeight,
                backgroundColor: '#191919',
                userSelect: 'none',
                zIndex: this.winformsIndex,
                border: 'solid 1px ' + systemTheme.titleBarColor,
                boxSizing: 'border-box',
                resize: 'both',
                overflow: 'auto'
            },
            place: {
                topToBottomOf: this.titleBar,
                leftToLeftOf: this.titleBar
            },
            events: {
                mousedown: () => { this.focus(); }
            }
        });
        this.titleBar.setDraggable(true, () => {
            form.reposition();
            this.focus();
        });

        return form;
    }

    alignSizeWithForm() {
        let _width = this.form.element.style.width.replace('px', '');
        let _height = this.form.element.style.height.replace('px', '');
        if (this.titleBar) {
            this.titleBar.setStyle({ width: ((_width / window.innerWidth) * 100) + 'vw' });
        }
        this.form.setStyle({ width: _width });
        this.form.setStyle({ height: _height });
    }

    set zIndex(idx) {
        this.winformsIndex = idx;
        if (this.titleBar) {
            this.titleBar.element.style.zIndex = idx;
            this.titleBar.element.style.backgroundColor = systemTheme.titleBarColor;
        }
        this.form.element.style.zIndex = idx;
        this.form.element.style.borderColor = systemTheme.titleBarColor;
    }
}
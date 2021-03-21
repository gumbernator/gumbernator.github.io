class WinForm {
    top;
    left;
    width;
    height;
    iconPath;
    titleBar;

    titleHeight = '3vh';
    titleMinWidth = '15vw';
    modifiersWidth = '2.4vw';

    form;

    constructor(params) {
        this.top = params.top;
        this.left = params.left;
        this.width = params.width;
        this.height = params.height;
        this.iconPath = params.iconPath;

        if (params.iconPath) {
            this.titleBar = this.createTitleBar(params.iconPath);
        }

        this.form = this.createForm();
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
                backgroundColor: systemTheme.color,
                userSelect: 'none'
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
            events: {
                mouseenter: () => { expandAndShrinkIcon.element.className = 'taskiconenterclass'; },
                mouseleave: () => { expandAndShrinkIcon.element.className = 'taskiconleaveclass'; }
            },
            place: {
                rightToLeftOf: cancelIcon
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
                backgroundColor: 'grey',
                userSelect: 'none'
            },
            place: {
                topToBottomOf: this.titleBar,
                leftToLeftOf: this.titleBar
            }
        });
        this.titleBar.setDraggable(true, () => { form.reposition() })

        return form;
    }
}
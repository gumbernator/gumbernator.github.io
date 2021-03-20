class WinForm {
    top;
    left;
    width;
    height;
    iconPath;

    titleHeight = '3vh';
    titleMinWidth = '15vw';
    modifiersWidth = '2.4vw';

    formBody;

    constructor(params) {
        this.top = params.top;
        this.left = params.left;
        this.width = params.width;
        this.height = params.height;
        this.iconPath = params.iconPath;

        if (params.iconPath) {
            this.titleBar = this.createTitleBar(params.iconPath);
        }
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
                mouseleave: () => { cancelIcon.element.className = 'closeiconleaveclass'; }
            }
        });

        let expandAndShrinkIcon = new Component({
            tag: 'div',
            styles: {
                top: '0px',
                right: `calc(1 * ${this.modifiersWidth})`,
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
            }
        });

        let minimizeIcon = new Component({
            tag: 'div',
            styles: {
                top: '0px',
                right: `calc(2 * ${this.modifiersWidth})`,
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
        });

        titlebar.addChildComponent(cancelIcon);
        titlebar.addChildComponent(expandAndShrinkIcon);
        titlebar.addChildComponent(minimizeIcon);

        return titlebar;
    }
}
class Taskbar {
    taskbarWidth = '4.5vh';
    taskbarHeight = '4.5vh';
    taskbarMinHeight = '30px';

    notificationCenterWidth = '4vh';
    notificationCenterMinWidth = '25px';

    calendarCenterWidth = '6.5vh';
    calendarCenterMinWidth = '45px';

    languageSettingWidth = '3.5vh';
    languageSettingMinWidth = '25px';

    systemTrayWidth = '2.5vh';
    systemTrayMinWidth = '20px';

    items = [];

    constructor() {
        // essentials (panel, start, bottom-right utils)
        // must be ordered
        this.backPanel = this.createBackPanel();
        this.startButton = this.createStartButton();
        this.desktopCorner = this.createDesktopCorner();
        this.notificationCenter = this.createNotificationCenter();
        this.calendarCenter = this.createCalendarCenter();
        this.languageSetting = this.createLanguageSetting();
        this.systemTray = this.createSystemTray();

        // taskbar items
        this.addTaskbarItem('./vector_graphics/icons8-microsoft-edge.svg');
        this.addTaskbarItem('./vector_graphics/email.svg');
        this.addTaskbarItem('./vector_graphics/icons8-folder.svg');
        this.addTaskbarItem('./vector_graphics/icons8-photos.svg');
    }

    createBackPanel() {
        let backPanel = new Component({
            tag: 'div',
            styles: {
                left: '0px',
                bottom: '0px',
                width: '100vw',
                height: this.taskbarHeight,
                minHeight: this.taskbarMinHeight,
                backdropFilter: 'blur(20px) brightness(20%) contrast(80%)',
                userSelect: 'none'
            }
        });
        return backPanel;
    }

    createStartButton() {
        let startButton = new Component({
            tag: 'div',
            styles: {
                bottom: '0px',
                width: this.taskbarWidth,
                height: this.taskbarHeight,
                minWidth: this.taskbarMinHeight,
                minHeight: this.taskbarMinHeight,
                backgroundImage: `url("./vector_graphics/icons8-windows-10-start.svg")`,
                backgroundSize: 'contain',
                userSelect: 'none'
            },
            place: {
                leftToLeftOf: this.backPanel
            },
            events: {
                mouseenter: () => { startButton.element.className = 'startenterclass'; },
                mouseleave: () => { startButton.element.className = 'startleaveclass'; }
            }
        });
        return startButton;
    }

    createDesktopCorner() {
        let desktopCorner = new Component({
            tag: 'div',
            styles: {
                bottom: '0px',
                width: '4px',
                height: this.taskbarHeight,
                minWidth: '4px',
                minHeight: this.taskbarMinHeight,
                backgroundColor: 'transparent',
                borderLeft: '1px solid grey',
                userSelect: 'none'
            },
            place: {
                rightToRightOf: this.backPanel
            },
            events: {
                mouseenter: () => { desktopCorner.element.className = 'taskiconenterclass'; },
                mouseleave: () => { desktopCorner.element.className = 'taskiconleaveclass'; }
            }
        });
        return desktopCorner;
    }

    createNotificationCenter() {
        let notificationCenter = new Component({
            tag: 'div',
            styles: {
                right: '8px',
                bottom: '0px',
                width: this.notificationCenterWidth,
                height: this.taskbarHeight,
                minWidth: this.notificationCenterMinWidth,
                minHeight: this.taskbarMinHeight,
                backgroundImage: `url(./vector_graphics/notification-filled.svg)`,
                backgroundSize: 'contain',
                userSelect: 'none'
            },
            place: {
                rightToLeftOf: this.desktopCorner
            },
            events: {
                mouseenter: () => { notificationCenter.element.className = 'taskiconenterclass'; },
                mouseleave: () => { notificationCenter.element.className = 'taskiconleaveclass'; }
            }
        });
        return notificationCenter;
    }

    createCalendarCenter() {
        let currDate = new Date();

        let calendarCenter = new Component({
            tag: 'div',
            styles: {
                right: '1px',
                bottom: '0px',
                width: this.calendarCenterWidth,
                height: this.taskbarHeight,
                minWidth: this.calendarCenterMinWidth,
                minHeight: this.taskbarMinHeight,
                color: 'white',
                fontSize: `calc(0.4vw + 0.5vh)`,
                fontFamily: 'SegoeUILight',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none'
            },
            place: {
                rightToLeftOf: this.notificationCenter
            },
            events: {
                mouseenter: () => { calendarCenter.element.className = 'taskiconenterclass'; },
                mouseleave: () => { calendarCenter.element.className = 'taskiconleaveclass'; }
            },
            children: [
                new Component({
                    tag: 'div',
                    styles: {
                        top: '0.1vh',
                        height: '50%'
                    },
                    properties: {
                        textContent: currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        className: 'nohighlight'
                    }
                }),
                new Component({
                    tag: 'div',
                    styles: {
                        bottom: '0.1vh',
                        height: '50%'
                    },
                    properties: {
                        textContent: currDate.toLocaleDateString(),
                        className: 'nohighlight'
                    }
                })
            ]
        });

        return calendarCenter;
    }

    createLanguageSetting() {
        let languageSetting = new Component({
            tag: 'div',
            styles: {
                right: '1px',
                bottom: '0px',
                width: this.languageSettingWidth,
                height: this.taskbarHeight,
                minWidth: this.languageSettingMinWidth,
                minHeight: this.taskbarMinHeight,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none'
            },
            place: {
                rightToLeftOf: this.calendarCenter
            },
            events: {
                mouseenter: () => { languageSetting.element.className = 'taskiconenterclass'; },
                mouseleave: () => { languageSetting.element.className = 'taskiconleaveclass'; }
            },
            children: [
                new Component({
                    tag: 'div',
                    styles: {
                        paddingBottom: '0.5vh',
                        fontSize: `calc(0.4vw + 0.55vh)`,
                        fontFamily: 'SegoeUILight'
                    },
                    properties: {
                        textContent: 'ENG',
                        className: 'nohighlight'
                    }
                })
            ]
        });
        return languageSetting;
    }

    createSystemTray() {
        let systemTray = new Component({
            tag: 'div',
            styles: {
                rigth: '1px',
                bottom: '0px',
                width: this.systemTrayWidth,
                height: this.taskbarHeight,
                minWidth: this.systemTrayMinWidth,
                minHeight: this.taskbarMinHeight,
                background: `url(./vector_graphics/chevron-up.svg) no-repeat center`,
                userSelect: 'none'
            },
            events: {
                mouseenter: () => { systemTray.element.className = 'taskiconenterclass'; },
                mouseleave: () => { systemTray.element.className = 'taskiconleaveclass'; }
            },
            place: {
                rightToLeftOf: this.languageSetting
            }
        });
        return systemTray;
    }

    addTaskbarItem(iconPath) {
        let leftSideItem;
        if (this.items.length == 0) {
            leftSideItem = this.startButton;
        } else {
            leftSideItem = this.items[this.items.length - 1];
        }

        let item = new Component({
            tag: 'div',
            styles: {
                left: '2px',
                bottom: '0px',
                width: this.taskbarWidth,
                height: this.taskbarHeight,
                minWidth: this.taskbarMinHeight,
                minHeight: this.taskbarMinHeight,
                backgroundImage: `url(${iconPath})`,
                backgroundSize: 'contain',
                userSelect: 'none'
            },
            place: {
                leftToRightOf: leftSideItem
            },
            events: {
                mouseenter: () => { item.element.className = 'taskiconenterclass'; },
                mouseleave: () => { item.element.className = 'taskiconleaveclass'; }
            }
        });
        this.items.push(item);
    }
}
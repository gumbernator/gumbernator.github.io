class Component {
    tag = 'div';
    properties = {};
    styles = {};
    placement = {};
    children = {};

    element;

    constructor(params) {
        this.tag = params.tag;
        this.element = document.createElement(this.tag);

        for (const [key, value] of Object.entries(params)) {
            if (key == 'tag') {
                this.tag = value;
            }

            if (key == 'properties') {
                for (const [propertyKey, propertyValue] of Object.entries(value)) {
                    this.properties[propertyKey] = propertyValue;
                }
            }

            if (key == 'place') {
                for (const [placeKey, placeValue] of Object.entries(value)) {
                    this.placement[placeKey] = placeValue;
                }
            }

            if (key == 'styles') {
                for (const [styleKey, styleValue] of Object.entries(value)) {
                    this.styles[styleKey] = styleValue;
                }
            }

            if (key == 'events') {
                for (const [eventName, eventFunc] of Object.entries(value)) {
                    this.element.addEventListener(eventName, eventFunc);
                }
            }

            if (key == 'children') {
                value.forEach((child) => { this.element.appendChild(child.element) });
            }
        }

        this.reposition();
        document.body.appendChild(this.element);

        ALLCOMPONENTS.push(this);
    }

    addChildComponent(childComp) {
        this.element.appendChild(childComp.element);
    }

    reposition() {
        this.element.style.position = 'absolute';

        for (const [key, value] of Object.entries(this.styles)) {
            this.element.style[key] = value;
        }

        for (const [propertyKey, propertyValue] of Object.entries(this.properties)) {
            this.element[propertyKey] = propertyValue;
        }

        if (this.placement.leftToLeftOf) {
            this.element.style.left = `calc(${this.placement.leftToLeftOf.element.getBoundingClientRect().left}px + ${this.styles.left || '0px'})`;
        }
        if (this.placement.leftToRightOf) {
            this.element.style.left = `calc(${this.placement.leftToRightOf.element.getBoundingClientRect().right}px + ${this.styles.left || '0px'})`;
        }
        if (this.placement.rightToLeftOf) {
            this.element.style.right = `calc(${window.innerWidth}px - ${this.placement.rightToLeftOf.element.getBoundingClientRect().left}px + ${this.styles.right || '0px'}`;
        }
        if (this.placement.rightToRightOf) {
            this.element.style.right = `calc(${window.innerWidth}px - ${this.placement.rightToRightOf.element.getBoundingClientRect().right}px + ${this.styles.right || '0px'}`;
        }
        if (this.placement.topToBottomOf) {
            this.element.style.top = `calc(${window.innerHeight}px - ${this.placement.topToBottomOf.element.getBoundingClientRect().bottom}px + ${this.styles.top || '0px'}`;
        }
        if (this.placement.topToTopOf) {
            this.element.style.top = `calc(${window.innerHeight}px - ${this.placement.topToTopOf.element.getBoundingClientRect().top}px + ${this.styles.top || '0px'}`;
        }
        if (this.placement.bottomToTopOf) {
            this.element.style.bottom = `calc(${window.innerHeight}px - ${this.placement.bottomToTopOf.element.getBoundingClientRect().top}px - ${this.styles.bottom || '0px'}`;
        }
        if (this.placement.bottomToBottomOf) {
            this.element.style.bottom = `calc(${window.innerHeight}px - ${this.placement.bottomToBottomOf.element.getBoundingClientRect().bottom}px - ${this.styles.bottom || '0px'}`;
        }
    }

    get dimensions() {
        let boundingRect = this.element.getBoundingClientRect();
        return [boundingRect.top, boundingRect.left, boundingRect.right - boundingRect.left, boundingRect.bottom - boundingRect.top];
    }
}
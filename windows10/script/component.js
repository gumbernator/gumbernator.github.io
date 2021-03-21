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
            this.element.style.left = `calc(${this.placement.leftToLeftOf.left || '0px'} + ${this.styles.left || '0px'})`;
        }
        if (this.placement.leftToRightOf) {
            this.element.style.left = `calc(${this.placement.leftToRightOf.left || '0px'} + ${this.placement.leftToRightOf.width} + ${this.styles.left || '0px'})`;
        }
        if (this.placement.rightToLeftOf) {
            this.element.style.right = `calc(${this.placement.rightToLeftOf.right} + ${this.placement.rightToLeftOf.width} + ${this.styles.right || '0px'})`;
        }
        if (this.placement.rightToRightOf) {
            this.element.style.right = `calc(${this.placement.rightToRightOf.right} + ${this.styles.right || '0px'})`;
        }
        if (this.placement.topToBottomOf) {
            this.element.style.top = `calc(${this.placement.topToBottomOf.top} + ${this.placement.topToBottomOf.height} + ${this.styles.top || '0px'})`;
        }
        if (this.placement.topToTopOf) {
            this.element.style.top = `calc(${this.placement.topToTopOf.top} + ${this.styles.top || '0px'})`;
        }
        if (this.placement.bottomToTopOf) {
            this.element.style.bottom = `calc(${this.placement.bottomToTopOf.bottom} + ${this.placement.topToBottomOf.height} + ${this.styles.bottom || '0px'})`;
        }
        if (this.placement.bottomToBottomOf) {
            this.element.style.bottom = `calc(${this.placement.bottomToBottomOf.bottom} + ${this.styles.bottom || '0px'})`;
        }
    }

    setDraggable(isDraggable, onDrag) {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        let component = this;
        if (isDraggable) {
            component.element.addEventListener('mousedown', dragMouseDown);

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position
                pos1 = pos3 - Math.min(window.innerWidth, Math.max(0, e.clientX));
                pos2 = pos4 - Math.min(window.innerHeight, Math.max(0, e.clientY));
                pos3 = Math.min(window.innerWidth, Math.max(0, e.clientX));
                pos4 = Math.min(window.innerHeight, Math.max(0, e.clientY));
                // set the element's new position:
                component.styles.top = (component.element.offsetTop - pos2) * 100 / window.innerHeight + "vh";
                component.styles.left = (component.element.offsetLeft - pos1) * 100 / window.innerWidth + 'vw';
                component.reposition();
                if (onDrag) {
                    onDrag();
                }
            }

            function closeDragElement() {
                // stop moving when mouse button is released
                document.onmouseup = null;
                document.onmousemove = null;
            }
        } else {
            this.element.onmousedown = null;
        }
    }

    removeElement() {
        this.element.remove();
    }

    get dimensions() {
        let boundingRect = this.element.getBoundingClientRect();
        return [boundingRect.top, boundingRect.left, boundingRect.right - boundingRect.left, boundingRect.bottom - boundingRect.top];
    }

    get left() {
        return this.element.style.left || '0px';
    }

    get right() {
        return this.element.style.right || '0px';
    }

    get top() {
        return this.element.style.top || '0px';
    }

    get bottom() {
        return this.element.style.bottom || '0px';
    }

    get width() {
        let boundingRect = this.element.getBoundingClientRect();
        return (boundingRect.right - boundingRect.left) + 'px';
    }

    get height() {
        let boundingRect = this.element.getBoundingClientRect();
        return (boundingRect.bottom - boundingRect.top) + 'px';
    }

}
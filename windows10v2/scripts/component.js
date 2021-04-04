class AbsoluteDivComponent {
    parent;
    element;
    children = [];

    constructor(params) {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        for (const [key, value] of Object.entries(params)) {
            if (key == 'properties') {
                for (const [propertyKey, propertyValue] of Object.entries(value)) {
                    this.element[propertyKey] = propertyValue;
                }
            }

            if (key == 'styles') {
                for (const [styleKey, styleValue] of Object.entries(value)) {
                    this.element.style[styleKey] = styleValue;
                }
            }

            if (key == 'events') {
                for (const [eventName, eventFunc] of Object.entries(value)) {
                    this.element.addEventListener(eventName, eventFunc);
                }
            }

            if (key == 'children') {
                value.forEach((child) => {
                    child.parent = this;
                    this.element.appendChild(child.element);
                    this.children.push(child);
                });
            }
        }
        document.body.appendChild(this.element);
        COMPONENTS.push(this);
    }

    addEventListener(name, func) {
        this.element.addEventListener(name, func);
    }

    addChildComponent(childComp) {
        childComp.parent = this;
        this.element.appendChild(childComp.element);
        this.children.push(childComp);
    }

    removeElement() {
        this.element.remove();
    }

    setProperties(params) {
        for (const [key, value] of Object.entries(params)) {
            this.element[key] = value;
        }
    }

    get dimensions() {
        let boundingRect = this.element.getBoundingClientRect();
        return [boundingRect.top, boundingRect.left, boundingRect.right - boundingRect.left, boundingRect.bottom - boundingRect.top];
    }

    get style() {
        return this.element.style;
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
                component.element.style.top = (component.element.offsetTop - pos2) * 100 / window.innerHeight + "vh";
                component.element.style.left = (component.element.offsetLeft - pos1) * 100 / window.innerWidth + 'vw';
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
}
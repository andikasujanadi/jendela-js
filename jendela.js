const createWindowHTML = (title,body,minimize_button,resize_button,close_button) => `
<div class="header">
    <div class="title">${title}</div>
    <div class="headerButtonContainer">
        ${minimize_button===true?'<div class="headerButton headerButtonMinimize" onmouseup="minimizeWindow(this)" ontouchend="minimizeWindow(this)"><div class="icon"></div></div>':''}
        ${resize_button===true?'<div class="headerButton headerButtonResize" onmouseup="maximizeWindow(this)" ontouchend="maximizeWindow(this)"><div class="icon"></div></div>':''}
        ${close_button===true?'<div class="headerButton headerButtonClose" onmouseup="closeWindow(this)" ontouchend="closeWindow(this)"><div class="icon"></div></div>':''}
    </div>
</div>
<div class="body">
    ${body}
</div>`;

let windows = [];
const add_value_z = 99;

const add_window = (params = {}) => {
    const title = params.title ?? '';
    const body = params.body ?? '';
    const theme = params.theme ?? 'jendela-classic';
    const minimize_button = params.minimize_button ?? true;
    const resize_button = params.resize_button ?? true;
    const close_button = params.close_button ?? true;

    const newWindow = document.createElement('div');
    newWindow.className = `jendela ${theme}`;
    newWindow.innerHTML = createWindowHTML(title, body, minimize_button, resize_button, close_button);

    newWindow.setAttribute('tabindex', '0');
    document.body.appendChild(newWindow);
    newWindow.focus();
    dragElement(newWindow);
    windows.push(newWindow);
    updateWindowZIndices();

    newWindow.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        newWindow.focus();
    });
    newWindow.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        newWindow.focus();
    });
    newWindow.addEventListener('focus', () => {
        handleWindowClick(newWindow);
        newWindow.classList.remove('inactive');
    });

    newWindow.addEventListener('blur', () => {
        newWindow.classList.add('inactive');
    });
};

function updateWindowZIndices() {
    windows.forEach((window, index) => {
        window.style.zIndex = index + add_value_z;
    });
}

function handleWindowClick(windowElement) {
    const clickedIndex = windows.indexOf(windowElement);

    if (clickedIndex !== windows.length - 1) {
        const movedWindow = windows.splice(clickedIndex, 1)[0];
        windows.push(movedWindow);
        updateWindowZIndices();
    }
}


const refreshWindows = () => {
    const windows = document.querySelectorAll(".jendela");
    if (windows.length) {
        windows.forEach(window => {
            dragElement(window);
        });
    }
}

refreshWindows();

const animateWindow = (el, t = 300) => {
    el.style.transition = `height ease ${t}ms, width ease ${t}ms, top ease ${t}ms, left ease ${t}ms, border ease ${t}ms, left ease ${t}ms`;
    setTimeout(() => {
    el.style.transition = "none";
    }, t);
}

const maximizeWindow = (el) => {
    const window = el.closest('.jendela');
    let classes = window.classList;
    let is_maximized = false;
    let is_minimized = false;
    classes.forEach(className => {
        if (className.includes('maximized')) {
            is_maximized = true;
        }
        if (className.includes('minimized')) {
            is_minimized = true;
        }
    });
    if(is_maximized){
        window.classList.remove('maximized');
    }
    else if(is_minimized){
        window.classList.remove('minimized');
    }
    else{
        window.classList.add('maximized');
        window.classList.remove('minimized');
    }
    animateWindow(window, 250);
}

const closeWindow = (el) => {
    const window = el.closest('.jendela');
    window.style.transition = 'transform ease 0.3s, opacity ease 0.2s';
    window.style.transform = 'scale(0.75)';
    window.style.opacity = '0';
    setTimeout(() => {
        window.remove();
    }, 300);
}

const minimizeWindow = (el) => {
    const window = el.closest('.jendela');
    window.classList.remove('maximized');
    window.classList.add('minimized');
    animateWindow(window);

}

function addMouseAndTouchListener(element, event, handler) {
    element.addEventListener(event, handler);
    element.addEventListener(`touch${event.slice(5)}`, handler);
}

function dragElement(element) {
    element.insertAdjacentHTML('afterbegin', `
        <div class="topHandle"></div>
        <div class="bottomHandle"></div>
        <div class="startHandle"></div>
        <div class="endHandle"></div>
        <div class="nwHandle cornerHandle"></div>
        <div class="neHandle cornerHandle"></div>
        <div class="swHandle cornerHandle"></div>
        <div class="seHandle cornerHandle"></div>
    `);

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let action = 'idle';
    let minHeight = 200, minWidth = 200;
    let offsetX = 0, offsetY = 0;

    if (element.querySelector(".header")) {
        const handleBindings = [
            { selector: ".bottomHandle", event: resizeS },
            { selector: ".topHandle", event: resizeN },
            { selector: ".endHandle", event: resizeE },
            { selector: ".startHandle", event: resizeW },
            { selector: ".nwHandle", event: resizeNW },
            { selector: ".neHandle", event: resizeNE },
            { selector: ".swHandle", event: resizeSW },
            { selector: ".seHandle", event: resizeSE },
            { selector: ".header", event: dragMouseDown },
        ];

        handleBindings.forEach(({ selector, event }) => {
            const handle = element.querySelector(selector);
            if (handle) {
                handle.onmousedown = event;
                handle.ontouchstart = event;
            }
        });

        let buttons = element.querySelectorAll(".headerButton");
        buttons.forEach((e) => {
            e.onmousedown = preventDrag;
            e.ontouchstart = preventDrag;
        });
    } else {
        element.onmousedown = dragMouseDown;
        element.ontouchstart = dragMouseDown;
    }

    function resizeS(e) {
        action = 'resize-s';
        dragMouseDown(e);
    }
    function resizeN(e) {
        action = 'resize-n';
        dragMouseDown(e);
    }
    function resizeE(e) {
        action = 'resize-e';
        dragMouseDown(e);
    }
    function resizeW(e) {
        action = 'resize-w';
        dragMouseDown(e);
    }
    function resizeNW(e) {
        action = 'resize-nw';
        dragMouseDown(e);
    }
    function resizeNE(e) {
        action = 'resize-ne';
        dragMouseDown(e);
    }
    function resizeSW(e) {
        action = 'resize-sw';
        dragMouseDown(e);
    }
    function resizeSE(e) {
        action = 'resize-se';
        dragMouseDown(e);
    }
    function preventDrag(e) {
        action = 'dontmove';
        dragMouseDown(e);
    }

    function dragMouseDown(e) {
        if (action == 'idle') {
            action = 'move';
        }
        e = e || window.event;
        e.preventDefault();
        pos3 = (e.type === 'touchstart') ? e.changedTouches[0].clientX : e.clientX;
        pos4 = (e.type === 'touchstart') ? e.changedTouches[0].clientY : e.clientY;
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        let positionX = (e.type === 'touchmove') ? e.changedTouches[0].clientX : e.clientX;
        let positionY = (e.type === 'touchmove') ? e.changedTouches[0].clientY : e.clientY;

        pos1 = pos3 - positionX;
        pos2 = pos4 - positionY;
        pos3 = positionX;
        pos4 = positionY;

        if (action !== 'dontmove') {
            if (action !== 'resize-w' && action !== 'resize-e') {
                element.style.top = (element.offsetTop - pos2) + "px";
            }
            if (action !== 'resize-n' && action !== 'resize-s') {
                element.style.left = (element.offsetLeft - pos1) + "px";
            }
        }

        if (action !== 'move') {
            if (action === 'resize-n' || action === 'resize-nw' || action === 'resize-ne') {
                if (element.clientHeight + pos2 >= minHeight && offsetY >= 0) {
                    element.style.height = `${element.clientHeight + pos2}px`;
                } else {
                    element.style.height = `${minHeight}px`;
                    element.style.top = `${element.offsetTop + pos2}px`;
                    offsetY += pos2;
                }
            }
            if (action === 'resize-s' || action === 'resize-sw' || action === 'resize-se') {
                if (element.clientHeight - pos2 >= minHeight && offsetY <= 0) {
                    element.style.top = `${element.offsetTop + pos2}px`;
                    element.style.height = `${element.clientHeight - pos2}px`;
                } else {
                    element.style.height = `${minHeight}px`;
                    element.style.top = `${element.offsetTop + pos2}px`;
                    offsetY += pos2;
                }
            }
            if (action === 'resize-w' || action === 'resize-nw' || action === 'resize-sw') {
                if (element.clientWidth + pos1 >= minWidth && offsetX >= 0) {
                    element.style.width = (element.clientWidth + pos1) + "px";
                } else {
                    element.style.width = `${minWidth}px`;
                    element.style.left = (element.offsetLeft + pos1) + "px";
                    offsetX += pos1;
                }
            }
            if (action === 'resize-e' || action === 'resize-ne' || action === 'resize-se') {
                if (element.clientWidth - pos1 >= minWidth && offsetX <= 0) {
                    element.style.left = (element.offsetLeft + pos1) + "px";
                    element.style.width = (element.clientWidth - pos1) + "px";
                } else {
                    element.style.width = `${minWidth}px`;
                    element.style.left = (element.offsetLeft + pos1) + "px";
                    offsetX += pos1;
                }
            }
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.ontouchup = null;
        document.onmousemove = null;
        document.ontouchmove = null;
        action = 'idle';
        offsetX = 0;
        offsetY = 0;
    }
}

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
    // el.classList.add('animateWindow');
    el.style.transition = `height ease ${t}ms, width ease ${t}ms, top ease ${t}ms, left ease ${t}ms, border ease ${t}ms, left ease ${t}ms`;
    setTimeout(() => {
    // el.classList.remove('animateWindow');
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

function dragElement(element) {
    element.insertAdjacentHTML('afterbegin', `<div class="topHandle"></div>`);
    element.insertAdjacentHTML('afterbegin', `<div class="bottomHandle"></div>`);
    element.insertAdjacentHTML('afterbegin', `<div class="startHandle"></div>`);
    element.insertAdjacentHTML('afterbegin', `<div class="endHandle"></div>`);
    element.insertAdjacentHTML('afterbegin', `<div class="nwHandle cornerHandle"></div>`);
    element.insertAdjacentHTML('afterbegin', `<div class="neHandle cornerHandle"></div>`);
    element.insertAdjacentHTML('afterbegin', `<div class="swHandle cornerHandle"></div>`);
    element.insertAdjacentHTML('afterbegin', `<div class="seHandle cornerHandle"></div>`);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var action = 'idle';
    var minHeight = 200, minWidth = 200;
    var offsetX = 0, offsetY = 0;
    if (element.querySelector(".header")) {
        element.querySelector(".bottomHandle").onmousedown = resizeS;
        element.querySelector(".topHandle").onmousedown = resizeN;
        element.querySelector(".endHandle").onmousedown = resizeE;
        element.querySelector(".startHandle").onmousedown = resizeW;
        element.querySelector(".nwHandle").onmousedown = resizeNW;
        element.querySelector(".neHandle").onmousedown = resizeNE;
        element.querySelector(".swHandle").onmousedown = resizeSW;
        element.querySelector(".seHandle").onmousedown = resizeSE;
        element.querySelector(".header").onmousedown = dragMouseDown;
        b = element.querySelectorAll(".headerButton");
        for (let i = 0; i < b.length; i++) {
            const e = b[i];
            e.onmousedown = preventDrag;
        }
    } else {
        element.onmousedown = dragMouseDown;
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
    function preventDrag(e) {animateWindow
        action = 'dontmove';
        dragMouseDown(e);
    }

    function dragMouseDown(e) {
        if (action == 'idle') {
            action = 'move';
        }
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        if (action != 'dontmove') {
            if (action != 'resize-w' && action != 'resize-e') {
                element.style.top = (element.offsetTop - pos2) + "px";
            }
            if (action != 'resize-n' && action != 'resize-s') {
                element.style.left = (element.offsetLeft - pos1) + "px";
            }
        }

        if (action != 'move') {
            if (action == 'resize-n' || action == 'resize-nw' || action == 'resize-ne') {
                if (element.clientHeight + pos2 >= minHeight && offsetY >= 0) {
                    element.style.height = `${element.clientHeight + pos2}px`;
                }
                else {
                    element.style.height = `${minHeight}px`;
                    element.style.top = `${element.offsetTop + pos2}px`;
                    offsetY += pos2;
                }
            }
            if (action == 'resize-s' || action == 'resize-sw' || action == 'resize-se') {
                if (element.clientHeight - pos2 >= minHeight && offsetY <= 0) {
                    element.style.top = `${element.offsetTop + pos2}px`;
                    element.style.height = `${element.clientHeight - pos2}px`;
                }
                else {
                    element.style.height = `${minHeight}px`;
                    element.style.top = `${element.offsetTop + pos2}px`;
                    offsetY += pos2;
                }
            }
            if (action == 'resize-w' || action == 'resize-nw' || action == 'resize-sw') {
                if (element.clientWidth + pos1 >= minWidth && offsetX >= 0) {
                    element.style.width = (element.clientWidth + pos1) + "px";
                }
                else {
                    element.style.width = `${minWidth}px`;
                    element.style.left = (element.offsetLeft + pos1) + "px";
                    offsetX += pos1;
                }
            }
            if (action == 'resize-e' || action == 'resize-ne' || action == 'resize-se') {
                if (element.clientWidth - pos1 >= minWidth && offsetX <= 0) {
                    element.style.left = (element.offsetLeft + pos1) + "px";
                    element.style.width = (element.clientWidth - pos1) + "px";
                }
                else {
                    element.style.width = `${minWidth}px`;
                    element.style.left = (element.offsetLeft + pos1) + "px";
                    offsetX += pos1;
                }
            }
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        disableMove = false;
        action = 'idle';
        offsetX = 0;
        offsetY = 0;
    }
}
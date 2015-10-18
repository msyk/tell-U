/**
 * Created by msyk on 15/10/09.
 */

var slideNumber = 0;
var currentId = 0;
var slideNodes = null;

window.onload = function () {
    var nodeSlide = document.getElementsByClassName("slide")[0];
    slideNodes = nodeSlide.cloneNode(true);
    nodeSlide.parentNode.removeChild(nodeSlide);

    if (document.location.hash.length > 0) {
        slideNumber = parseInt(document.location.hash.substr(1)) - 1;
    }

    var headNode = document.getElementsByTagName("HEAD")[0];
    var linkNode = document.createElement("LINK");
    linkNode.setAttribute("rel", "stylesheet");
    linkNode.setAttribute("href", "projector/themes/" + config.theme + "/slidestyle.css");
    headNode.appendChild(linkNode);
    setTimeout(function () {
        adjust(loadSlide(true, document.body));
    }, 100);

    window.onclick = function (e) {
        if (e.clientX > window.innerWidth / 2) {
            moveSlide(+1);
        } else {
            moveSlide(-1);
        }
    };

    document.body.onkeydown = function (e) {
        var url;
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 37:
            case 38:
                if (!e.shiftKey) {
                    moveSlide(-1);
                } else {
                    moveSlide(0, true);
                }                break;
            case 39:
            case 40:
                if (!e.shiftKey) {
                    moveSlide(+1);
                } else {
                    moveSlide(-1, true);
                }                break;
            case 49:    // keyCode = 49 for "1"
                moveSlide(0, true);
                break;
            case 69:    // keyCode = 69 for "E"
                moveSlide(-1, true);
                break;
            case 70:    // keyCode = 70 for "F"
                var element = document.documentElement;
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen(element.ALLOW_KEYBOARD_INPUT);
                }
                break;
            case 82:    // keyCode = 82 for "R"
            case 13:    // keyCode = 13 for Return
                url = document.URL;
                if (url.match(/#/)) {
                    url = url.split(/#/)[0];
                }
                document.location.href = url + "#" + (slideNumber + 1);
                location.reload();
                break;
        }
        e.preventDefault();
    };

    window.onresize = function () {
        adjust();
    };

}
function moveSlide(bias, absolute) {
    var slide;
    if (absolute)   {
        slideNumber = bias;
        if (bias < 0)   {
            slideNumber = contents.length + bias;
        }
    }
    else {
        slideNumber += bias;
    }
    if (slideNumber >= contents.length) {
        slideNumber = contents.length - 1;
    } else if (slideNumber < 0) {
        slideNumber = 0;
    } else {
        slide = loadSlide(false, document.body);
        setTimeout(function () {
            adjust(slide);
        }, 100);
    }
}

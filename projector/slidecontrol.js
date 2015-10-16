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

    var headNode = document.getElementsByTagName("HEAD")[0];
    var linkNode = document.createElement("LINK");
    linkNode.setAttribute("rel", "stylesheet");
    linkNode.setAttribute("href", "themes/" + theme + "/slidestyle.css");
    headNode.appendChild(linkNode);
    setTimeout(function () {
        adjust(loadSlide(true));
    }, 100);
};

window.onclick = function () {
    moveSlide(+1);
};

window.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
        case 38:
            moveSlide(-1);
            break;
        case 39:
        case 40:
            moveSlide(+1);
            break;
        case 70:    // keyCode = 70 for "F"
            var element = document.documentElement;
            //if (elem.requestFullScreen) {
            //    elem.requestFullScreen();
            //} else if (elem.mozRequestFullScreen) {
            //    elem.mozRequestFullScreen();
            //} else if (elem.webkitRequestFullScreen) {
            //    elem.webkitRequestFullScreen();
            //}
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }

            break;
    }
};

window.onresize = function () {
    adjust();
};

function moveSlide(bias) {
    var slide;
    slideNumber += bias;
    if (slideNumber >= contents.length) {
        slideNumber = contents.length - 1;
    } else if (slideNumber < 0) {
        slideNumber = 0;
    } else {
        slide = loadSlide(false);
        setTimeout(function () {
            adjust(slide);
        }, 100);
    }
}

function loadSlide(loading) {
    var level, aItem, divNode, slideDelete, nodeSlides, nodeBody, nodeSlide;
    var i, j, node, nodes, nodeItem, cols, closeId = null, openId = null, closeZ = null;

    // Get current slide.
    nodeSlides = document.getElementsByClassName("slide");
    if (nodeSlides && nodeSlides[0]) {
        closeId = nodeSlides[0].getAttribute("id");
        closeZ = nodeSlides[0].style.zIndex;
    }

    // Add new slide.
    nodeBody = document.getElementsByTagName("BODY")[0];
    nodeSlide = slideNodes.cloneNode(true);
    openId = currentId++;
    nodeSlide.setAttribute("id", openId);
    nodeSlide.style.zIndex = closeZ - 1;
    if (loading) {
        nodeSlide.style.opacity = 0.0;
    }
    nodeBody.appendChild(nodeSlide);

    // Set single item nodes.
    var adjustNodes = ["title", "presubtitle", "maintitle", "subtitle", "centertitle", "centertitle"];
    for (i = 0; i < adjustNodes.length; i++) {
        if (contents[slideNumber][adjustNodes[i]]) {
            node = nodeSlide.getElementsByClassName(adjustNodes[i])[0];
            nodeItem = nodeSlide.getElementsByClassName(adjustNodes[i] + "-item")[0];
            nodeItem.innerHTML = contents[slideNumber][adjustNodes[i]];
            node.style.display = "flex";
        }
    }
    // Set multiple item nodes.
    var multiItemNodes = ["coveritems", "centeritems", "items"];
    for (i = 0; i < multiItemNodes.length; i++) {
        if (contents[slideNumber][multiItemNodes[i]]) {
            node = nodeSlide.getElementsByClassName(multiItemNodes[i])[0];
            while (node.childNodes.length > 0) {
                node.removeChild(node.childNodes[0]);
            }
            for (j = 0; j < contents[slideNumber][multiItemNodes[i]].length; j++) {
                level = 1;
                aItem = contents[slideNumber][multiItemNodes[i]][j];
                while (aItem.substr(0, 1) == "-") {
                    level++;
                    aItem = aItem.substr(1);
                }
                divNode = document.createElement("DIV");
                divNode.appendChild(document.createTextNode(aItem));
                divNode.setAttribute("class", "item-level" + level);
                node.appendChild(divNode);
            }
            node.style.display = "flex";
        }
    }

    // Setup parallel nodes.
    var paraNodes = ["fig1", "fig2", "fig3", "items"];
    cols = 0;
    for (i = 0; i < paraNodes.length; i++) {
        cols += (contents[slideNumber][paraNodes[i]] ? 1 : 0)
    }
    if (cols > 0) {
        node = nodeSlide.getElementsByClassName("detail")[0];
        for (i = 0; i < paraNodes.length; i++) {
            if (contents[slideNumber][paraNodes[i]]) {
                nodeItem = nodeSlide.getElementsByClassName(paraNodes[i])[0];
                if (nodeItem.tagName == "IMG") {
                    nodeItem.src = "../" + contents[slideNumber][paraNodes[i]];
                }
                nodeItem.style.maxWidth = (100.0 / cols) + "%";
                nodeItem.style.display = "block";
            }
        }
        node.style.display = "flex";
    }

    // After showing second or later slide.
    if (closeId) {
        slideDelete = document.getElementById(closeId);
        if (transition) {
            slideDelete.style.transitionProperty = "opacity";
            slideDelete.style.transitionDuration = "0.5s";
            slideDelete.style.opacity = 0.0;
            slideDelete.addEventListener("transitionend", function () {
                nodes = document.getElementsByClassName("slide");
                for (i = 0; i < nodes.length; i++) {
                    if (nodes[i].id != openId && nodes[i] && nodes[i].parentNode) {
                        nodes[i].parentNode.removeChild(nodes[i]);
                    }
                }
            }, true);
        } else {
            nodes = document.getElementsByClassName("slide");
            for (i = 0; i < nodes.length; i++) {
                if (nodes[i].id != openId && nodes[i] && nodes[i].parentNode) {
                    nodes[i].parentNode.removeChild(nodes[i]);
                }
            }
        }
    }

    // After showing first slide.
    if (loading) {
        setTimeout(function () {
            if (transition) {
                nodeSlide.style.transitionProperty = "opacity";
                nodeSlide.style.transitionDuration = "0.5s";
            }
            nodeSlide.style.opacity = 1.0;
        }, 1);
    }
    return nodeSlide;
}

function adjust(nodeSlide) {
    var k, fontSize, fSize, fUnit, minFSize, node, nodeItem;
    var shrinkItems = ["title", "presubtitle", "maintitle", "subtitle", "centertitle"];
    var shrinkLists = ["coveritems", "centeritems"];
    var paraLists = ["items", "fig1", "fig2", "fig3"];

    if (!nodeSlide) {
        nodeSlide = document.getElementsByClassName("slide")[0];
    }

    for (k = 0; k < shrinkItems.length; k++) {
        node = nodeSlide.getElementsByClassName(shrinkItems[k])[0];
        nodeItem = nodeSlide.getElementsByClassName(shrinkItems[k] + "-item")[0];
        if (node && nodeItem && node.style.display != "none" && node.style.display != "") {
            fontSize = getCSSFontSize(shrinkItems[k] + "-item");
            if (fontSize) {
                fSize = parseFloat(fontSize);
                minFSize = fSize * 0.01;
                fUnit = fontSize.substr(String(fSize).length).trim();
                nodeItem.style.fontSize = fSize + fUnit;
                console.log(shrinkItems[k], nodeItem.style.fontSize);
                while (node.clientHeight < nodeItem.clientHeight) {
                    fSize *= 0.95;
                    nodeItem.style.fontSize = fSize + fUnit;
                    console.log(shrinkItems[k], nodeItem.style.fontSize);
                    if (fSize < minFSize) {
                        break;
                    }
                }
            }
        }
    }

    for (k = 0; k < shrinkLists.length; k++) {
        nodeItem = nodeSlide.getElementsByClassName(shrinkLists[k])[0];
        if (nodeItem.style.display != "none" && nodeItem.style.display != "") {
            fontSize = getCSSFontSize(shrinkLists[k]);
            if (fontSize) {
                fSize = parseFloat(fontSize);
                minFSize = fSize * 0.1;
                fUnit = fontSize.substr(String(fSize).length).trim();
                nodeItem.style.fontSize = fSize + fUnit;
                while (window.innerHeight < contentHeight(nodeSlide)) {
                    fSize *= 0.95;
                    nodeItem.style.fontSize = fSize + fUnit;
                    if (fSize < minFSize) {
                        break;
                    }
                }
            }
        }
    }

    for (k = 0; k < paraLists.length; k++) {
        nodeItem = nodeSlide.getElementsByClassName(paraLists[k])[0];
        if (nodeItem.style.display != "none" && nodeItem.style.display != "") {
            if (nodeItem.tagName != "IMG") {
                fontSize = getCSSFontSize(paraLists[k]);
                if (fontSize) {
                    fSize = parseFloat(fontSize);
                    minFSize = fSize * 0.1;
                    fUnit = fontSize.substr(String(fSize).length).trim();
                    nodeItem.style.fontSize = fSize + fUnit;
                    while (window.innerHeight < contentHeight(nodeSlide, paraLists[k])) {
                        fSize *= 0.95;
                        nodeItem.style.fontSize = fSize + fUnit;
                        if (fSize < minFSize) {
                            break;
                        }
                    }
                }
            } else {
                fSize = parseFloat(nodeItem.style.maxWidth);
                minFSize = 3;
                while (window.innerHeight < contentHeight(nodeSlide, paraLists[k])) {
                    fSize *= 0.95;
                    nodeItem.style.maxWidth = fSize + "%";
                    if (fSize < minFSize) {
                        break;
                    }
                }
            }
        }
    }
}

function contentHeight(nodeSlide, paraClass) {
    var i, node;
    var hNodes = [
        "title", "header", "footer", "presubtitle", "maintitle", "subtitle",
        "coveritems", "centertitle", "centeritems"
    ];
    var contentHeight = 0, paraMaxH = 0;
    for (i = 0; i < hNodes.length; i++) {
        node = nodeSlide.getElementsByClassName(hNodes[i]);
        if (node && node[0]) {
            contentHeight += node[0].clientHeight;
        }
    }
    if (paraClass) {
        node = nodeSlide.getElementsByClassName(paraClass);
        if (node && node[0]) {
            paraMaxH = node[0].clientHeight;
        }
    }

    return contentHeight + paraMaxH - 1;
}

function getCSSFontSize(matching) {
    var i, j, reg, nodes,fontSize = null;
    reg = new RegExp("^." + matching);
    for (i = 0; i < document.styleSheets.length; i++) {
        try {
            if (document.styleSheets[i].cssRules) {
                for (j = 0; j < document.styleSheets[i].cssRules.length; j++) {
                    if (document.styleSheets[i].cssRules[j].cssText.match(reg)) {
                        fontSize = document.styleSheets[i].cssRules[j].style.fontSize;
                    }
                }
            }
        } catch (ex) {
            console.log("style sheet issue:", ex, document.styleSheets[i]);
        }
    }
    if(!fontSize)   {
        nodes = document.getElementsByClassName(matching);
        if (nodes && nodes[0])  {
            fontSize = nodes[0].clientHeight + "px";
        }
    }
    return fontSize;
}

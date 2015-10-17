/**
 * Created by msyk on 15/10/09.
 */

function loadSlide(loading, baseNode) {
    var level, aItem, divNode, slideDelete, nodeSlides, nodeSlide, maxImgWidth = 100, w;
    var i, j, node, nodes, nodeItem, cols, closeId = null, openId = null, closeZ = null;

    // Get current slide.
    nodeSlides = document.getElementsByClassName("slide");
    if (nodeSlides && nodeSlides[0]) {
        closeId = nodeSlides[0].getAttribute("id");
        closeZ = nodeSlides[0].style.zIndex;
    }

    // Add new slide.
    nodeSlide = slideNodes.cloneNode(true);
    openId = currentId++;
    nodeSlide.setAttribute("id", openId);
    nodeSlide.style.zIndex = closeZ - 1;
    if (loading) {
        nodeSlide.style.opacity = 0.0;
    }
    baseNode.appendChild(nodeSlide);

    // Set single item nodes.
    var adjustNodes = ["title", "presubtitle", "maintitle", "subtitle", "centertitle"];
    for (i = 0; i < adjustNodes.length; i++) {
        if (contents[slideNumber][adjustNodes[i]]) {
            node = nodeSlide.getElementsByClassName(adjustNodes[i])[0];
            nodeItem = nodeSlide.getElementsByClassName(adjustNodes[i] + "-item")[0];
            textProcessing(nodeItem, contents[slideNumber][adjustNodes[i]]);
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
                //divNode.appendChild(document.createTextNode(aItem));
                textProcessing(divNode, aItem);
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
        if (contents[slideNumber].maximagewidth) {
            maxImgWidth = contents[slideNumber].maximagewidth;
        } else if (config.maximagewidth) {
            maxImgWidth = config.maximagewidth;
        }
        node = nodeSlide.getElementsByClassName("detail")[0];
        for (i = 0; i < paraNodes.length; i++) {
            if (contents[slideNumber][paraNodes[i]]) {
                nodeItem = nodeSlide.getElementsByClassName(paraNodes[i])[0];
                w = 100.0 / cols;
                if (w > maxImgWidth && nodeItem.tagName == "IMG") {
                    w = maxImgWidth;
                }
                if (nodeItem.tagName == "IMG") {
                    nodeItem.src = contents[slideNumber][paraNodes[i]];
                    nodeItem.style.maxWidth = w + "%";
                }
                nodeItem.style.display = "block";
            }
        }
        node.style.display = "flex";
    }

    // After showing second or later slide.
    if (closeId) {
        slideDelete = document.getElementById(closeId);
        if (config.transition) {
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
            if (config.transition) {
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
                while (node.clientHeight < nodeItem.clientHeight) {
                    fSize *= 0.95;
                    nodeItem.style.fontSize = fSize + fUnit;
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
    var i, j, reg, nodes, fontSize = null;
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
    if (!fontSize) {
        nodes = document.getElementsByClassName(matching);
        if (nodes && nodes[0]) {
            fontSize = nodes[0].parentNode.clientHeight + "px";
        }
    }
    return fontSize;
}

function textProcessing(pNode, str) {
    var i, items, src = str, n = 0, node, tokenReg, paramReg, matched, a, b, c;
    //tokenReg = /\[\[([^\]]+)\]\]/;
    //paramReg = /[^\[\]\|]+/g;
    a = config.openParen ? config.openParen : "\\[";
    b = config.closeParen ? config.closeParen : "\\]";
    c = config.separator ? config.separator : "\\|";
    tokenReg = new RegExp(a + a + "([^" + b + "]+)" + b + b);
    paramReg = new RegExp("[^" + c + "]+", "g");
    while (matched = tokenReg.exec(src)) {
        items = matched[1].match(paramReg);
        n = src.indexOf(matched[0]);
        pNode.appendChild(document.createTextNode(src.substr(0, n)));
        if (items[0]) {
            switch (items[0].toLowerCase().trim()) {
                case "img":
                    node = document.createElement("IMG");
                    if (items[1] && items[1].trim() != "") {
                        node.setAttribute("src", items[1].trim());
                    }
                    if (items[2] && items[2].trim() != "") {
                        node.style.width = items[2].trim();
                    }
                    if (items[3] && items[3].trim() != "") {
                        node.style.height = items[3].trim();
                    }
                    pNode.appendChild(node);
                    break;
                case "b":
                    node = document.createElement("STRONG");
                    if (items[1] && items[1] != "") {
                        node.appendChild(document.createTextNode(items[1]));
                    }
                    pNode.appendChild(node);
                    break;
                case "u":
                    node = document.createElement("U");
                    if (items[1] && items[1] != "") {
                        node.appendChild(document.createTextNode(items[1]));
                    }
                    pNode.appendChild(node);
                    break;
                case "i":
                    node = document.createElement("I");
                    if (items[1] && items[1] != "") {
                        node.appendChild(document.createTextNode(items[1]));
                    }
                    pNode.appendChild(node);
                    break;
                case "span":
                    node = document.createElement("SPAN");
                    if (items[1] && items[1].trim() != "") {
                        node.setAttribute("class", items[1].trim());
                    }
                    if (items[2] && items[2] != "") {
                        node.appendChild(document.createTextNode(items[2]));
                    }
                    pNode.appendChild(node);
                    break;
                case "div":
                    node = document.createElement("DIV");
                    if (items[1] && items[1].trim() != "") {
                        node.setAttribute("class", items[1].trim());
                    }
                    if (items[2] && items[2] != "") {
                        node.appendChild(document.createTextNode(items[2]));
                    }
                    pNode.appendChild(node);
                    break;
            }
        }
        src = src.substr(n + matched[0].length);
    }
    pNode.appendChild(document.createTextNode(src));
}
/**
 * Created by msyk on 15/10/18.
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
        buildHandsout();
    }, 100);
};

function buildHandsout() {
    var i, boxWidth, boxHeight, columnNumber, indexH, indexV, node, rootNode;
    var gapLength, slideNode;

    rootNode = document.getElementById("back");
    boxWidth = 1280;
    boxHeight = 800;

    columnNumber = 1;
    for (i = 0; i < contents.length; i++) {
        indexH = i % columnNumber;
        indexV = Math.floor(i / columnNumber);
        node = document.createElement("DIV");
        //node.style.left = (boxWidth * indexH + gapLength * indexH) + "px";
        //node.style.top = (boxHeight * indexV + gapLength * indexV) + "px";
        node.style.width = (boxWidth * columnNumber) + "px";
        node.style.height = (boxHeight * columnNumber) + "px";
        node.style.height = "100vh";
        //node.style.backgroundColor = "black";
        //node.style.position = "absolute";
        //node.style.pageBreakAfter = "always";
        //node.style.pageBreakBefore = "always";
        rootNode.appendChild(node);
        slideNode = loadSlide(false, node, true);
        //slideNode.style.transform =
        //    "translate(" + (-boxWidth / columnNumber) + "px," + (-boxHeight / columnNumber) + "px)" +
        //    "scale(" + (1 / columnNumber) + "," + (1 / columnNumber) + ")";
        adjust(slideNode);
        slideNumber++;
        node = document.createElement("DIV");
        //node.style.left = (boxWidth * indexH + gapLength * indexH) + "px";
        //node.style.top = (boxHeight * (indexV + 1) + gapLength * indexV) + "px";
        node.style.width = (boxWidth * columnNumber) + "px";
        //node.style.height = "14px";
        //node.style.backgroundColor = "black";
        //node.style.position = "absolute";
        node.style.textAlign = "right";
        node.style.pageBreakAfter = "always";
        node.appendChild(
            document.createTextNode("Page: " + slideNumber + " / " + contents.length));
        rootNode.appendChild(node);
    }
}
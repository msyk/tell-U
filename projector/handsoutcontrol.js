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
    var i, node, rootNode, slideNode, width;

    rootNode = document.getElementById("back");
    for (i = 0; i < contents.length; i++) {
        node = document.createElement("DIV");
        node.style.width = "100%";
        node.style.height = "100%";
        rootNode.appendChild(node);
        slideNode = loadSlide(false, node, true);
        adjust(slideNode);
        slideNumber++;
        node = document.createElement("DIV");
        node.style.width = "100%";
        node.style.textAlign = "right";
        node.style.pageBreakAfter = "always";
        node.appendChild(
            document.createTextNode("Page: " + slideNumber + " / " + contents.length));
        rootNode.appendChild(node);
    }
}
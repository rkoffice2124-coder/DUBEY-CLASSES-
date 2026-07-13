function showSection(sectionId) {

    document.getElementById("aboutSection").style.display = "none";
    document.getElementById("whySection").style.display = "none";
    document.getElementById("admissionSection").style.display = "none";

    document.getElementById(sectionId).style.display = "block";

    document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth"
    });
}

window.onload = function () {

    document.getElementById("aboutSection").style.display = "none";
    document.getElementById("whySection").style.display = "none";
    document.getElementById("admissionSection").style.display = "none";

};

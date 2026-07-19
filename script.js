/* =====================================
   DUBEY CLASSES WEBSITE
   Version 5.0
===================================== */

// =============================
// Show Selected Section
// =============================

function showSection(sectionId) {

    const sections = [
        "aboutSection",
        "whySection",
        "admissionSection"
    ];

    sections.forEach((id) => {

        const section = document.getElementById(id);

        if (section) {

            if (id === sectionId) {

                section.style.display = "block";

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            } else {

                section.style.display = "none";

            }

        }

    });

}

// =============================
// Hide Sections on Page Load
// =============================

document.addEventListener("DOMContentLoaded", () => {

    [
        "aboutSection",
        "whySection",
        "admissionSection"
    ].forEach((id) => {

        const section = document.getElementById(id);

        if (section) {

            section.style.display = "none";

        }

    });

});

// =============================
// Back to Top Button
// =============================

const topButton = document.createElement("button");

topButton.innerHTML = "⬆";

topButton.id = "topButton";

document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.bottom = "20px";
topButton.style.right = "20px";
topButton.style.width = "50px";
topButton.style.height = "50px";
topButton.style.borderRadius = "50%";
topButton.style.border = "none";
topButton.style.background = "#0d47a1";
topButton.style.color = "#fff";
topButton.style.fontSize = "20px";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.boxShadow = "0 5px 15px rgba(0,0,0,.25)";
topButton.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});

// =============================
// Menu Card Animation
// =============================

const cards = document.querySelectorAll(".menu-card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

// =============================
// Hero Button Click Effect
// =============================

document.querySelectorAll(".hero-btn").forEach((btn) => {

    btn.addEventListener("click", () => {

        btn.style.transform = "scale(0.95)";

        setTimeout(() => {

            btn.style.transform = "scale(1)";

        }, 150);

    });

});

// =============================
// Console Message
// =============================

console.log("DUBEY CLASSES Website Version 5.0 Loaded Successfully");
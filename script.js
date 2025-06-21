// You can add interactive JS code here
console.log("Portfolio loaded.");

// Go to Top Button Functionality
document.addEventListener("DOMContentLoaded", function () {
    // Create the button if it doesn't exist
    let btn = document.getElementById("goToTopBtn");
    if (!btn) {
        btn = document.createElement("button");
        btn.id = "goToTopBtn";
        btn.textContent = "↑ Top";
        btn.style.position = "fixed";
        btn.style.bottom = "30px";
        btn.style.right = "30px";
        btn.style.padding = "0.7rem 1.2rem";
        btn.style.borderRadius = "2rem";
        btn.style.background = "#00adb5";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.fontSize = "1rem";
        btn.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)";
        btn.style.cursor = "pointer";
        btn.style.display = "none";
        btn.style.zIndex = "1000";
        document.body.appendChild(btn);
    }

    // Show/hide button on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });

    // Scroll to top on click
    btn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
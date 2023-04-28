// Smooth scrolling for the navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent the default behavior of the link (i.e. navigating to another page)
        e.preventDefault();
        // Use the href attribute of the link to find the corresponding section on the page
        const section = document.querySelector(this.getAttribute('href'));
        // Scroll smoothly to the corresponding section using the scrollIntoView method
        section.scrollIntoView({
            behavior: 'smooth' // Use smooth scrolling animation
        });
    });
});

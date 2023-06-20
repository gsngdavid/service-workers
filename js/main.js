let storyActive = window.location.href.includes('story');

if(storyActive) {
    let storyLink = document.querySelector('a[href="story.html"]');
    storyLink.classList.add('active');
}
else {
    let homeLink = document.querySelector('a[href="index.html"]');   
    homeLink.classList.add('active');
}
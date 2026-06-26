function toggleMenu() {
    var navigation = document.querySelector('.navigation ul');
    navigation.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleTitles = document.querySelectorAll('.toggle-title');
    const contents = document.querySelectorAll('.content');

    // Initially hide all content sections
    contents.forEach(content => content.classList.add('hidden'));

    toggleTitles.forEach((title, index) => {
        const arrow = title.querySelector('.arrow');
        title.addEventListener('click', () => {
            contents[index].classList.toggle('hidden');
            arrow.classList.toggle('rotate');
        });
    });
});


const icon = `<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6.25 9.375" y="0px" x="0px" version="1.1" height="32" width="32"><g transform="matrix(0.12121724,0,0,0.12121724,-2.9358621,-116.92797)"><path d="m 49.874997,986.36998 a 4.0003998,4.0003998 0 0 0 -2.6562,1.09375 l -24.999999,24.00007 a 4.0113322,4.0113322 0 0 0 5.5624,5.7812 l 22.218799,-21.34374 22.218805,21.34374 a 4.0113322,4.0113322 0 0 0 5.5624,-5.7812 L 52.781197,987.46373 a 4.0003998,4.0003998 0 0 0 -2.9062,-1.09375 z"/></g></svg>`;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');

    document.querySelectorAll('.btn-foldable').forEach((btn) => {
        btn.innerHTML += icon;

        btn.addEventListener('click', () => toggleFold(btn));
    });
});

const toggleFold = (btn) => {
    if (!btn.classList.contains('btn--fold')) {
        btn.classList.add('btn--fold');
        btn.nextElementSibling.classList.add('foldable--fold');
    } else {
        btn.classList.remove('btn--fold');
        btn.nextElementSibling.classList.remove('foldable--fold');
    }
};

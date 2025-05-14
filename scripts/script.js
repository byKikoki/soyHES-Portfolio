class TextScramble {
    constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
    }
    setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
            complete++
            output += to
        } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
            }
            output += `<span class="text">${char}</span>`
        } else {
            output += from
        }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
        this.resolve()
        } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
        }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}
const words = [
    'WebDeveloper',
    'Photographer']
const el = document.querySelector('.text')
const fx = new TextScramble(el)
let counter = 0
const doRandom = () => {
    fx.setText(words[counter]).then(() => {
    setTimeout(doRandom, 800)
    })
    counter = (counter + 1) % words.length
}
doRandom();

const gallery = document.querySelector('.gallery');
const track = document.querySelector('.gallery-track');
const cards = document.querySelectorAll('.card');
const easing = 0.05;
let startY = 0;
let endY = 0;
let raf;
const lerp = (start,end,t) => start * (1-t) + end * t;
function updateScroll() {
    startY = lerp(startY,endY,easing);
    gallery.style.height = `${track.clientHeight}px`;
    track.style.transform = `translateY(-${startY}px)`;
    activateParallax();
    raf = requestAnimationFrame(updateScroll);
    if (startY.toFixed(1) === window.scrollY.toFixed(1)) cancelAnimationFrame(raf);
}
function startScroll() {
    endY = window.scrollY; 
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateScroll);
}
function parallax(card) {
    const wrapper = card.querySelector('.card-image-wrapper');
    const diff = card.offsetHeight - wrapper.offsetHeight;
    const {top} = card.getBoundingClientRect();
    const progress = top / window.innerHeight;
    const yPos = diff * progress;
    wrapper.style.transform = `translateY(${yPos}px)`;
}
const activateParallax = () => cards.forEach(parallax);
function init() {
    activateParallax();
    startScroll();
}
window.addEventListener('load',updateScroll,false);
window.addEventListener('scroll',init,false);
window.addEventListener('resize',updateScroll,false);

function showForm() {
    var form = document.querySelector('.form-container');
    form.style.display = 'block';
    var closeButton = document.querySelector('.form-container .close');
    closeButton.addEventListener('click', function() {
        form.style.display = 'none';
    });
}
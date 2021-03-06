const $ = (elem) => document.querySelector(elem);
const $$ = (elem) => document.querySelectorAll(elem);
const getCssValue = (prop) => getComputedStyle($('html')).getPropertyValue(prop).trim();

let scale = getCssValue('--global-scale');
$('#scale').value = scale;

if (window.innerWidth < 400) $('#span').max = 150;
let span = getCssValue('--global-span');
$('#span').value = span;

let duration = getCssValue('--global-duration');

let curve = Number($('#curve').value);

const totalBalls = 30;
const ballSize = 15;
let count = 0;

const getBackground = (hue) => {
  return `radial-gradient(circle at 25% 70%, 
    hsl(${hue}, 100%, 70%) 5%, 
    hsl(${hue - 20}, 100%, 20%) 65%, 
    hsl(${hue}, 100%, 70%) 125%
  )`;
}

while (count++ < totalBalls) {
  const inc = count * curve / 250;
  const ball = document.createElement('div');
  const background = getBackground(60 + count * 6);
  const options = {
    id: count,
    className: 'ball',
    style: `
      width: ${ballSize}px;
      height: ${ballSize * 1.25}px;
      animation-delay: ${inc}s;
      animation-duration: ${duration}s;
      background: ${background};
    `
  }
  Object.assign(ball, options);
  $('.container').appendChild(ball);
}
 

$('#curve').addEventListener('input', e => {
  curve = Number(e.target.value);
  $$('.ball').forEach((ball, index) => {
    const inc = (index + 1) * curve / 250;
    ball.style.animationDelay = `${inc}s`;
  });
});

$('#scale').addEventListener('input', e => {
  scale = Number(e.target.value);
  $('html').style.setProperty('--global-scale', scale);
});

$('#span').addEventListener('input', e => {
  span = Number(e.target.value);
  $('html').style.setProperty('--global-span', span);
});


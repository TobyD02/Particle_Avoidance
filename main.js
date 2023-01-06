const canvas = document.getElementById("canvas")

/** @type {CanvasRenderingContext2D} */ 
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let mouse_pos = {x: 0, y: 0}

particles = []
let size = 4
let center = {x: canvas.width / 5, y: canvas.height/5}
let radius = Math.min(center.y, center.x)

for (let i = 0; i < canvas.width; i++) {
    for (let j = 0; j < canvas.height; j++) {
        if (Math.sqrt( Math.pow(i*size - center.x, 2) + Math.pow(j*size - center.y, 2)) < radius)
            particles.push(new Particle(i * size * 2 + (canvas.width / 10), j * size * 2 + (canvas.height / 10), size))
    }
}

function draw() {
    ctx.fillStyle='black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle='white'
    particles.forEach(p => {
        p.update(mouse_pos)
        p.draw(ctx)
    })

    requestAnimationFrame(draw)
}

window.addEventListener('mousemove', (e) => {
    mouse_pos.x = e.clientX
    mouse_pos.y = e.clientY
})

draw()
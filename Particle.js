class Particle {
    constructor(startx, starty, size) {
        this.startx = startx
        this.starty = starty
        this.x = this.startx
        this.y = this.starty
        this.size = size
        this.start_size = size

        let c1 = (this.x / canvas.width) * 255
        let c2 = (this.y / canvas.height) * 255
        this.colour = `rgba(${c1}, ${c2}, ${c2}, 0.5)`

        this.avoid_dist = 100
        this.avoid_strength = this.avoid_dist / 4

        this.target = {x: this.startx, y: this.starty}
        this.acc = {x: 0, y: 0}
        this.vel = {x: 0, y: 0}
    }
    
    draw(ctx) {
        ctx.fillStyle = this.colour
        ctx.fillRect(this.x, this.y, this.size, this.size)

    }

    update(mouse) {
        
        let rel_pos = {x: this.startx - mouse.x, y: this.starty - mouse.y}
        let distance = Math.sqrt( Math.pow(rel_pos.x, 2) + Math.pow(rel_pos.y, 2))
        
        if (distance <= this.avoid_dist) {
            let dir = {x: rel_pos.x / distance, y: rel_pos.y / distance}
            
            if (!isNaN(dir.x) || !isNaN(dir.y)) {
                this.target = {
                    x: this.startx + dir.x * this.avoid_strength,
                    y: this.starty + dir.y * this.avoid_strength
                }
            }

            this.size = this.start_size + this.start_size * (distance / this.avoid_dist)

        } else {
            this.target = {
                x: this.startx,
                y: this.starty
            }

            this.size = this.start_size
        }
        
        this.vel = {x: (this.x - this.target.x) / 4, y: (this.y - this.target.y) / 4}
        
        this.x -= this.vel.x
        this.y -= this.vel.y

        this.calc_col()

    }

    calc_col() {
        let c1 = (this.x / canvas.width) * 255
        let c2 = (this.y / canvas.height) * 255
        this.colour = `rgba(${c1}, ${c2}, ${ this.size / this.start_size / 2 * 255}, 0.5)`
    }
}
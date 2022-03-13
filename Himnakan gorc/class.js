class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (let i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }
}
class Grass extends LivingCreature {
    mul() {
        this.energy++;
        let found = this.chooseCell(0)
        let newCell = random(found);

        if (newCell && this.energy <= 8) {


            var x = newCell[0];
            var y = newCell[1];

            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);

            this.energy = 0;
        }

    }

}

class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 2;
    }
    mul() {


        let found = this.chooseCell(0)
        let newCell = random(found)

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);
        }

    }

    eat() {
        let found = this.chooseCell(1);
        let newCell = random(found);

        if (newCell) {
            this.energy += 3;
            let x = newCell[0];
            let y = newCell[1];



            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0;

            this.x = x
            this.y = y
            this.energy--
            if (this.energy > 30) {
                this.mul();
            }

        } else {
            this.move();
        }
    }
    move() {

        let found = this.chooseCell(0)
        let newCell = random(found);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;

            if (this.energy >= 0) {
                this.die();
            }
        }
    }
    die() {
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);

            }
        }
        matrix[this.y][this.x] = 0;
    }
}
class Ete extends LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {
        var found = [];
        for (let i = 0; i < this.directions.length; i++) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
    }
    mul() {


        this.energy++;
        let found = this.chooseCell(0)
        let newCell = random(found);

        if (newCell && this.energy >= 1) {


            var x = newCell[0];
            var y = newCell[1];

            let grass = new Ete(x, y);
            matrix[y][x] = 3;
            EteArr.push(grass);

            this.energy = 0;
        }

    }
    eat() {
        let found = this.chooseCell(1);
        let newCell = random(found);

        if (newCell) {
            this.energy += 3;
            let x = newCell[0];
            let y = newCell[1];



            for (let i = 0; i < EteArr.length; i++) {
                if (EteArr[i].x == x && EteArr[i].y == y) {
                    EteArr.splice(i, 1);
                    break;
                }
            }

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0;

            this.x = x
            this.y = y
            if (this.energy > 30) {
                this.mul();
            }

        } else {
            this.move();
        }
    }
    move() {

        let found = this.chooseCell(0)
        let newCell = random(found);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 3
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;

            if (this.energy >= 0) {
                this.die();
            }
        }
    }
    die() {
        for (let i = 0; i < EteArr.length; i++) {
            if (this.x == EteArr[i].x && this.y == EteArr[i].y) {
                EteArr.splice(i, 1)

            }
        }
        matrix[this.y][this.x] = 0;
    }
}
class Water {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 2;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {

        this.getNewCoordinates();
        let found = [];

        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }
    mul() {


        let found = this.chooseCell(0)
        let newCell = random(found)

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            let eater = new Water(x, y);
            matrix[y][x] = 4;
            waterArr.push(eater);


        }

    }

    eat() {
        let found = this.chooseCell(1);
        let newCell = random(found);

        if (newCell) {
            this.energy += 2;
            let x = newCell[0];
            let y = newCell[1];



            for (let i = 0; i < waterArr.length; i++) {
                if (waterArr[i].x == x && waterArr[i].y == y) {
                    waterArr.splice(i, 1);
                    break;
                }
            }

            matrix[y][x] = 4
            matrix[this.y][this.x] = 1;

            this.x = x
            this.y = y
            this.energy--
            if (this.energy > 30) {
                this.mul();
            }

        } else {
            this.move();
        }
    }
    move() {

        let found = this.chooseCell(0)
        let newCell = random(found);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;

            if (this.energy >= 0) {
                this.die();
            }
        }
    }
    die() {
        for (let i = 0; i < waterArr.length; i++) {
            if (this.x == waterArr[i].x && this.y == waterArr[i].y) {


            }
        }
        matrix[this.y][this.x] = 0;
    }
}


import { GameObject } from "/js/GameObject.js";
import { InputTypes } from '/js/ProcessInput.js';

export class Player extends GameObject {
    constructor (pos) {
        super();
        this.geometry = [
            -10, -50,
            10, -50,
            -10, 50,
            -10, 50,
            10, -50,
            10, 50,
        ];

        this.pos = pos;

        this.movmentVector = [0, 0];
    }

    draw (render) {
        render.draw(this.geometry, this.pos);
    }

    update (inputState) {
        if (inputState[InputTypes.ARROW_UP]) {
            this.pos[1] += 1;
        }
    }

}
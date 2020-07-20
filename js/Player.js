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
        this.velocityX = 0;
        this.velocityY = 0;
    }

    draw (render) {
        render.draw(this.geometry, this.pos);
    }

    update (inputState, deltaTime) {
        this.handleInput(inputState);
        this.pos[0] += this.velocityX;
        this.pos[1] += this.velocityY;
    }

    handleInput (inputState) {
        let hadInput = false;
        if (inputState[InputTypes.ARROW_UP]) {
            this.velocityY = 2;
            hadInput = true;
        } else {
            this.velocityY = 0;
        }
        if (inputState[InputTypes.ARROW_DOWN]) {
            this.velocityY = -2;
            hadInput = true;
        }

        if (inputState[InputTypes.ARROW_RIGHT]) {
            this.velocityX = 2;
            hadInput = true;
        } else if (inputState[InputTypes.ARROW_LEFT]) {
            this.velocityX = -2;
            hadInput = true;
        } else {
            this.velocityX = 0;
        }

        if (!hadInput) this.velocityX = this.velocityY = 0;
    }

}
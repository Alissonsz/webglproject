import { GameObject, ObjectTypes } from "/js/GameObject.js";
import { ColisionModule, ColisionTypes } from '/js/ColisionModule.js';
import { InputTypes } from '/js/ProcessInput.js';

export class Player extends GameObject {
    constructor (pos, colisionType, player) {
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
        this.player = player;
        this.movmentVector = [0, 0];
        this.velocityX = 0;
        this.velocityY = 0;
        this.colisionType = colisionType;

        if (colisionType == ColisionTypes.RIGHT) {
            ColisionModule.colisionObjects.push({
                x: pos[0] - 10,
                y: pos[1],
                yOffset: 50,
                colisionType: colisionType,
                type: ObjectTypes.PLAYER,
            });
        } else if (colisionType == ColisionTypes.LEFT) {
            ColisionModule.colisionObjects.push({
                x: pos[0] + 10,
                y: pos[1],
                yOffset: 50,
                colisionType: colisionType,
                type: ObjectTypes.PLAYER,
            });
        }
        this.colisionObjectIndex = ColisionModule.ObjectsCount() - 1;
    }

    draw (render) {
        render.draw(this.geometry, this.pos);
    }

    update (inputState, deltaTime) {
        this.handleInput(inputState);
        this.pos[0] += this.velocityX * deltaTime;
        this.pos[1] += this.velocityY * deltaTime;
        if (this.colisionType == ColisionTypes.RIGHT) {
            ColisionModule.updateObjectPos(this.colisionObjectIndex, this.pos[0] - 10, this.pos[1], 50);
        } else {
            ColisionModule.updateObjectPos(this.colisionObjectIndex, this.pos[0] + 10, this.pos[1], 50);
        }
    }

    handleInput (inputState) {
        let hadInput = false;

        if (this.player == 2) {
            if (inputState[InputTypes.ARROW_UP]) {
                this.velocityY = 8;
                hadInput = true;
            } else {
                this.velocityY = 0;
            }
            if (inputState[InputTypes.ARROW_DOWN]) {
                this.velocityY = -8;
                hadInput = true;
            }

            /*if (inputState[InputTypes.ARROW_RIGHT]) {
                this.velocityX = 4;
                hadInput = true;
            } else if (inputState[InputTypes.ARROW_LEFT]) {
                this.velocityX = -4;
                hadInput = true;
            } else {
                this.velocityX = 0;
            }*/
        } else {
            if (inputState[InputTypes.KEY_W]) {
                this.velocityY = 8;
                hadInput = true;
            } else {
                this.velocityY = 0;
            }
            if (inputState[InputTypes.KEY_S]) {
                this.velocityY = -8;
                hadInput = true;
            }

            /*if (inputState[InputTypes.KEY_D]) {
                this.velocityX = 4;
                hadInput = true;
            } else if (inputState[InputTypes.KEY_A]) {
                this.velocityX = -4;
                hadInput = true;
            } else {
                this.velocityX = 0;
            }*/
        }

        if (!hadInput) this.velocityX = this.velocityY = 0;
    }

}
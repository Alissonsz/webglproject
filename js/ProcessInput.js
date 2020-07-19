export class ProcessInput {
    constructor() {
        this.inputState = new Uint8Array();
        this.inputTypes = {
            ARROW_LEFT: 0,
            ARROW_RIGHT: 1,
            ARROW_UP: 2,
            ARROW_DOWN: 3
        }
        console.log(this.inputTypes);
    }

    StartListen() {
        console.log('starting listen for inputs');
        document.addEventListener('keydown', function (event) {
            console.log(event.keyCode);
            console.log(this);
            if(event.keyCode == 40) {
                this.inputState[this.inputTypes.ARROW_DOWN] = 1;
                console.log(this.inputState);
            } else if (event.keyCode == 38) {
                this.inputState[this.inputTypes.ARROW_UP] = 1;  
            } else if (event.keyCode == 83) {
        
            } else if (event.keyCode == 87) {
                
            }
        });
    }

    getInputState() {
        return this.inputState;
    }
}
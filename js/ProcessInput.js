var InputTypes = Object.freeze({
    ARROW_LEFT: 0,
    ARROW_RIGHT: 1,
    ARROW_UP: 2,
    ARROW_DOWN: 3,
});

class ProcessInput {
    static init() {
        ProcessInput.inputState = new Int8Array(4);
    }

    static StartListen() {
        console.log('starting listen for inputs');
        document.addEventListener('keydown', function (event) {
            if(event.keyCode == 40) {
                ProcessInput.inputState[InputTypes.ARROW_DOWN] = 1;
            } else if (event.keyCode == 38) {
                ProcessInput.inputState[InputTypes.ARROW_UP] = 1;
            } else if (event.keyCode == 39) {
                ProcessInput.inputState[InputTypes.ARROW_RIGHT] = 1;
            } else if (event.keyCode == 37) {
                ProcessInput.inputState[InputTypes.ARROW_LEFT] = 1;
            }
        });

        document.addEventListener('keyup', function (event) {
            if(event.keyCode == 40) {
                ProcessInput.inputState[InputTypes.ARROW_DOWN] = 0;
            } else if (event.keyCode == 38) {
                ProcessInput.inputState[InputTypes.ARROW_UP] = 0;
            } else if (event.keyCode == 39) {
                ProcessInput.inputState[InputTypes.ARROW_RIGHT] = 0;
            } else if (event.keyCode == 37) {
                ProcessInput.inputState[InputTypes.ARROW_LEFT] = 0;
            }
        });
    }

    static getInputState() {
        return ProcessInput.inputState;
    }
}

export { ProcessInput, InputTypes }
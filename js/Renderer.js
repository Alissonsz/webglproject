export class Renderer {
    gl;
    program;

    constructor () {console.log('')};

    async init (context) {
        this.gl = context.getContext("webgl");

        if (!this.gl) {
            console.log('No webgl for you :/');
        }

        await this.loadShaders();

        this.positionAttributeLocation = await this.gl.getAttribLocation(this.program, "a_position");
        this.translateUniformLocation = await this.gl.getUniformLocation(this.program, "translation");
        this.resolutionUniformLocation = await this.gl.getUniformLocation(this.program, "u_resolution");

        this.positionBuffer = this.gl.createBuffer();
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

        this.resize(this.gl);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        console.log(this.program)
        return 'morra';
        
    }

    clearBuffer() {
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    draw(pos, translate = [0, 0]) {
        this.gl.useProgram(this.program);
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);

        this.gl.uniform2fv(this.translateUniformLocation, translate);
        this.gl.uniform2f(this.resolutionUniformLocation, this.gl.canvas.width, this.gl.canvas.height);
        
        // Bind the position buffer.
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(pos), this.gl.STATIC_DRAW);
        
        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = this.gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        this.gl.vertexAttribPointer(
            this.positionAttributeLocation, size, type, normalize, stride, offset);

        var primitiveType = this.gl.TRIANGLES;
        var offset = 0;
        var count = pos.length/2;
        this.gl.drawArrays(primitiveType, offset, count);
    }

    drawCircle(pos, translate = [0, 0]) {
        this.gl.useProgram(this.program);
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);

        this.gl.uniform2fv(this.translateUniformLocation, translate);
        this.gl.uniform2f(this.resolutionUniformLocation, this.gl.canvas.width, this.gl.canvas.height);
        
        // Bind the position buffer.
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(pos), this.gl.STATIC_DRAW);
        
        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = this.gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        this.gl.vertexAttribPointer(
            this.positionAttributeLocation, size, type, normalize, stride, offset);

        var primitiveType = this.gl.TRIANGLE_FAN;
        var offset = 0;
        var count = pos.length/2;
        this.gl.drawArrays(primitiveType, offset, count);
    }

    resize(gl) {
        var realToCSSPixels = window.devicePixelRatio;
        // Lookup the size the browser is displaying the canvas in CSS pixels
        // and compute a size needed to make our drawingbuffer match it in
        // device pixels.
        var displayWidth  = Math.floor(gl.canvas.clientWidth  * realToCSSPixels);
        var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);
        
        // Check if the canvas is not the same size.
        if (gl.canvas.width  !== displayWidth || gl.canvas.height !== displayHeight) {
            // Make the canvas the same size
            gl.canvas.width  = displayWidth;
            gl.canvas.height = displayHeight;
        }
    }

    createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
          return shader;
        }
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
      
    createProgram(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
          return program;
        }
      
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

    async loadShaders(gl) {
        var vertexShaderSource;
        var fragmentShaderSource;

        var vertexShader;
        var fragmentShader;

        await fetch('/js/vertex-shader.js')
            .then(response => response.text())
            .then(text => {
                        vertexShaderSource = text
                        vertexShader = this.createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource);
                        });

        await fetch('/js/frag-shader.js')
            .then(response => response.text())
            .then(text => {
                        fragmentShaderSource = text
                        fragmentShader = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource);
                        });

        this.program = this.createProgram(this.gl, vertexShader, fragmentShader);
        
    }
}
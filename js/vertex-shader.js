// an attribute will receive data from a buffer
attribute vec2 a_position;
uniform vec2 translation;

uniform vec2 u_resolution;

// all shaders have a main function
void main() {
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  vec2 pos = a_position + translation;

   // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = pos / u_resolution;

	// convert from 0->1 to 0->2
	vec2 zeroToTwo = zeroToOne * 2.0;

	// convert from 0->2 to -1->+1 (clip space)
	vec2 clipSpace = zeroToTwo;
  gl_Position = vec4(clipSpace * vec2(1, 1), 0, 1);
}
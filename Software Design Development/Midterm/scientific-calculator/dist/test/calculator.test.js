const assert = require('chai').assert;
const { percent, changeSign, cos, sin, tan, sqrt, ln, exp, deleteChar } = require('../script');  // Adjust the path if script.js is in the same folder

describe('Calculator Functions', function() {
    it('should append % to the value', function() {
        let display = { value: "50" };
        percent(display);
        assert.equal(display.value, "50%", "Percent function did not append % correctly.");
    });

    it('should toggle the sign of the value', function() {
        let display = { value: "50" };
        changeSign(display);
        assert.equal(display.value, "-50", "Change sign function failed to change sign to negative.");

        changeSign(display);
        assert.equal(display.value, "50", "Change sign function failed to change sign back to positive.");
    });

    it('should calculate the cosine of PI', function() {
        let form = { display: { value: Math.PI.toString() } };
        cos(form);
        assert.closeTo(parseFloat(form.display.value), -1, 0.01, "Cosine function failed for PI.");
    });

    it('should calculate the sine of PI/2', function() {
        let form = { display: { value: (Math.PI / 2).toString() } };
        sin(form);
        assert.closeTo(parseFloat(form.display.value), 1, 0.01, "Sine function failed for PI/2.");
    });

    it('should calculate the tangent of 0', function() {
        let form = { display: { value: "0" } };
        tan(form);
        assert.closeTo(parseFloat(form.display.value), 0, 0.01, "Tangent function failed for 0.");
    });

    it('should calculate the square root of 4', function() {
        let form = { display: { value: "4" } };
        sqrt(form);
        assert.equal(form.display.value, "2", "Square root function failed for 4.");
    });

    it('should calculate the natural log of 1', function() {
        let form = { display: { value: "1" } };
        ln(form);
        assert.closeTo(parseFloat(form.display.value), 0, 0.01, "Natural log function failed for 1.");
    });

    it('should calculate the exponential of 1', function() {
        let form = { display: { value: "1" } };
        exp(form);
        assert.closeTo(parseFloat(form.display.value), Math.exp(1), 0.01, "Exponential function failed for 1.");
    });

    it('should delete the last character of the string "123"', function() {
        let input = { value: "123" };
        deleteChar(input);
        assert.equal(input.value, "12", "Delete character function failed to delete the last character.");
    });
});


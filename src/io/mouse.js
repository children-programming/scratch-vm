var MathUtil = require('../util/math-util');

var Mouse = function (runtime) {
    this._x = 0;
    this._y = 0;
    this._isDown = false;
    /**
     * Reference to the owning Runtime.
     * Can be used, for example, to activate hats.
     * @type{!Runtime}
     */
    this.runtime = runtime;
};

/**
 * Activate "event_whenthisspriteclicked" hats if needed.
 * @param  {number} x X position to be sent to the renderer.
 * @param  {number} y Y position to be sent to the renderer.
 * @private
 */
Mouse.prototype._activateClickHats = function (x, y) {
    if (this.runtime.renderer) {
        var drawableID = this.runtime.renderer.pick(x, y);
        for (var i = 0; i < this.runtime.targets.length; i++) {
            var target = this.runtime.targets[i];
            if (target.hasOwnProperty('drawableID') &&
                target.drawableID === drawableID) {
                this.runtime.startHats('event_whenthisspriteclicked',
                    null, target);
                return;
            }
        }
    }
};

/**
 * Mouse DOM event handler.
 * @param  {object} data Data from DOM event.
 */
Mouse.prototype.postData = function (data) {
    if (data.x) {
        this._x = data.x - data.canvasWidth / 2;
    }
    if (data.y) {
        this._y = data.y - data.canvasHeight / 2;
    }
    if (typeof data.isDown !== 'undefined') {
        this._isDown = data.isDown;
        if (!this._isDown) {
            this._activateClickHats(data.x, data.y);
        }
    }
};

/**
 * Get the X position of the mouse.
 * @return {number} Clamped X position of the mouse cursor.
 */
Mouse.prototype.getX = function () {
    return MathUtil.clamp(this._x, -240, 240);
};

/**
 * Get the Y position of the mouse.
 * @return {number} Clamped Y position of the mouse cursor.
 */
Mouse.prototype.getY = function () {
    return MathUtil.clamp(-this._y, -180, 180);
};

/**
 * Get the down state of the mouse.
 * @return {boolean} Is the mouse down?
 */
Mouse.prototype.getIsDown = function () {
    return this._isDown;
};

module.exports = Mouse;

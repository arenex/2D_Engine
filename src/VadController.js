function VadController()
{
    this.sprite = 1;
    this.button_pressed_left = false;
    this.button_pressed_right = false;
    this.button_pressed_A = false;
    this.button_pressed_B = false;
    this.touchable = false;

    var vadcontroller_this = this;
    var touches = [];
    var button_location_left = [25, 184, 85, 230];
    var button_location_right = [111, 184, 170, 230];
    var button_location_A = [336, 176, 393, 232];
    var button_location_B = [408, 176, 467, 232];

    VadController.prototype.onTouchStart = function(e)
    {
        touches = e.touches;
    }
    VadController.prototype.onTouchMove = function(e)
    {
        e.preventDefault();
        touches = e.touches;
    }
    VadController.prototype.onTouchEnd = function(e)
    {
        touches = e.touches;
    }

    VadController.prototype.draw = function(context)
    {
        this.sprite.draw(context, 0, 0);
    }

    VadController.prototype.onCreate = function(canvas, sprite)
    {
        vadcontroller_this.sprite = sprite;
        vadcontroller_this.touchable = 'createTouch' in document;
        if (!vadcontroller_this.touchable)
        {
            document.onkeydown = function()
            {
                switch (window.event.keyCode)
                {
                    case 37:
                        vadcontroller_this.button_pressed_left = true;
                        break;
                    case 38:
                        vadcontroller_this.button_pressed_B = true;
                        break;
                    case 39:
                        vadcontroller_this.button_pressed_right = true;
                        break;
                    case 40:
                        break;
                }
            };

            document.onkeyup = function()
            {
                switch (window.event.keyCode)
                {
                    case 37:
                        vadcontroller_this.button_pressed_left = false;
                        break;
                    case 38:
                        vadcontroller_this.button_pressed_B = false;
                        break;
                    case 39:
                        vadcontroller_this.button_pressed_right = false;
                        break;
                    case 40:
                        break;
                }
            };
        }
        else
        {
            canvas.addEventListener('touchstart', vadcontroller_this.onTouchStart, false);
            canvas.addEventListener('touchmove', vadcontroller_this.onTouchMove, false);
            canvas.addEventListener('touchend', vadcontroller_this.onTouchEnd, false);
        }
    }

    VadController.prototype.process_found_touch = function(x, y)
    {
        var window_width = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        var window_height = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;

        y = (y / window_height) * 232;
        y = Math.floor(y);
        x = (x / window_width) * 500;
        x = Math.floor(x);

        if (vadcontroller_this.check_if_touch_is_within_button(x, y, button_location_left)) vadcontroller_this.button_pressed_left = true;
        if (vadcontroller_this.check_if_touch_is_within_button(x, y, button_location_right)) vadcontroller_this.button_pressed_right = true;
        if (vadcontroller_this.check_if_touch_is_within_button(x, y, button_location_A)) vadcontroller_this.button_pressed_A = true;
        if (vadcontroller_this.check_if_touch_is_within_button(x, y, button_location_B)) vadcontroller_this.button_pressed_B = true;
    }

    VadController.prototype.check_if_touch_is_within_button = function(x, y, button)
    {
        var button_x1 = button[0];
        var button_y1 = button[1];
        var button_x2 = button[2];
        var button_y2 = button[3];
        if (x > button_x1 && x < button_x2)
        {
            if (y > button_y1 && y < button_y2)
            {
                return true;
            }
        }
        return false;
    }

    VadController.prototype.handle_touches = function()
    {
        if (!vadcontroller_this.touchable) return;
        vadcontroller_this.button_pressed_left = false;
        vadcontroller_this.button_pressed_right = false;
        vadcontroller_this.button_pressed_A = false;
        vadcontroller_this.button_pressed_B = false;

        for (var i = 0; i < touches.length; i++)
        {
            var touch = touches[i];
            vadcontroller_this.process_found_touch(touch.clientX, touch.clientY);
        }
    }
}
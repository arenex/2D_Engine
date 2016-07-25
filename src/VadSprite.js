function VadSprite(image_url, width, height, numframes, animspeed, xoffset, yoffset, num_of_rows)
{
    this.loaded = false;
    var _this = this;
    this.play_once_and_dissapear = false;
    this.image = new Image();
    this.image.onload = function()
    {
        _this.loaded = true;
        return true;
    }
    this.image.src = image_url;

    this.width = width;
    this.height = height;
    this.numframes = numframes;
    this.animspeed = animspeed;
    this.xoffset = xoffset;
    this.yoffset = yoffset;
    this.num_of_rows = num_of_rows;

    this.finish_requested = false;
    this.last_frame_num = 0;
    this.is_idle = false;
    this.sprite_offset = 0;
    this.id = 1000;
    this.timecreated = new Date().getTime();

    VadSprite.prototype.sprite_animate = function()
    {
        this.is_idle = false;
        this.timecreated = new Date().getTime();
    }

    VadSprite.prototype.sprite_idle = function()
    {
        this.is_idle = true;
    }

    VadSprite.prototype.start_playing_once = function()
    {
        this.timecreated = new Date().getTime();
        this.last_frame_num = 0;
        this.play_once_and_dissapear = true;
        this.finish_requested = true;
        this.loaded = true;
        this.is_idle = false;
    }

    VadSprite.prototype.draw = function(context, x, y)
    {
        if (!this.loaded) return;
        var time_passed = new Date().getTime() - this.timecreated;
        var max_time_for_sequence = this.numframes * this.animspeed;
        var frame_number = (time_passed % max_time_for_sequence);
        frame_number = Math.floor(frame_number / this.animspeed);

        if (this.finish_requested)
        {
            if (frame_number < this.last_frame_num)
            {
                this.is_idle = true;
                this.last_frame_num = 0;
                this.finish_requested = false;
                if (this.play_once_and_dissapear)
                {
                    this.loaded = false;
                }
            }
        }
        this.last_frame_num = frame_number;
        if (this.is_idle) frame_number = 0;

        var x_clipping_offset = frame_number * width;
        var frames_per_row = this.numframes / this.num_of_rows;
        var y_clipping_offset = Math.floor(frame_number / frames_per_row) * this.height;
        var x_clipping_offset = (frame_number % frames_per_row) * this.width;
        if (this.loaded)
        {
            context.drawImage(this.image, x_clipping_offset, y_clipping_offset + this.sprite_offset, this.width, this.height, x + this.xoffset, y + this.yoffset, this.width, this.height);
        }
    }
}
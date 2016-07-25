var VadSolid = (function()
{
    var x;
    var y;
    var width;
    var height;
    var gravity;
    var moveable;
    var original_moveable;
    var counter;
    var type = 0;

    function Foo(x, y, width, height, moveable, block_counter)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.gravity = 0;
        this.moveable = moveable;
        this.original_moveable = moveable;
        this.counter = block_counter;
        this.type = 1;
    };

    Foo.prototype.collision_with = function(other)
    {
        if ((this.x < other.x && this.x + this.width > other.x) || (this.x > other.x && this.x < other.x + other.width) || (this.x == other.x))
        {
            if ((this.y < other.y && this.y + this.height > other.y) || (this.y > other.y && other.y + other.height > this.y) || (this.y == other.y))
            {
                return true;
            }
        }
        return false;
    };

    Foo.prototype.will_collide_test = function(x, y, width, height)
    {
        var test = new Solid(x, y, width, height, false, 0);
        for (var i = 0; i < blocks.length; i++)
        {
            var temp_block = blocks[i];
            if (temp_block.collision_with(test))
            {
                return true;
            }
        }
        return false;
    };

    return Foo;
})();
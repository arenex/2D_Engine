function VadEngine(player, solids)
{
    this.player = player;
    this.solids = solids;
    this.collision_tasks = [];
    this.step_tasks = [];

    VadEngine.prototype.will_collide_test_relevantOnlySolids = function(x, y, width, height, blocks_in_range)
    {
        var test = new VadSolid(x, y, width, height, false, 0);
        for (var i = 0; i < blocks_in_range.length; i++)
        {
            var temp_block = blocks_in_range[i];
            if (temp_block.collision_with(test))
            {
                return true;
            }
        }
        return false;
    }

    VadEngine.prototype.will_collide_test = function(x, y, width, height)
    {
        var blocks = this.solids;
        var test = new VadSolid(x, y, width, height, false, 0);
        for (var i = 0; i < blocks.length; i++)
        {
            var temp_block = blocks[i];
            if (temp_block.collision_with(test))
            {
                return true;
            }
        }
        return false;
    }

    VadEngine.prototype.step_add = function(function_passed, arguments)
    {
        var task = [];
        task[0] = function_passed;
        task[1] = arguments;
        this.step_tasks.push(task);
    }

    VadEngine.prototype.step_process_alltasks = function()
    {
        for (var i = 0; i < this.step_tasks.length; i++)
        {
            var task = this.step_tasks[i];
            var function_passed = task[0];
            var arguments = task[1];
            function_passed(arguments);
        }
    }

    VadEngine.prototype.collision_add_case = function(player, block, collision_type, function_passed, arguments)
    {
        var task = [];
        task[0] = player;
        task[1] = block;
        task[2] = collision_type;
        task[3] = function_passed;
        task[4] = arguments;
        this.collision_tasks.push(task);
    }

    VadEngine.prototype.collision_tasks_process = function()
    {
        for (var i = 0; i < this.collision_tasks.length; i++)
        {
            var task = this.collision_tasks[i];
            var player = task[0];
            var block = task[1];
            var collision_type = task[2];
            var function_passed = task[3];
            var arguments = task[4];
            if (collision_type == 1)
            {
                if (((player.x + player.width) > block.x) && ((block.x + block.width) > player.x))
                {
                    if (player.y + player.height == block.y)
                    {
                        if (player.vspeed >= 0)
                            function_passed(arguments);
                    }
                }
            }

            if (collision_type == 2)
            {
                if (((player.x + player.width) > block.x) && ((block.x + block.width) > player.x))
                {
                    if (player.y + player.height > block.y && player.y + player.height <= block.y + player.max_fall)
                    {
                        if (player.vspeed > 0)
                        {
                            function_passed(arguments);
                        }
                    }
                }
            }

            if (collision_type == 3)
            {
                if (((player.x) > block.x) && ((block.x + block.width) > player.x + player.width))
                {
                    if (((player.y) > block.y) && ((block.y + block.height) > player.y + player.height))
                    {
                        function_passed(arguments);
                    }
                }
            }
        }
    }

    VadEngine.prototype.collision_run_step = function()
    {
        var player = this.player;
        var solids = this.solids;
        var store_old_x = player.x;
        var store_old_y = player.y;

        if (player.hspeed > 0) player.direction = 1;
        if (player.hspeed < 0) player.direction = -1;

        var x_old = player.x;
        var y_old = player.y;
        var x_new = x_old + player.hspeed;
        var y_new = y_old + player.vspeed;
        if (player.maxgravity != 0)
        {
            if (player.player_on_ground) y_new = y_old + 1;
        }

        var falling = false;
        if (y_new > y_old) falling = true;
        var width = player.width;
        var height = player.height;

        var hor_direction_increment = 0;
        var ver_direction_increment = 0;
        if (x_new > x_old) hor_direction_increment = 1;
        if (x_new < x_old) hor_direction_increment = -1;
        if (y_new > y_old) ver_direction_increment = 1;
        if (y_new < y_old) ver_direction_increment = -1;
        var temp_calc_x2 = this.player.x + this.player.width;
        var temp_calc_x1 = this.player.x;
        if (x_new > x_old) temp_calc_x2 += Math.abs(x_new - x_old);
        if (x_new < x_old) temp_calc_x1 -= Math.abs(x_new - x_old);

        var temp_calc_y2 = this.player.y + this.player.height;
        var temp_calc_y1 = this.player.y;
        if (y_new > y_old) temp_calc_y2 += Math.abs(y_new - y_old);
        if (y_new < y_old) temp_calc_y1 -= Math.abs(y_new - y_old);

        var block_player = new VadSolid(temp_calc_x1, temp_calc_y1, Math.abs(temp_calc_x2 - temp_calc_x1), Math.abs(temp_calc_y2 - temp_calc_y1), false, 0);
        var blocks_in_range = [];

        for (var i = 0; i < this.solids.length; i++)
        {
            var current_solid = this.solids[i];
            if (block_player.collision_with(current_solid))
            {
                blocks_in_range.push(current_solid);
            }
        }

        var hor_collision = false;
        var ver_collision = false;
        while (true)
        {
            if (blocks_in_range.length < 1)
            {
                x_old = x_new;
                y_old = y_new;
                break;
            }
            hor_collision = false;
            ver_collision = false;
            if (x_old != x_new) hor_collision = this.will_collide_test_relevantOnlySolids(x_old + hor_direction_increment, y_old, width, height, blocks_in_range);
            if (y_old != y_new) ver_collision = this.will_collide_test_relevantOnlySolids(x_old, y_old + ver_direction_increment, width, height, blocks_in_range);
            if (x_old == x_new && y_old == y_new) break;
            if (x_old == x_new && ver_collision) break;
            if (y_old == y_new && hor_collision) break;
            if (ver_collision && hor_collision) break;
            if (x_old != x_new && !hor_collision) x_old += hor_direction_increment;
            if (y_old != y_new && !ver_collision) y_old += ver_direction_increment;
        }

        player.x = x_old;
        player.y = y_old;

        if (ver_collision)
        {
            if (player.vspeed < 0)
            {
                player.gravity = player.gravity_upon_hit_above;
            }
            else
            {
                player.gravity = 0;
            }
            if (player.maxgravity != 0) player.vspeed = 0;
            if (falling) player.player_on_ground = true;
        }
        else if (!ver_collision)
        {
            player.player_on_ground = false;
            if (player.gravity == 0) player.gravity = player.initial_gravity;
            player.vspeed += Math.floor(player.gravity);
            if (player.vspeed > player.max_fall) player.vspeed = player.max_fall;
            if (player.gravity < player.maxgravity)
            {
                player.gravity += player.gravity_increment_value;
            }
        }
    }
}

function VadViewPort()
{
    this.x_offset = 0;
    this.y_offset = 0;
}
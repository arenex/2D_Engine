var resources_loc = "img/";
var debug = false;
var drawables = new Array();
var player = new VadPlayer();
var engine = new VadEngine(1, 1);
var vadcontroller = new VadController();
var blocks = new Array();
var viewport = new VadViewPort();
engine.player = player;
engine.solids = blocks;
var temp_player_current_speed = 1;
var global_block_counter = 0;
var map_offset_on_create_x = 0;
var map_offset_on_create_y = 0;
viewport.x_offset = 0;
viewport.y_offset = map_offset_on_create_y;
var animspeed_walking = 60;

var sprite_vadcontroller = new VadSprite(resources_loc + 'vadcontroller.png', 500, 252, 1, 9999, 0, 0, 1);
var sprite_juggwalkleft = new VadSprite(resources_loc + 'juggleft.png', 72, 52, 16, animspeed_walking, 40 / 2 - 36, -3, 1);
var sprite_juggwalkright = new VadSprite(resources_loc + 'juggright.png', 72, 52, 16, animspeed_walking, 40 / 2 - 36, -3, 1);
var sprite_juggstandleft = new VadSprite(resources_loc + 'juggstandleft.png', 70, 57, 8, animspeed_walking * 2, 40 / 2 - 36, -3, 1);
var sprite_juggstandright = new VadSprite(resources_loc + 'juggstandright.png', 70, 57, 8, animspeed_walking * 2, 40 / 2 - 36, -3, 1);
var sprite_juggjumpleft = new VadSprite(resources_loc + 'juggjumpleft.png', 71, 45, 8, animspeed_walking, 40 / 2 - 36, -3, 1);
var sprite_juggjumpright = new VadSprite(resources_loc + 'juggjumpright.png', 71, 45, 8, animspeed_walking, 40 / 2 - 36, -3, 1);
var sprite_tramp_wait = new VadSprite(resources_loc + 'trampoline_wait.png', 30, 16, 1, animspeed_walking, 0, 0, 1);
var sprite_tramp_done = new VadSprite(resources_loc + 'trampoline_done.png', 30, 16, 1, animspeed_walking, 0, 0, 1);
var sprite_goomba_walk = new VadSprite(resources_loc + 'goomba_walk.png', 36, 36, 2, 300, 0, 0, 1);
var sprite_goomba_hit = new VadSprite(resources_loc + 'goomba_hit.png', 36, 9, 1, 99999, 0, 36 - 9, 1);
var sprite_movingblock = new VadSprite(resources_loc + 'moving_block.png', 56, 13, 1, 99999, 0, -1, 1);

player.add_sprite("jugg_walk_left", sprite_juggwalkleft);
player.add_sprite("jugg_walk_right", sprite_juggwalkright);
player.add_sprite("jugg_stand_left", sprite_juggstandleft);
player.add_sprite("jugg_stand_right", sprite_juggstandright);
player.add_sprite("jugg_jump_left", sprite_juggjumpleft);
player.add_sprite("jugg_jump_right", sprite_juggjumpright);

player.hspeed = 0;
player.width = 40;
player.height = 45;
player.x = 300;
player.max_jump = 20;
player.maxgravity = 1;
player.initial_gravity = 1;
player.gravity_increment_value = 0.1;
player.gravity_upon_hit_above = 1;
player.max_fall = 12;
player.max_hspeed = 5;

var background_loaded = false;
var background_image = new Image();
background_image.onload = function()
{
    background_loaded = true;
}
background_image.src = resources_loc + 'mario_level01.png';

blocks.push(new VadSolid(3 + map_offset_on_create_x, 3968 + map_offset_on_create_y, 1101, 5, false, global_block_counter++));
blocks.push(new VadSolid(4 + map_offset_on_create_x, 3784 - 4000 + map_offset_on_create_y, 4, 183 + 4000, false, global_block_counter++));
blocks.push(new VadSolid(6 + map_offset_on_create_x, 3998 + map_offset_on_create_y, 3363, 1, false, global_block_counter++));
blocks.push(new VadSolid(256 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 16, 16, false, global_block_counter++));
blocks.push(new VadSolid(320 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 80, 16, false, global_block_counter++));
blocks.push(new VadSolid(352 + map_offset_on_create_x, 3840 + map_offset_on_create_y, 16, 16, false, global_block_counter++));
blocks.push(new VadSolid(448 + map_offset_on_create_x, 3936 + map_offset_on_create_y, 33, 31, false, global_block_counter++));
blocks.push(new VadSolid(551 + map_offset_on_create_x, 3656 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(562 + map_offset_on_create_x, 3728 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(608 + map_offset_on_create_x, 3920 + map_offset_on_create_y, 32, 47, false, global_block_counter++));
blocks.push(new VadSolid(728 + map_offset_on_create_x, 3789 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(736 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 32, 63, false, global_block_counter++));
blocks.push(new VadSolid(766 + map_offset_on_create_x, 3638 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(775 + map_offset_on_create_x, 3542 + map_offset_on_create_y, 31, 64, false, global_block_counter++));
blocks.push(new VadSolid(807 + map_offset_on_create_x, 3542 + map_offset_on_create_y, 32, 95, false, global_block_counter++));
blocks.push(new VadSolid(840 + map_offset_on_create_x, 3574 + map_offset_on_create_y, 31, 63, false, global_block_counter++));
blocks.push(new VadSolid(884 + map_offset_on_create_x, 3705 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(912 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 32, 62, false, global_block_counter++));
blocks.push(new VadSolid(980 + map_offset_on_create_x, 3513 + map_offset_on_create_y, 32, 191, false, global_block_counter++));
blocks.push(new VadSolid(1024 + map_offset_on_create_x, 3888 + map_offset_on_create_y, 16, 16, false, global_block_counter++));
blocks.push(new VadSolid(1099 + map_offset_on_create_x, 3974 + map_offset_on_create_y, 5, 23, false, global_block_counter++));
blocks.push(new VadSolid(1136 + map_offset_on_create_x, 3968 + map_offset_on_create_y, 240, 5, false, global_block_counter++));
blocks.push(new VadSolid(1137 + map_offset_on_create_x, 3974 + map_offset_on_create_y, 4, 23, false, global_block_counter++));
blocks.push(new VadSolid(1232 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 48, 16, false, global_block_counter++));
blocks.push(new VadSolid(1280 + map_offset_on_create_x, 3840 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1371 + map_offset_on_create_x, 3974 + map_offset_on_create_y, 5, 23, false, global_block_counter++));
blocks.push(new VadSolid(1424 + map_offset_on_create_x, 3968 + map_offset_on_create_y, 1024, 5, false, global_block_counter++));
blocks.push(new VadSolid(1425 + map_offset_on_create_x, 3974 + map_offset_on_create_y, 4, 23, false, global_block_counter++));
blocks.push(new VadSolid(1456 + map_offset_on_create_x, 3840 + map_offset_on_create_y, 64, 16, false, global_block_counter++));
blocks.push(new VadSolid(1504 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 16, 16, false, global_block_counter++));
blocks.push(new VadSolid(1600 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 32, 16, false, global_block_counter++));
blocks.push(new VadSolid(1696 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 16, 16, false, global_block_counter++));
blocks.push(new VadSolid(1744 + map_offset_on_create_x, 3840 + map_offset_on_create_y, 16, 16, false, global_block_counter++));
blocks.push(new VadSolid(1745 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 15, 16, false, global_block_counter++));
blocks.push(new VadSolid(1792 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 16, 16, false, global_block_counter++));
blocks.push(new VadSolid(1888 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 16, 16, false, global_block_counter++));
blocks.push(new VadSolid(1936 + map_offset_on_create_x, 3840 + map_offset_on_create_y, 48, 16, false, global_block_counter++));
blocks.push(new VadSolid(2048 + map_offset_on_create_x, 3840 + map_offset_on_create_y, 64, 16, false, global_block_counter++));
blocks.push(new VadSolid(2064 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 32, 16, false, global_block_counter++));
blocks.push(new VadSolid(2144 + map_offset_on_create_x, 3952 + map_offset_on_create_y, 64, 15, false, global_block_counter++));
blocks.push(new VadSolid(2160 + map_offset_on_create_x, 3936 + map_offset_on_create_y, 48, 16, false, global_block_counter++));
blocks.push(new VadSolid(2176 + map_offset_on_create_x, 3920 + map_offset_on_create_y, 32, 16, false, global_block_counter++));
blocks.push(new VadSolid(2192 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 16, 16, false, global_block_counter++));
blocks.push(new VadSolid(2240 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 16, 63, false, global_block_counter++));
blocks.push(new VadSolid(2256 + map_offset_on_create_x, 3920 + map_offset_on_create_y, 16, 47, false, global_block_counter++));
blocks.push(new VadSolid(2272 + map_offset_on_create_x, 3936 + map_offset_on_create_y, 16, 31, false, global_block_counter++));
blocks.push(new VadSolid(2288 + map_offset_on_create_x, 3952 + map_offset_on_create_y, 16, 15, false, global_block_counter++));
blocks.push(new VadSolid(2368 + map_offset_on_create_x, 3952 + map_offset_on_create_y, 80, 15, false, global_block_counter++));
blocks.push(new VadSolid(2384 + map_offset_on_create_x, 3936 + map_offset_on_create_y, 64, 16, false, global_block_counter++));
blocks.push(new VadSolid(2400 + map_offset_on_create_x, 3920 + map_offset_on_create_y, 48, 16, false, global_block_counter++));
blocks.push(new VadSolid(2416 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 32, 16, false, global_block_counter++));
blocks.push(new VadSolid(2436 + map_offset_on_create_x, 3974 + map_offset_on_create_y, 12, 23, false, global_block_counter++));
blocks.push(new VadSolid(2480 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 16, 63, false, global_block_counter++));
blocks.push(new VadSolid(2481 + map_offset_on_create_x, 3968 + map_offset_on_create_y, 884, 5, false, global_block_counter++));
blocks.push(new VadSolid(2482 + map_offset_on_create_x, 3974 + map_offset_on_create_y, 8, 22, false, global_block_counter++));
blocks.push(new VadSolid(2496 + map_offset_on_create_x, 3920 + map_offset_on_create_y, 16, 47, false, global_block_counter++));
blocks.push(new VadSolid(2512 + map_offset_on_create_x, 3936 + map_offset_on_create_y, 16, 31, false, global_block_counter++));
blocks.push(new VadSolid(2528 + map_offset_on_create_x, 3952 + map_offset_on_create_y, 16, 15, false, global_block_counter++));
blocks.push(new VadSolid(2608 + map_offset_on_create_x, 3936 + map_offset_on_create_y, 32, 31, false, global_block_counter++));
blocks.push(new VadSolid(2688 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 64, 16, false, global_block_counter++));
blocks.push(new VadSolid(2864 + map_offset_on_create_x, 3936 + map_offset_on_create_y, 32, 30, false, global_block_counter++));
blocks.push(new VadSolid(2897 + map_offset_on_create_x, 3952 + map_offset_on_create_y, 143, 15, false, global_block_counter++));
blocks.push(new VadSolid(2912 + map_offset_on_create_x, 3936 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(2928 + map_offset_on_create_x, 3920 + map_offset_on_create_y, 112, 16, false, global_block_counter++));
blocks.push(new VadSolid(2944 + map_offset_on_create_x, 3904 + map_offset_on_create_y, 96, 16, false, global_block_counter++));
blocks.push(new VadSolid(2960 + map_offset_on_create_x, 3888 + map_offset_on_create_y, 80, 16, false, global_block_counter++));
blocks.push(new VadSolid(2976 + map_offset_on_create_x, 3872 + map_offset_on_create_y, 64, 16, false, global_block_counter++));
blocks.push(new VadSolid(2992 + map_offset_on_create_x, 3856 + map_offset_on_create_y, 48, 16, false, global_block_counter++));
blocks.push(new VadSolid(3008 + map_offset_on_create_x, 3840 + map_offset_on_create_y, 32, 16, false, global_block_counter++));
blocks.push(new VadSolid(3168 + map_offset_on_create_x, 3952 + map_offset_on_create_y, 16, 15, false, global_block_counter++));
blocks.push(new VadSolid(3343 + map_offset_on_create_x, 3779 - 4000 + map_offset_on_create_y, 2, 188 + 4000, false, global_block_counter++));
blocks.push(new VadSolid(799 + map_offset_on_create_x, 3192 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(926 + map_offset_on_create_x, 3296 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1040 + map_offset_on_create_x, 3110 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1048 + map_offset_on_create_x, 2570 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1062 + map_offset_on_create_x, 3498 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1130 + map_offset_on_create_x, 2666 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1144 + map_offset_on_create_x, 3408 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1167 + map_offset_on_create_x, 3011 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1169 + map_offset_on_create_x, 2782 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1171 + map_offset_on_create_x, 3317 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1238 + map_offset_on_create_x, 2456 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1303 + map_offset_on_create_x, 2921 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1394 + map_offset_on_create_x, 2826 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1403 + map_offset_on_create_x, 2381 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1463 + map_offset_on_create_x, 1565 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1550 + map_offset_on_create_x, 1671 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1562 + map_offset_on_create_x, 2290 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1664 + map_offset_on_create_x, 1773 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1679 + map_offset_on_create_x, 1423 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1696 + map_offset_on_create_x, 1133 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1710 + map_offset_on_create_x, 2194 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1813 + map_offset_on_create_x, 1883 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1832 + map_offset_on_create_x, 1249 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1875 + map_offset_on_create_x, 2102 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1879 + map_offset_on_create_x, 1638 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(1954 + map_offset_on_create_x, 1387 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(2014 + map_offset_on_create_x, 2004 + map_offset_on_create_y, 128, 16, false, global_block_counter++));
blocks.push(new VadSolid(2033 + map_offset_on_create_x, 1531 + map_offset_on_create_y, 128, 16, false, global_block_counter++));

map_offset_on_create_y = 4000 - 232;
player.y = 30 + map_offset_on_create_y;

var trampoline_z = 30;
for (var x = 0; x < 4; x++)
{
    var trampoline = new Trampoline(sprite_tramp_wait, sprite_tramp_done, 470 + trampoline_z, 120 + map_offset_on_create_y, 30, 16);
    trampoline_z += 110;
}

var goomba = new Goomba(sprite_goomba_walk, 90 + 80, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 400 + 80, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 700, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 800, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 1000, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 1300, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 1800, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 2000, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 2200, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 2320, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 2560, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 2780, 200 - 32 - 4 + map_offset_on_create_y);
var goomba = new Goomba(sprite_goomba_walk, 3060, 200 - 32 - 4 + map_offset_on_create_y);

var movingblock = new MovingBlockHorizontal(sprite_movingblock, 220, 200 - 32 - 4 + map_offset_on_create_y - 100, 56, 13, 100, 300);
var movingblock = new MovingBlockHorizontal(sprite_movingblock, 200, 200 - 32 - 4 + map_offset_on_create_y - 100 - 100, 56, 13, 100, 300);
var movingblock = new MovingBlockHorizontal(sprite_movingblock, 110, 200 - 32 - 4 + map_offset_on_create_y - 100 - 200, 56, 13, 100, 300);
var movingblock = new MovingBlockHorizontal(sprite_movingblock, 280, 200 - 32 - 4 + map_offset_on_create_y - 100 - 300, 56, 13, 100, 300);

function Trampoline(sprite1, sprite2, x, y, width, height)
{
    this.block = 0;
    this.sprite_wait = sprite1;
    this.sprite_done = sprite2;
    this.sprite = sprite1;
    var sprite_saved = this.sprite;
    var sprite_1 = this.sprite_wait;
    var sprite_2 = this.sprite_done;
    var trampoline_this = this;
    this.block = new VadSolid(x, y, width, height, false, global_block_counter++)
    blocks.push(this.block);

    Trampoline.prototype.eject_player = function(trampoline_in_array_of_args)
    {
        var trampoline_passed = trampoline_in_array_of_args[0];
        player.y -= 1;
        player.vspeed = -18;
        trampoline_passed.sprite = sprite_2;

        setTimeout(function()
        {
            trampoline_passed.sprite = sprite_1;
        }, 700);
    }

    Trampoline.prototype.draw = function(context)
    {
        this.sprite.draw(context, this.block.x - viewport.x_offset, this.block.y - viewport.y_offset);
    }

    engine.collision_add_case(player, trampoline_this.block, 1, trampoline_this.eject_player, [trampoline_this]);
    drawables.push(trampoline_this);
}

function Goomba_Hit(sprite, x, y)
{
    this.x = x;
    this.y = y;
    this.width = 36;
    this.height = 36;
    var goomba_this = this;
    this.sprite = sprite;

    Goomba_Hit.prototype.draw = function(context)
    {
        this.sprite.draw(context, this.x - viewport.x_offset, this.y - viewport.y_offset);
    }

    Goomba_Hit.prototype.timeout_and_remove = function()
    {
        for (var i = 0; i < drawables.length; i++)
        {
            var tempx = drawables[i].x;
            var tempy = drawables[i].y;
            if (goomba_this.x == tempx && goomba_this.y == tempy)
            {
                drawables.splice(i, 1);
                break;
            }
        }
    }

    drawables.push(goomba_this);

    setTimeout(function()
    {
        goomba_this.timeout_and_remove();
    }, 700);
}

function MovingBlockHorizontal(sprite, x, y, w, h, leftmostx, rightmostx)
{

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.leftmostx = leftmostx;
    this.rightmostx = rightmostx;
    this.max_hspeed = 3;
    this.hspeed = -this.max_hspeed;
    var variable_this = this;
    this.sprite = sprite;

    MovingBlockHorizontal.prototype.handle_movement = function(self_variable)
    {
        self_variable = self_variable[0];
        if (self_variable.x + self_variable.hspeed < self_variable.leftmostx) self_variable.hspeed = -self_variable.hspeed;
        if (self_variable.x + self_variable.hspeed > self_variable.rightmostx) self_variable.hspeed = -self_variable.hspeed;
        self_variable.x += self_variable.hspeed;
        if (((player.x + player.width) > self_variable.x) && ((self_variable.x + self_variable.width) > player.x))
        {
            if (player.y + player.height >= self_variable.y && player.y + player.height <= self_variable.y + 8)
            {
                if (player.vspeed >= 0)
                {
                    player.vspeed = 0;
                    player.player_on_ground = true;
                    player.y = self_variable.y - player.height;
                    player.x += self_variable.hspeed;
                }
            }
        }
    }

    MovingBlockHorizontal.prototype.draw = function(context)
    {
        this.sprite.draw(context, this.x - viewport.x_offset, this.y - viewport.y_offset);
    }

    engine.step_add(variable_this.handle_movement, [variable_this]);
    drawables.push(variable_this);
}

function Goomba(sprite, x, y)
{
    this.x = x;
    this.y = y;
    this.width = 36;
    this.height = 36;
    this.hspeed = 2;
    var goomba_this = this;
    this.sprite = sprite;

    Goomba.prototype.goomba_walking = function(goomba_passed)
    {
        goomba_passed = goomba_passed[0];

        if (engine.will_collide_test(goomba_passed.x + goomba_passed.hspeed, goomba_passed.y, goomba_passed.width, goomba_passed.height))
        {
            goomba_passed.hspeed = 0 - goomba_passed.hspeed;
        }
        goomba_passed.x += goomba_passed.hspeed;
    }

    Goomba.prototype.draw = function(context)
    {
        this.sprite.draw(context, this.x - viewport.x_offset, this.y - viewport.y_offset);
    }

    Goomba.prototype.goomba_destroy = function(goomba_passed)
    {
        goomba_passed = goomba_passed[0];

        for (var i = 0; i < drawables.length; i++)
        {
            var tempx = drawables[i].x;
            var tempy = drawables[i].y;
            if (goomba_passed.x == tempx && goomba_passed.y == tempy)
            {
                drawables.splice(i, 1);
                var goomba_hit = new Goomba_Hit(sprite_goomba_hit, tempx, tempy);
                break;
            }
        }
    }

    engine.step_add(goomba_this.goomba_walking, [goomba_this]);
    engine.collision_add_case(player, goomba_this, 2, goomba_this.goomba_destroy, [goomba_this]);
    drawables.push(goomba_this);
}

function draw_on_canvas()
{
    var max_viewport = 170;
    var max_y_viewport_bottom = 76;
    var max_y_viewport_top = 20;

    if (player.x - viewport.x_offset > (500 - max_viewport)) viewport.x_offset = player.x - (500 - max_viewport);
    if (player.x - viewport.x_offset < max_viewport) viewport.x_offset = player.x - max_viewport;
    if (player.y - viewport.y_offset > (232 - max_y_viewport_bottom)) viewport.y_offset = player.y - (232 - max_y_viewport_bottom);
    if (player.y - viewport.y_offset < max_y_viewport_top) viewport.y_offset = player.y - max_y_viewport_top;
    if (viewport.x_offset < 0) viewport.x_offset = 0;
    if (viewport.y_offset > 3767) viewport.y_offset = 3767;
    if (viewport.x_offset > 2891) viewport.x_offset = 2891;

    engine.collision_run_step();
    engine.collision_tasks_process();
    engine.step_process_alltasks();
    vadcontroller.handle_touches();

    if (vadcontroller.button_pressed_left)
    {
        player.hspeed = -player.max_hspeed;
    }
    else if (vadcontroller.button_pressed_right)
    {
        player.hspeed = player.max_hspeed;
    }
    else
    {
        player.hspeed = 0;
    }
    if (vadcontroller.button_pressed_B)
    {
        if (player.player_on_ground)
        {
            player.vspeed = -player.max_jump;
            player.player_on_ground = false;
        }
    }
    if (vadcontroller.button_pressed_A)
    {
        if (temp_player_current_speed == 1) player.max_hspeed = 10;
        if (temp_player_current_speed == 2) player.max_hspeed = 60;
        if (temp_player_current_speed == 3) player.max_hspeed = 2;
        if (temp_player_current_speed == 4) player.max_hspeed = 5;
        temp_player_current_speed++;
        if (temp_player_current_speed == 5) temp_player_current_speed = 1;
    }

    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');

    if (background_loaded)
    {
        ctx.drawImage(background_image, 0 - viewport.x_offset, 0 - viewport.y_offset);
    }
    else
    {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0 - viewport.x_offset, 0 - viewport.y_offset, 3392, 4000);
    }
    ctx.fillStyle = '#000000';
    
    for (var i = 0; i < blocks.length; i++)
    {
        var block_current_draw = blocks[i];
    }
    ctx.fillStyle = '#ff00ff';

    if (player.player_on_ground)
    {
        if (player.hspeed != 0)
        {
            if (player.direction > 0)
            {
                player.set_sprite("jugg_walk_right");
            }
            else
            {
                player.set_sprite("jugg_walk_left");
            }
        }
        if (player.hspeed == 0)
        {
            if (player.direction > 0)
            {
                player.set_sprite("jugg_stand_right");
            }
            else
            {
                player.set_sprite("jugg_stand_left");
            }
        }
    }
    else
    {
        if (player.direction > 0)
        {
            player.set_sprite("jugg_jump_right");
        }
        else
        {
            player.set_sprite("jugg_jump_left");
        }
    }

    for (var i = 0; i < drawables.length; i++)
    {
        drawables[i].draw(ctx);
    }

    if (debug)
        ctx.fillRect(player.x - viewport.x_offset, player.y - viewport.y_offset, player.width, player.height);

    player.sprite.draw(ctx, player.x - viewport.x_offset, player.y - viewport.y_offset);
    vadcontroller.draw(ctx);
}

if (window.addEventListener)
{
    window.addEventListener('load', init_game, false);
}
else if (window.attachEvent)
{
    window.attachEvent('onload', init_game);
}

function init_game()
{
    var canvas = document.getElementById('myCanvas');
    vadcontroller.onCreate(canvas, sprite_vadcontroller);
    mycontroller_start();
}

function mycontroller_start()
{
    setTimeout(function()
    {
        draw_on_canvas();
        mycontroller_start();
    }, 30);
}
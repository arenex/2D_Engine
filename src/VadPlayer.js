function VadPlayer()
{
    this.sprites = [];
    this.sprite = 0;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.gravity = 0.0;
    this.gravity_increment_value = 0.2;
    this.vspeed = 1;
    this.hspeed = 10;
    this.direction = 0;
    this.max_jump = 30;
    this.max_fall = 30;
    this.max_hspeed = 10;
    this.maxgravity = 2;
    this.initial_gravity = 2;
    this.player_on_ground = false;
    this.gravity_upon_hit_above = 7;

    VadPlayer.prototype.add_sprite = function(name, sprite)
    {
        this.sprites[name] = sprite;
    }
    VadPlayer.prototype.set_sprite = function(name)
    {
        this.sprite = this.sprites[name];
    }
}
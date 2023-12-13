const INPUTS := {
	"move_right": Vector2i.RIGHT,
	"move_left": Vector2i.LEFT,
	"move_top": Vector2i.UP,
	"move_bottom": Vector2i.DOWN,
	"move_top_left": Vector2i(-1, -1),
	"move_top_right": Vector2i(1, -1),
	"move_bottom_left": Vector2i(-1, 1),
	"move_bottom_right": Vector2i(1, 1),
	"wait": Vector2i.ZERO
}

enum REQUEST_TYPE { REQUEST, NOTIFICATION }

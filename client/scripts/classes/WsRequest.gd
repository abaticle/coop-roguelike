class_name ws_request


var socket: WebSocketPeer 
var name: String = "default"
var content: String = ""
var request_type: = 0
var id := 0
var current_time = 0

var max_time:float = 1.0		#Time to live
var poll_interval:float  = 0.2	#Time to wait before sending again
var last_poll: float = 0

var total_time: float = 0

var done: bool
var sent: bool
var delete: bool


func _init(options: Dictionary):
	total_time = 0
	sent = false
	done = false
	delete = false
	
	if options.has("name"): name = options.name 
	if options.has("content"): content = options.content
	if options.has("request_type"): request_type = options.request_type
	if options.has("max_time"): max_time = options.max_time
	if options.has("poll_interval"): poll_interval = options.poll_interval

func update(delta: float):
	
	if last_poll > poll_interval: 
		socket.send_text(get_string())
		sent = true
		last_poll = 0
		
	if total_time > max_time:
		delete = true
		#delete

	total_time += delta
	
	last_poll += delta

func get_string(): 
	return "|".join([id, request_type, name, content])

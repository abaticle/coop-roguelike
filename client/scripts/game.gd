extends Node2D

@export var websocket_url = "ws://localhost:9100/ws"


var is_connected := false
var has_map := false

var socket := WebSocketPeer.new()

var packet: PackedByteArray



var request_manager: ws_request_manager

func _ready():
	var error = socket.connect_to_url(websocket_url)
	
	if error:
		print(error)
		
	request_manager = ws_request_manager.new(socket)


func _input(event):
	for dir in Constants.INPUTS.keys():
		if event.is_action_pressed(dir):
			print(Constants.INPUTS[dir])
			var request = ws_request.new({
				"name": dir,
				"is_request": false
			})
			request_manager.add_request(request)




func _process(delta):
	
	request_manager.update(delta)
	
	var state = socket.get_ready_state()
	
	if has_map:
		var request = ws_request.new({
			"name": "get_map",
			"request_type": Constants.REQUEST_TYPE.REQUEST
		})
		request_manager.add_request(request)
	
	
	if state == WebSocketPeer.STATE_OPEN:
		
		is_connected = true
		
		while socket.get_available_packet_count():
			packet = socket.get_packet()
			print("Packet: ", packet.get_string_from_utf8())
	
	elif state == WebSocketPeer.STATE_CLOSING:
		# Keep polling to achieve proper close.
		pass
	
	elif state == WebSocketPeer.STATE_CLOSED:
		is_connected = false
		var code = socket.get_close_code()
		var reason = socket.get_close_reason()
		print("WebSocket closed with code: %d, reason %s. Clean: %s" % [code, reason, code != -1])
		set_process(false) # Stop processing.

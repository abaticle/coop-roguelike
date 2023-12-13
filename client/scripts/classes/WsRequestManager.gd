class_name ws_request_manager extends Node

var requests: Array[ws_request]


var socket: WebSocketPeer 

var state
var last_time: float = 0
var poll_interval: float = 0.1
var current_id: int = 0

func _init(_socket: WebSocketPeer):
	socket = _socket


func _request_already_send(request: ws_request):
	var index = requests.find(request)
	if index != -1:
		if requests[index].sent == true:
			return true
	return false

func add_request(request: ws_request):
	
	if _request_already_send(request):
		return
	
	request.socket = socket
	request.id = current_id
	current_id += 1
	requests.append(request)


func remove_request(request: ws_request):
	requests.erase(request)


func update(delta: float):
	state = socket.get_ready_state()
	
	last_time += delta
	
	if last_time >= poll_interval:
		last_time = 0
		socket.poll()
		
	for request in requests:
		request.update(delta)
	

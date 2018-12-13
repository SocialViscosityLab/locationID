class Journey{
	constructor(route){
	this.referenceRoute = route;
	this.sessions = [];
	}

	addNewSession(){
		this.sessions.push(new Session(this.sessions.length,new Date()));
	}

	activateRoute(bool){
		this.referenceRoute.status = bool;
	}

	setGhostSessionPoints(speed, sampleRate, closedLoop){
		// 0 is always for the ghost
		this.sessions[0].setSessionPoints (this.referenceRoute, speed, sampleRate, closedLoop);
	}
}
class Cartography{
	
	constructor(route){
		this.map;
		this.route = route;
		this.routeMarkers = [];
		this.sessionMarkers = [];
	}


     setup(){
     	let mapHTML = document.getElementById('mapid');

     	this.map = L.map(mapHTML).setView([40.10250,-88.23425], 17);
		
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		
		maxZoom: 20,
		
		id: 'mapbox.streets',
		
		accessToken: 'sk.eyJ1IjoianNhbGFtIiwiYSI6ImNqcDI3eG9yaDAyYzMzcXJ0ZWd3d3g3bTcifQ.o2q4YfWOqzAg9rak5ua-MA'
		
		}).addTo(this.map);

		var d4svMarker = L.marker([40.10250,-88.23425]).addTo(this.map);
		
		d4svMarker.bindPopup("<b>D</b>4<b>SV</b><br>Research lab").openPopup();
     }         


	 /*Create the route markers of the cornerpoints on the map*/
	plotRouteCornerPoints(){

		for (let i = 0; i < this.route.routePoints.length; i++) {
			if (this.routeMarkers[i] == undefined){
				this.routeMarkers[i] = L.marker([this.route.routePoints[i].lat , this.route.routePoints[i].lon]).addTo(this.map);
				let label = "point"+i;
				this.routeMarkers[i].bindPopup(label).openPopup();
			} else {
				let newLatLng = new L.LatLng(this.route.routePoints[i].lat , this.route.routePoints[i].lon);
				this.routeMarkers[i].setLatLng(newLatLng);
			}
		}
	}

	plotSessionDataPoints(journey, sessionID){

		let session = journey.sessions[sessionID];

		for (var i = 0; i < session.dataPoints.length; i++) {
			if (this.sessionMarkers[i] == undefined){
				this.sessionMarkers[i] = L.marker([session.dataPoints[i].position.lat,session.dataPoints[i].position.lon]).addTo(this.map);
				let label =  session.dataPoints[i].time + " s";
				this.sessionMarkers[i].bindPopup(label).openPopup();
			}else{
				let newLatLng = new L.LatLng(session.dataPoints[i].position.lat , session.dataPoints[i].position.lon);
				this.sessionMarkers[i].setLatLng(newLatLng);
			}
			
		}
		
	}
	
}
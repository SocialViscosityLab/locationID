class Position{
  constructor(lat, lon){
    this.lat = lat;
    this.lon = lon;
    /* The coordiantes are geodesic is they are expressed in latitute and longitude. 
    Else are polar if they are expressed in radians */
    this.positionFormat = "geodesic"; 
  }

  getLatRad(){
    return (this.lat * Math.PI) / 180;
  }
  
  getLonRad(){
    return (this.lon * Math.PI) / 180;
  }

  convertRadToCoords(){
    this.lat = (this.lat * 180)/Math.PI;
    this.lon = (this.lon * 180)/Math.PI;
    this.positionFormat = "radians"; 
  }
}
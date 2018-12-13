class DataPoint{
  constructor(acc, pos, speed, time){
    this.acceleration = acc;
    this.position = pos;
    this.speed = speed;
    this.time = time;
    this.suggestion;
    /* The coordiantes are geodesic is they are expressed in latitute and longitude. 
    Else are polar if they are expressed in radians */
    this.positionFormat = "geodesic"; 
  }

  getLatRad(){
    return (this.position.lat * Math.PI) / 180;
  }
  
  getLonRad(){
    return (this.position.lon * Math.PI) / 180;
  }

  convertRadToCoords(){
    this.position.lat = (this.position.lat * 180)/Math.PI;
    this.position.lon = (this.position.lon * 180)/Math.PI;
    this.positionFormat = "radians"; 
  }

  suggestAcceleration(leaderCurrentDatapoint){
    // To be defined
  }


}
class Position{
  constructor(lat, lon){
    this.lat = lat;
    this.lon = lon;
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

  }
}
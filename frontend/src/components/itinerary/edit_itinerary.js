import React from "react";
import Map from "../map/map";
import MarkerManager from "../map/marker_manager";
import ItineraryAttractionItem from "./itinerary_attraction_item";

class EditItinerary extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {itineraryAttractions: [], line: []}
        this.changeLineForMap = this.changeLineForMap.bind(this); 
    }

    componentDidMount() {
        this.map = new Map(this.mapNode)
        this.markerManager = new MarkerManager(this.map)
        this.map.instantiateMap();
        this.map.map.setZoom(4)
        this.props.getItinerary(this.props.match.params.id).then(() => {
            this.itineraryAttractions = '';
            this.props.getItineraryAttractions(this.props.match.params.id).then(response => {
                this.setState({ itineraryAttractions: response.attractions.data})
                this.state.itineraryAttractions.forEach(attraction => {
                    this.markerManager.addMarker({lat: attraction.lat, lng: attraction.lng}, {url: attraction.icon, scaledSize: new google.maps.Size(20,20)})
                }) 
            })
            // this.setState({line: this.props.itinerary.line})
            this.changeLineForMap();
            this.markerManager.addMarker(this.state.line[0], {
                url: 'https://cdn-icons.flaticon.com/png/512/550/premium/550907.png?token=exp=1642621415~hmac=4d71282433f291f628c8da9d4b7508b6', scaledSize: new google.maps.Size(15, 15)
            })
            this.markerManager.addMarker(this.state.line[this.state.line.length - 1], {
                url: 'https://cdn-icons-png.flaticon.com/512/2906/2906719.png', scaledSize: new google.maps.Size(15, 15)
            })
            this.state.line.forEach((location, index) => {
                this.map.poly.getPath().insertAt(index, location); 
            })


        })
    }

    changeLineForMap() {
        const line = this.props.itinerary.line; 
        const newLine = []; 
        line.forEach(location => {
            const latLng = new google.maps.LatLng(location.lat, location.lng)
            newLine.push(latLng); 
        })
        this.setState({line: newLine})
    };

    // we have to find a way to store all attractions, unless we refetch based on the same algorithm. Possibly we can make an attribute of attraction a boolean of true or false and then based on if true, it is part of itinerary. Or keep two seperate attraction types?
    
    render () {
        const map = <div className="map" ref={map => this.mapNode = map} ></div>

        if (!this.state.itineraryAttractions || !this.props.itinerary) {
            return null
        }

        return (
            <div>
                <p>{this.props.itinerary.title}</p>
                <p>{this.props.itinerary.description}</p>
                <div className="edit-map-container" style={{width: '800px', height:'500px'}}>
                    {map}
                </div>
                <ul>
                    {this.state.itineraryAttractions.map((attraction, index) => (
                        <ItineraryAttractionItem key={index} attraction={attraction} editAttraction={this.props.editAttraction} itineraryId={this.props.itinerary.id} />
                    ))}
                </ul>
            </div> 
        )
    }


}

export default EditItinerary;
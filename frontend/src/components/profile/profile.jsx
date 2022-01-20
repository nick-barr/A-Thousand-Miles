import React from 'react';
import UserShow from './user_show_container';
import '../../assets/css/profile.scss';

import ItineraryContainer from "../itineraryindex/itinerary_container"
import AttractionContainer from "../attraction/attraction_container"
import { Route, Switch } from "react-router-dom";
import Attraction from "../attraction/attraction";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        // console.log(this.props.currentUser.id)
      this.props.getUserItineraries(this.props.currentUser.id);
    }

    // componentWillReceiveProps(newState) {
    //     this.setState({ itineraries: newState.itineraries });
    // }   

    //userprofile profile/
    //switch
      //route path = / => itinerary => idxitems => link to profile/:id
      //route path = /:id => attraction => attractionidx => profile/
    //switch
    
    render() {
      // debugger
      return(
        <div>
          {/* User Profile here, User ID: {this.props.currentUser.id} */}
          <UserShow />
          <Switch>
            <Route path="/profile/:itineraryId" component={AttractionContainer}/>
            <Route path="/profile" component={ItineraryContainer}/>
          </Switch>
          {/* <ItineraryContainer/> */}
        </div>
      )
    }
}

export default Profile;

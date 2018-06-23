import React from 'react';
import { connect } from "react-redux";

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' }
  }

  handleChange = (name, value) => {
    this.props.updateUserField(this.props.appUser, name, value);
  }

  handleSelect = (address) => {
    this.props.updateUserField(this.props.appUser, 'address', address);
    geocodeByAddress(address)
      .then(results => {
        return getLatLng(results[0])
      })
      .then(latLng => {
        this.props.updateUserField(this.props.appUser, 'lat', latLng.lat);
        this.props.updateUserField(this.props.appUser, 'lng', latLng.lng);
        console.log('Success', latLng)
      })
      .catch(error => console.error('Error', error))
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.props.appUser.address ? this.props.appUser.address : ''}
        onChange={(value) => this.handleChange('address', value)}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style })}>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

function mapStateToProps(state) {
  return {
    appUser: state.app.user,
  };
}

export default connect(
  mapStateToProps
)(LocationSearchInput);

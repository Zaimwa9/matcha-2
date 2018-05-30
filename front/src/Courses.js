import React, { Component } from 'react';
import ApiService from './apiService/apiService';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
        courses: [],
    };
    this.search = this.search.bind(this);
}

  async search(params) {
      try {
          const courses = await ApiService.getCourses(params);
          this.setState({courses}, async () => console.log('updated'));
          console.log(courses);
      } catch (e) {
          console.error(`An error ${e.message} occured while searching users`);
      }
  }

  componentDidMount() {
    this.search();
  }

  render() {
    return (
      <div className='courses'>
        Hello
        {this.state.courses}
      </div>
    )
  }
}

export default Courses;
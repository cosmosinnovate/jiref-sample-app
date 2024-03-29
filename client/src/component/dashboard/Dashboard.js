import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import ProfileActions from './DashboardNav'
import Spinner from '../common/Spinner';
import Education from './Education';
import Experience from './Experience';
import Project from './Project';
import StandAloneProfile from '../postFeeds/StandAloneProfile';
import CompleteProfile from '../common/CompleteProfile';


class Dashboard extends Component {
  
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = (e) => {
    this.props.deleteAccount();
  }

  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    let completeProfile;

    if (profile == null || loading) {
      dashboardContent = <Spinner />;

    } else {

      // check if users has profile data. 
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <div className="jiref-margin-bottom">
              <StandAloneProfile />
            </div>
            <p className="lead text-muted text-center">
              Welcome <Link to={`/profile/me/${profile.me}`}>{user.name}</Link>
            </p>
            <br/>
            <ProfileActions />
            <div className="jiref-margin-top">
              <Education education={profile.education} />
              <Experience experience={profile.experience} />
              <Project project={profile.project} />
              <div style={{ marginBottom: '60px' }} />
              <button
                 onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger">Delete My Account
              </button>
            </div>
          </div>
        )
        if (Object.keys(profile.experience).length < 1) {
          completeProfile = <CompleteProfile/>
        } 

      } else {
        dashboardContent = (
          <div>
            <p className="lead"> {user.name}</p>
            <p>Please set a profile.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
    }

     
    return (
      <div className="container">
        <div className="row">
          {completeProfile}
          <div className="col-md-8 m-auto jiref-bg card-body">
            <i className="fas fa-bars"></i> {' '}Dashboard
            {dashboardContent}
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapDispatchToProps = state => ({
  profile: state.profile,
  auth: state.auth,
})

export default connect(mapDispatchToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

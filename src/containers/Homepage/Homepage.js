import React, { Component } from 'react';
import { connect } from 'react-redux';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Homepage.scss";

import HomeHeader from './HomeHeader';
import Speciality from './section/Speciality';
import MedicalFacility from './section/MedicalFacility';
import OutstandingDoctor from './section/OutstandingDoctor';
import Handbook from './section/Handbook';
import AboutUs from './section/AboutUs';
import HomeFooter from './HomeFooter';

class Homepage extends Component {



    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
            <div> 
                <HomeHeader /> 
                <Speciality 
                    settings={settings}
                />
                <MedicalFacility 
                    settings={settings}
                />
                <OutstandingDoctor
                    settings={settings}
                />
                <Handbook
                    settings={settings}
                />
                <AboutUs />
                <HomeFooter />
                

                <div style={{ height: "300px"}}></div>
                
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

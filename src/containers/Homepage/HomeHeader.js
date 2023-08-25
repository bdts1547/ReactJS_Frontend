import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';



class HomeHeader extends Component {

    render() {
        console.log(this.props)
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="mid-content">
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.speciality" /></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.search-doctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.medical-facility"/></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.choose-facility"/></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.choose-doctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="home-header.package" /></b></div>
                                <div className="sub-title"><FormattedMessage id="home-header.health-general" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <span className='text-support'><FormattedMessage id="home-header.support" /></span>
                                <span className="language-vn active">VN</span>
                                <span className="language-en">EN</span>
                            </div>
                            <div className="number-phone">024-7301-2468</div>
                        </div>
                    </div>
                </div>
                <div className="home-banner-container">
                    <div className="home-banner-content">
                        <div className="banner-top">
                            <div className="banner-title">
                                <div className="title-1"><FormattedMessage id="banner.medical-background" /></div>
                                <div className="title-2"><b><FormattedMessage id="banner.health-care" /></b></div>
                            </div>
                            <div className="banner-search">
                                <i className='fas fa-search'></i>
                                <input type="text" placeholder='Tìm phòng khám'/>
                            </div>
                        </div>
                        <div className="banner-bottom">
                            <div className="banner-download">
                                <div className="download-chplay"></div>
                                <div className="download-ios"></div>
                            </div>
                            <div className="banner-options">
                                <a className='option'>
                                    <div className='specialized'></div>
                                    <b className="opt-title"><FormattedMessage id="banner.specialize-exam" /></b>
                                </a>
                                <a className='option'>
                                    <div className='remote'></div>
                                    <b className="opt-title"><FormattedMessage id="banner.remote-exam" /></b>
                                </a>
                                <a className='option'>
                                    <div className='general'></div>
                                    <b className="opt-title"><FormattedMessage id="banner.general-exam" /></b>
                                </a>
                                <a className='option'>
                                    <div className='medical-test'></div>
                                    <b className="opt-title"><FormattedMessage id="banner.medical-test" /></b>
                                </a>
                                <a className='option'>
                                    <div className='mental-heath'></div>
                                    <b className="opt-title"><FormattedMessage id="banner.mental-health" /></b>
                                </a>
                                <a className='option'>
                                    <div className='dentist'></div>
                                    <b className="opt-title"><FormattedMessage id="banner.dentist-exam" /></b>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);

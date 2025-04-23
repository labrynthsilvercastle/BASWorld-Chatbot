import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Details.css';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
const Details = ({handleLogout}) => {




    return (
        <div className="AccountDetailsNavbar">
            <div className="DropDetails">
                <div className="Horizontal_Wrapper">
                <Link to="/profile" className="AccountButton">
                    Profile
                </Link>
                <button className="AccountButton" onClick={handleLogout}>
                    Logout
                </button>
                </div>
            </div>
        </div>
    );
};

Details.propTypes = {
    handleLogout: PropTypes.func.isRequired
};

export default Details;

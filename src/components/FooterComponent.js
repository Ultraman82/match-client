import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return(
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">             
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/home">Userlist</Link></li>
                            <li><Link to="/aboutus">Connected</Link></li>
                            <li><Link to="/menu">Notification</Link></li>
                            <li><Link to="/contactus">Profile</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p>© Copyright 2018 Ristorante Con Fusion</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
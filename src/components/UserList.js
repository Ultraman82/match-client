import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    function RenderMenuItem({ user, onClick }) {
        return(
            <Card>
                <Link to={`/menu/${user._id}`} >
                    <CardImg width="100%" src={baseUrl + user.profile} alt={user.username} />
                    <CardImgOverlay>
                        <CardTitle>{user.username}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
        );
    }

    const Users = (props) => {

        const menu = props.users.users.map((user) => {
            return (
                <div key={user._id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem user={user} />
                </div>
            );
        });

        if (props.users.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.users.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.users.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
    }

export default Users;
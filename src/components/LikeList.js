import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardSubtitle, CardText, Button, Breadcrumb, BreadcrumbItem, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


    function RenderUser({ user, postFavorite, username }) {
        return(
            <div>
                <Card>
                {/* <Link to={`/profile/${user._id}`} > */}
                <CardImg width="100%" src={baseUrl + user.profile} alt={user.username} />
                    {/* <div className="card-img-overlay" style={{display:"flex"}}>                        
                        <span className="align-text-bottom" style={{alignSelf:"flex-end"}}>text-bottom</span>
                    </div> */}
                    {/* <CardImgOverlay className="d-flex flex-column justify-content-end">                    
                    <CardText>{user.username}</CardText>
                    </CardImgOverlay>*/}
                <CardBody>
                    <CardText>{user.username}</CardText>
                    <Button color="primary" size="sm" outline>Profile</Button>{' '}
                    <Button color="danger" size="sm" outline onClick={() => postFavorite({"user": user.username, "data":username, "connected":true })}>Like</Button>                    
                </CardBody>
                    
                </Card>
            </div>
        );
    }

    const Users = (props) => {
        console.log("props in Users:" + JSON.stringify(props));
        const menu = props.users.map((user) => {
            return (
                <div key={user._id} className="col-12 col-md-3 m-1">
                    <RenderUser user={user} postFavorite={props.postFavorite} username={props.username}/>
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
import React, { Component } from "react";
import User from "./UserList";
import Contact from "./ContactComponent";
import Notification from "./Notification";
import Header from "./HeaderComponent";

import Connected from "./Connected";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { InitialFilter } from "../redux/forms";
//import { actions } from 'react-redux-form';
import {
  postFeedback,
  loginUser,
  logoutUser,
  fetchInfo,
  registerUser,
  fetchFavorites,
  postFavorite,
  fetchUsers,
  fetchNoties,
  checkNoti,
  fetchUchat,
  postDislike,
  fetchFilter
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = state => {
  return {
    uchats: state.uchats,
    noties: state.noties,
    lusers: state.lusers,
    users: state.users,
    info: state.info,
    favorites: state.favorites,
    auth: state.auth,
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => ({
  postFeedback: feedback => dispatch(postFeedback(feedback)),
  fetchInfo: username => dispatch(fetchInfo(username)),
  fetchUsers: filter => dispatch(fetchUsers(filter)),
  loginUser: creds => dispatch(loginUser(creds)),
  registerUser: creds => dispatch(registerUser(creds)),
  fetchNoties: username => dispatch(fetchNoties(username)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: username => dispatch(fetchFavorites(username)),
  postFavorite: users => dispatch(postFavorite(users)),
  checkNoti: (notiId, date) => dispatch(checkNoti(notiId, date)),
  fetchUchat: chatIds => dispatch(fetchUchat(chatIds)),
  postDislike: user => dispatch(postDislike(user)),
  fetchFilter: filter => dispatch(fetchFilter(filter))

  // postBlacklist: user => dispatch(postBlacklist(user))
  //fetchProfile: (username) => dispatch(fetchProfile(username))
});

class Main extends Component {
  componentWillMount() {
    //console.log("main filter props=" + JSON.stringify(this.props.filter));

    if (this.props.auth.user !== null) {
      this.props.fetchInfo(this.props.auth.user.username);
      this.props.fetchNoties(this.props.auth.user.username);
      //this.props.fetchUsers({...InitialFilter, username:this.props.auth.user.username});
      //this.props.fetchUsers({...InitialFilter, username:this.props.auth.user.username});
      //this.props.fetchFavorites(this.props.auth.user.username);
    } else {
      this.props.fetchUsers(InitialFilter);
    }
  }
  componentDidMount() {
    //console.log("filter from main " + JSON.stringify(this.props.filter));
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <div>
              {alert("Please Log in first")}
              <Redirect
                to={{
                  pathname: "/home",
                  state: {
                    from: props.location
                  }
                }}
              />
            </div>
          )
        }
      />
    );

    return (
      <div>
        <Header
          auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
          registerUser={this.props.registerUser}
          unread={
            this.props.noties.noties ? this.props.noties.noties.unread : false
          }
          uchats={
            this.props.uchats.uchats ? this.props.uchats.uchats.unread : null
          }
          fetchNoties={this.props.fetchNoties}
          fetchUchat={this.props.fetchUchat}
          //info={this.props.info.info ? this.props.info.info : null}
          chatrooms={
            this.props.info.info ? this.props.info.info.chatrooms : null
          }
        />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route
                exact
                path="/home"
                component={() => (
                  <User
                    username={
                      this.props.auth.isAuthenticated
                        ? this.props.auth.user.username
                        : null
                    }
                    likelist={
                      this.props.auth.isAuthenticated
                        ? this.props.info.info
                        : null
                    }
                    users={this.props.users}
                    postFavorite={this.props.postFavorite}
                    //postBlacklist={this.props.postBlacklist}
                    fetchUsers={this.props.fetchUsers}
                    fetchFilter={this.props.fetchFilter}
                    filter={this.props.filter}
                  />
                )}
              />
              } />
              <PrivateRoute
                exact
                path="/menu"
                component={() => (
                  <Connected
                    chatrooms={
                      this.props.info.info !== null
                        ? this.props.info.info.chatrooms
                        : null
                    }
                    users={this.props.favorites.favorites}
                    postFavorite={this.props.postFavorite}
                    postDislike={this.props.postDislike}
                    fetchUchat={this.props.fetchUchat}
                    uchats={this.props.uchats.uchats}
                  />
                )}
              />
              {/* <Route path="/menu/:dishId" component={DishWithId} /> */}
              <PrivateRoute
                exact
                path="/chat"
                component={() => (
                  <Notification
                    username={
                      this.props.auth.isAuthenticated
                        ? this.props.auth.user.username
                        : null
                    }
                    noti={this.props.noties.noties}
                    checkNoti={this.props.checkNoti}
                    fetchProfile={this.props.fetchProfile}
                    postFavorite={this.props.postFavorite}
                  />
                )}
              />
              {/* <PrivateRoute
                exact
                path="/chat"
                component={() => (
                  <Chat                    
                  />
                )}
              /> */}
              <PrivateRoute
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    postFeedback={this.props.postFeedback}
                    fetchInfo={this.props.fetchInfo}
                    info={this.props.info.info ? this.props.info.info : null}
                  />
                )}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);

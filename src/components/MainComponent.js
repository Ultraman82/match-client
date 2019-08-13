import React, { Component } from "react";
import Home from "./HomeComponent";
//import About from "./AboutComponent";
import User from "./UserList";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import Chat from "./Chat";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import LikeList from "./LikeList";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postComment,
  postFeedback,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  loginUser,
  logoutUser,
  fetchInfo,
  registerUser,
  fetchFavorites,
  postFavorite,
  deleteFavorite,
  fetchUsers,
  fetchLusers
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = state => {
  return {
    lusers: state.lusers,
    users: state.users,
    info: state.info,
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    favorites: state.favorites,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, comment) =>
    dispatch(postComment(dishId, rating, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: feedback => dispatch(postFeedback(feedback)),
  fetchInfo: username => dispatch(fetchInfo(username)),
  fetchUsers: () => dispatch(fetchUsers()),
  loginUser: creds => dispatch(loginUser(creds)),
  registerUser: creds => dispatch(registerUser(creds)),
  
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: (username) => dispatch(fetchFavorites(username)),
  postFavorite: users => dispatch(postFavorite(users)),
  deleteFavorite: dishId => dispatch(deleteFavorite(dishId))
});

class Main extends Component {
  componentDidMount() {    
    this.props.fetchDishes();        
    this.props.fetchLeaders();
    this.props.fetchUsers();            
    if (this.props.auth.user !== null){
      this.props.fetchInfo(this.props.auth.user.username);      
      this.props.fetchFavorites(this.props.auth.user.username);      
    }
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(promo => promo.featured)[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.leaders.filter(leader => leader.featured)[0]
          }
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return this.props.auth.isAuthenticated ? (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              dish => dish._id === match.params.dishId
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            comment => comment.dish === match.params.dishId
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          favorite={this.props.favorites.favorites.dishes.some(
            dish => dish._id === match.params.dishId
          )}
          
        />
      ) : (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              dish => dish._id === match.params.dishId
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            comment => comment.dish === match.params.dishId
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          favorite={false}
          //postFavorite={this.props.postFavorite}
        />
      );
    };

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: props.location }
              }}
            />
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
        />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/aboutus"
                component={() => <User username={this.props.auth.user.username} users={this.props.users.users} postFavorite={this.props.postFavorite}/>}
              />
              } />
              <Route
                exact
                path="/menu"
                component={() => <LikeList username={this.props.auth.user.username} users={this.props.lusers.lusers} postFavorite={this.props.postFavorite}/>}
              />
              {/* <Route path="/menu/:dishId" component={DishWithId} /> */}
              <Route
                exact
                path="/chat"
                component={() => (
                  <Chat info={this.props.info.info}                   
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
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                    fetchInfo={this.props.fetchInfo}           
                    info={this.props.info.info}
                  />
                )}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
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

import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addComment = comment => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dishId, rating, comment) => dispatch => {
  const newComment = {
    dish: dishId,
    rating: rating,
    comment: comment
  };
  console.log("Comment ", newComment);

  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + dishId + "/comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer
    },
    credentials: "same-origin"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
      console.log("Post comments ", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};
//dishes
export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading(true));
  return fetch(baseUrl + "dishes")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = errmess => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

//users
export const fetchUsers = () => dispatch => {
  dispatch(usersLoading(true));
  return fetch(baseUrl + "users")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(users => dispatch(addUsers(users)))
    .catch(error => dispatch(usersFailed(error.message)));
};

export const usersLoading = () => ({
  type: ActionTypes.USERS_LOADING
});

export const usersFailed = errmess => ({
  type: ActionTypes.USERS_FAILED,
  payload: errmess
});

export const addUsers = users => ({
  type: ActionTypes.ADD_USERS,
  payload: users
});

// Edit Info
export const fetchInfo = username => dispatch => {
  dispatch(infoLoading(true));  
  return fetch(baseUrl + "users/edit/" + username)
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    //.then(info => dispatch(addInfo(info)))
    .then(info => dispatch(addInfo(info)))
    .catch(error => dispatch(infoFailed(error.message)));
};

export const infoLoading = () => ({
  type: ActionTypes.INFO_LOADING
});

export const infoFailed = errmess => ({
  type: ActionTypes.INFO_FAILED,
  payload: errmess
});

export const addInfo = info => ({
  type: ActionTypes.ADD_INFO,
  payload: info
});


export const fetchComments = () => dispatch => {
  return fetch(baseUrl + "comments")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errmess => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchPromos = () => dispatch => {
  dispatch(promosLoading(true));

  return fetch(baseUrl + "promotions")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = errmess => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = promos => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

export const fetchLeaders = () => dispatch => {
  dispatch(leadersLoading());

  return fetch(baseUrl + "leaders")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = errmess => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = leaders => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});


//export const postFeedback = feedback => dispatch => {
export const postFeedback = feedback => dispatch => {  
  return fetch(baseUrl + "users/edit", {
    method: "POST",
    body: JSON.stringify(feedback),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
  .then(      
      response => {
        console.log("action:" + JSON.stringify(response));
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => {
      console.log("Feedback", response);
      alert("Thank you for your feedback!\n" + JSON.stringify(response))  ;
      window.location.href = 'localhost:3001/home';
    })
    .catch(error => {
      console.log("Feedback", error.message);
      alert("Your feedback could not be posted\nError: " + error.message);
    });
};

export const requestLogin = creds => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds
  };
};

export const receiveLogin = response => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token
  };
};

export const loginError = message => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message
  };
};

export const loginUser = creds => dispatch => {  
  dispatch(requestLogin(creds)); 
  console.log("loginUser is excuted" + JSON.stringify(creds));

  return fetch(baseUrl + "users/login", {
    method: 'POST',    
    //mode:'no-cors',
    headers: {
      "Content-Type": "application/json"
    },    
    body: JSON.stringify(creds)
  })
  .then(
      response => {
        console.log("response: " + JSON.stringify(response));
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => {
      console.log("response: " + response);
      if (response.success) {        
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));  
        //dispatch(fetchFavorites());
        dispatch(receiveLogin(response));
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(loginError(error.message)));
};

export const registerError = message => {
  return {
    type: ActionTypes.REGISTER_FAILURE,
    message
  };
};

export const registerUser = creds => dispatch => {      
  return fetch(baseUrl + "users/signup", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },    
    body: JSON.stringify(creds)
  })
  .then(
      response => {        
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => {
      console.log("response: " + response);
      if (response.success) {        
        alert("You are signed up! Verify with your email account!");        
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(registerError(error.message)));
};



export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  };
};

// Logs the user out
export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("creds");
  dispatch(favoritesFailed("Error 401: Unauthorized"));
  dispatch(receiveLogout());
  dispatch(addInfo());  
  window.location.href = 'localhost:3001/home';
};

export const postFavorite = users => dispatch => {
  //const bearer = "Bearer " + localStorage.getItem("token");  
  return fetch(baseUrl + "users/add/likedby", {    
    method: "POST",
    body: JSON.stringify(users),
    headers: {
      "Content-Type": "application/json",
    //Authorization: bearer
    },    
    //credentials: "same-origin"
  })
  .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => {
      console.log("Favorite Added", response);      
      dispatch(addFavorites(response));
    })
    .catch(error => {
      dispatch(favoritesFailed(error.message));
      console.log(error);
    });
};

export const deleteFavorite = users => dispatch => {
  const bearer = "bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "favorites/" + users, {
    method: "DELETE",
    headers: {
      Authorization: bearer
    },
    credentials: "same-origin"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(favorites => {
      console.log("Favorite Deleted", favorites);
      dispatch(addFavorites(favorites));
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchLusers = (users) => dispatch => {
  dispatch(lusersLoading(true));
  //const bearer = "bearer " + localStorage.getItem("token");
  return fetch(baseUrl + 'users/lusers', {
    method: "POST",
    body: JSON.stringify({"users":users}),
    headers: {
      "Content-Type": "application/json",
    //Authorization: bearer
    }
  })      
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(lusers => {
      console.log(lusers);
      dispatch(addLusers(lusers))}
      )
    .catch(error => dispatch(lusersFailed(error.message)));
};

export const lusersLoading = () => ({
  type: ActionTypes.LUSERS_LOADING
});

export const lusersFailed = errmess => ({
  type: ActionTypes.LUSERS_FAILED,
  payload: errmess
});

export const addLusers = lusers => ({
  type: ActionTypes.ADD_LUSERS,
  payload: lusers
});

export const fetchFavorites = (username) => dispatch => {
  dispatch(favoritesLoading(true));
  //const bearer = "bearer " + localStorage.getItem("token");
  return fetch(baseUrl + `users/${username}/likedby`)      
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(likedby => {
      console.log("likedby at action creator:" + likedby);
      dispatch(fetchLusers(likedby));
      dispatch(addFavorites(likedby))}
      )
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const favoritesLoading = () => ({
  type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = errmess => ({
  type: ActionTypes.FAVORITES_FAILED,
  payload: errmess
});

export const addFavorites = favorites => ({
  type: ActionTypes.ADD_FAVORITES,
  payload: favorites
});


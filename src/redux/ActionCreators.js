import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

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
  return (
    fetch(baseUrl + "users/edit/" + username)
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
      .then(info => {
        dispatch(addInfo(info));
        dispatch(fetchFavorites(info));
        dispatch(fetchUchat(Object.values(info.chatrooms)));
      })
      .catch(error => dispatch(infoFailed(error.message)))
  );
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

//export const postFeedback = feedback => dispatch => {
export const postFeedback = feedback => dispatch => {
  return fetch(baseUrl + "users/edit", {
    method: "POST",
    body: JSON.stringify(feedback),
    headers: {
      "Content-Type": "application/json"
    }
    //credentials: "same-origin"
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
      alert("Thank you for your feedback!\n" + JSON.stringify(response));
      dispatch(addInfo(response));
      window.location.href = "localhost:3001/home";
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
    method: "POST",
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
        /* let str = creds.username;      
        noti.on(str, (data) => {            
          console.log("getting data:" + JSON.stringify(data));          
        }); */
        dispatch(fetchInfo(creds.username));
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
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
    .then(
      response => {
        console.log("response at top:" + JSON.stringify(response));
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
        console.log("err at top:" + JSON.stringify(error));
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => {
      //console.log("response at bottom:" + JSON.stringify(response));
      if (response.success) {
        alert("You are signed up! Verify with your email account!");
      } else {
        var error = new Error("Error " + response.status);
        if (response.err.code === 11000) {
          alert("The email address is already exists");
        } else {
          alert(response.err.message);
        }
        error.response = response.err;
        throw error;
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(registerError(error.message));
    });
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
  //noti.reremoveAllListeners(JSON.parse(localStorage.getItem('creds')).username);
  //noti.removeAllListeners();
  localStorage.removeItem("token");
  localStorage.removeItem("creds");
  dispatch(favoritesFailed("Error 401: Unauthorized"));
  dispatch(receiveLogout());
  dispatch(addInfo());
  window.location.href = "localhost:3001/home";
};

export const postFavorite = users => dispatch => {
  console.log("postFavorite from client: " + users);
  //const bearer = "Bearer " + localStorage.getItem("token");
  return (
    fetch(baseUrl + "users/add/like", {
      method: "POST",
      body: JSON.stringify({ user: users[0], data: users[1] }),
      headers: {
        "Content-Type": "application/json"
        //Authorization: bearer
      }
      //credentials: "same-origin"
    })
      /*   .then(
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
    ) */
      .then(response => response.json())
      .then(response => {
        console.log("Favorite Added", response);
        dispatch(addFavorites(response));
      })
      .catch(error => {
        dispatch(favoritesFailed(error.message));
        console.log(error);
      })
  );
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

export const fetchFavorites = info => dispatch => {
  dispatch(favoritesLoading(true));
  return fetch(baseUrl + "users/lusers", {
    method: "POST",
    body: JSON.stringify({
      connected: info.connected,
      likedby: info.likedby,
      checkedby: info.checkedby
    }),
    headers: {
      "Content-Type": "application/json"
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
      dispatch(addFavorites(lusers));
    })
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

//fetchNoti
export const checkNoti = (notiId, date) => dispatch => {
  return fetch(baseUrl + `noti/${notiId}`, {
    method: "PUT",
    body: JSON.stringify({
      date: date
    }),
    headers: {
      "Content-Type": "application/json"
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
    .then(noties => {
      console.log("fetchNoti response:" + JSON.stringify(noties));
      dispatch(addNoties(noties));
    })
    .catch(error => dispatch(notiesFailed(error.message)));
  //.catch(error => console.log(error));
};

export const fetchNoties = notiId => dispatch => {
  dispatch(notiesLoading(true));
  return fetch(baseUrl + `noti/${notiId}`)
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
    .then(noties =>
      //console.log("fetchNoti response:" + JSON.stringify(noties));
      {
        let unread = 0;
        noties["comments"].map(noti => {
          if (noti["unread"]) unread += 1;
        });
        noties["unread"] = unread;
        dispatch(addNoties(noties));
      }
    )
    .catch(error => dispatch(notiesFailed(error.message)));
};

export const notiesLoading = () => ({
  type: ActionTypes.NOTIES_LOADING
});

export const notiesFailed = errmess => ({
  type: ActionTypes.NOTIES_FAILED,
  payload: errmess
});

export const addNoties = noties => ({
  type: ActionTypes.ADD_NOTIES,
  payload: noties
});

export const fetchProfile = username => dispatch => {
  dispatch(profileLoading(true));
  return fetch(baseUrl + `users/edit/${username}`)
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
    .then(profile => {
      console.log("fetchProfile:" + profile);
      dispatch(addProfile(profile));
    })
    .catch(error => dispatch(profileFailed(error.message)));
};

export const profileLoading = () => ({
  type: ActionTypes.PROFILE_LOADING
});

export const profileFailed = errmess => ({
  type: ActionTypes.PROFILE_FAILED,
  payload: errmess
});

export const addProfile = profile => ({
  type: ActionTypes.ADD_PROFILE,
  payload: profile
});

//unredChat
export const fetchUchat = chatIds => dispatch => {
  dispatch(uchatLoading(true));
  return fetch(baseUrl + `chat/unread`, {
    method: "POST",
    body: JSON.stringify({
      username: JSON.parse(localStorage.creds).username,
      chatIds: chatIds
    }),
    headers: {
      "Content-Type": "application/json"
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
    .then(uchats =>
      //console.log("fetchNoti response:" + JSON.stringify(uchat));
      {
        Object.values(uchats).reduce((a, b) => a + b, 0);

        uchats["unread"] = Object.values(uchats).reduce((a, b) => a + b, 0);
        dispatch(addUchat(uchats));
      }
    )
    .catch(error => dispatch(uchatFailed(error.message)));
};

export const uchatLoading = () => ({
  type: ActionTypes.UCHAT_LOADING
});

export const uchatFailed = errmess => ({
  type: ActionTypes.UCHAT_FAILED,
  payload: errmess
});

export const addUchat = uchat => ({
  type: ActionTypes.ADD_UCHAT,
  payload: uchat
});

/* export const addComment = comment => ({
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
}; */

/* export const fetchComments = () => dispatch => {
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
}); */

/* export const fetchLusers = users => dispatch => {
  dispatch(lusersLoading(true));  
  return fetch(baseUrl + "users/lusers", {
    method: "POST",
    body: JSON.stringify({ users: users }),
    headers: {
      "Content-Type": "application/json"      
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
      dispatch(addLusers(lusers));
    })
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
});*/

/* export const fetchFavorites = username => dispatch => {
  dispatch(favoritesLoading(true));  
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
      dispatch(addFavorites(likedby));
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
};
 */

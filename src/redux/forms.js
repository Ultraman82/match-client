export const InitialFeedback = {
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  gender: "",
  preference: "",
  email: "",
  gps: false,
  biography: "",  
  age: "",
  tags: []
};

export const InitialFilter = {  
  genre: "age",
    genres: [{"id":1, "name":"age"}, {"id":2, "name":"distance"}, {"id":3, "name":"common tags"}, {"id":4, "name":"ratings"}],
    age: {
      label: "age",
      min: 0,
      max: 60,
      step: 1,
      value: { min: 0, max: 40 }
    },
    fame: {
      label: "fame",
      min: 0,
      max: 100,
      step: 10,
      value: { min: 0, max: 100 }
    },
    distance: {
      label: "distance",
      min: 0,
      max: 300,
      step: 10,
      value: { min: 0, max: 120 }
    },
    comtags: {
      label: "comtags",
      min: 0,
      max: 10,
      step: 1,
      value: { min: 0, max: 2 }
    },
    gps: { lat: 37.802235, lng: -119.8792 },
    tags: '["tag1", "tag2", "tag3", "tag4"]'
}

/* export const InitialFilter = {
  ageS: 40,
  ageL: 0,
  fameS: 100,
  fameL: 0,
  distanceS: 300,
  distanceL: 0,
  comtags: 0,
  gps: { lat: 37.802235, lng: -119.8792 },
  tags: '["tag1", "tag2", "tag3", "tag4"]'
}; */

const env = process.env.REACT_APP_ENV;
const firebase = {
  development: {
    apiKey: "AIzaSyCw_NlLXgppp155LddADy3eXCpQFWv4wbw",
    authDomain: "nongcalcal-cf9db.firebaseapp.com",
    databaseURL: "https://nongcalcal-cf9db.firebaseio.com",
    projectId: "nongcalcal-cf9db",
    storageBucket: "nongcalcal-cf9db.appspot.com",
    messagingSenderId: "806405909924",
    appId: "1:806405909924:web:0124289298a81f3cdea531",
  },
  production: {
    apiKey: "AIzaSyB3giX-VnTyuCsTuwEYOafjICRZYhMTXcg",
    authDomain: "calcal-9dfa0.firebaseapp.com",
    databaseURL: "https://calcal-9dfa0.firebaseio.com",
    projectId: "calcal-9dfa0",
    storageBucket: "calcal-9dfa0.appspot.com",
    messagingSenderId: "673579404851",
    appId: "1:673579404851:web:af79492ec4c0e763",
    measurementId: "G-DJYQHTWY80",
  },
};

export const configs = {
  firebase: firebase[env] || firebase["development"],
};

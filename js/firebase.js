  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCOnkmCgPHGCY9u2eb3yRwzCLNakg5a5O0",
    authDomain: "sethacksextension.firebaseapp.com",
    databaseURL: "https://sethacksextension.firebaseio.com",
    projectId: "sethacksextension",
    storageBucket: "sethacksextension.appspot.com",
    messagingSenderId: "553965352661",
    appId: "1:553965352661:web:6a0860fbb42a9f01b8d45c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  console.log(firebase);

  chrome.runtime.onMessage.addListener((msg, sender, response) => {

      if(msg.command == "fetch"){
          var domain = msg.data.domain;
          var enc_domain = btoa(domain);
          firebase.database().ref('/domain/'+enc_domain).once('value').then(function(snapshot){
              response({type: "result", status: "success", data: snapshot.val(), request: msg});
          });
      }

      if(msg.command == "post") {
          var domain = msg.data.domain;
          var enc_domain = btoa(domain);
          var code = msg.data.code;
          var desc = msg.data.desc;

          try{
              var newPost = firebase.database().ref('/domain/'+enc_domain).push().set({
                  code: code,
                  description: desc
              });

              var postId = newPost.key;
              response({type: "result", status: "success", data: postId, request: msg});

          }catch(e){
              console.log('error', e);
              response({type: "result", status: "error", data: e, request: msg});

          }
      }

      return true;
  });
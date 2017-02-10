var subscribeToggleButton = document.getElementById('subscribe-toggle');
var subscribeEmailInput = document.getElementById('subscribe-email');
var subscribeSubmitButton = document.getElementById('subscribe-submit');

var subscribeToggleContainer = document.getElementById('subscribe-toggle-container');
var subscribeForm = document.getElementById('subscribe-form');
var subscribeConfirm = document.getElementById('subscribe-confirm');

var emailIsInvalid = false;

window.onload = function () {

  subscribeToggleButton.addEventListener('click', function (e) {
    subscribeToggleContainer.style.display = 'none';
    subscribeForm.style.display = 'block';
    subscribeEmailInput.focus();
  });

  subscribeSubmitButton.addEventListener('click', function (e) {
    var emailAddress = subscribeEmailInput.value;
    submitForm(emailAddress);
  });

  subscribeEmailInput.addEventListener('keydown', function (e) {
    var emailAddress = subscribeEmailInput.value;

    if (e.keyCode === 13) {
      submitForm(emailAddress);
      return;
    }

    if (emailIsInvalid && validateEmail(emailAddress)) {
      emailIsInvalid = false;
      subscribeEmailInput.style.color = 'inherit';
    }
  });

  function submitForm(email) {
    if (validateEmail(email)) {
      postToSendgrid(email);
      subscribeEmailInput.value = '';
      subscribeForm.style.display = 'none';
      subscribeConfirm.style.display = 'block';
      setTimeout(function () {
        subscribeConfirm.style.display = 'none';
        subscribeToggleContainer.style.display = 'block';
      }, 1500)
    } else {
      emailIsInvalid = true;
      subscribeEmailInput.style.color = '#F9728D';
    }
  }

}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function postToSendgrid(email) {
  xhr = new XMLHttpRequest();
  var url = 'http://server.hacksc.com:5000/subscribe';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  var data = JSON.stringify([{ email }]);
  xhr.send(data);
}

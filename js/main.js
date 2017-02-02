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
  // this key only has permissions to save email addresses
  var saveEmailOnlyKey = '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';

  xhr = new XMLHttpRequest();
  var url = 'https://api.sendgrid.com/v3/contactdb/recipients';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + saveEmailOnlyKey);
  var data = JSON.stringify([{ email }]);
  xhr.send(data);
}

export const inputForm = () => {
    const username = document.querySelector('.js-username'),
              password = document.querySelector('.js-password'),
              email = document.querySelector('.js-email'),
              submit = document.querySelector('.js-submit'),
              myForm  = document.querySelector('.js-form'),
              passwordRepeat = document.querySelector('.js-passRepeat'),
              checkBox = document.getElementById('js-checkbox'),
              successText = document.querySelector('.js-successText'),
              regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/;
  
        if (submit) {
            submit.addEventListener('click', formValidation);
  
          /**
            * Stops submiting without checking the form content first
            */
        function formValidation(e) {
          e.preventDefault();
  
            const userData = {
              uv : username.value,
              pv : password.value,
              ev : email.value,
              pvr : passwordRepeat.value,
            }
  
            /**
              * We push errors into this array to check if all inputs are valid
              */
            let numOfErrors = [];
  
            /**
              * We are checking if all the conditions are met before the submit
              */
            if (username) {
              if (userData.uv.length < 6) {
                  numOfErrors.push(setError(username, 'Your username must have at least 6 Characters'));
              } else if (userData.uv.length >= 20) {
                  numOfErrors.push(setError(username, 'Your username must be less than 20 Characters'));
              } else {
                  setValid(username);
              }
            }
  
            if (password) {
              if (regex.test(userData.pv)) {
                  setValid(password);
              } else {
                  numOfErrors.push(setError(password, 'Must have one Uppercase, Lowercase and Num, 8 to 20 char'));
              }
            }
  
            if (passwordRepeat) {
              if (userData.pvr == '') {
                  numOfErrors.push(setError(passwordRepeat, 'This field is required!'));
              } else if (userData.pvr != userData.pv) {
                  numOfErrors.push(setError(passwordRepeat, 'Passwords must match'));
              } else {
                  setValid(passwordRepeat);
              }
            }
  
            if (email) {
              if (userData.ev == '') {
                  numOfErrors.push(setError(email, 'This field is required!'));
              } else if (userData.ev.indexOf('@gmail.com') == -1) {
                  numOfErrors.push(setError(email, 'Email must contain @gmail.com'));
              } else {
                  setValid(email);
              }
            }
  
            if (checkBox) {
              const isChecked = checkBox.checked;
              if (isChecked) {
                setValid(checkBox);
              } else {
                numOfErrors.push(setError(checkBox, 'You must click agree to continue'));
              }
            }
  
            /**
              * Here we check number of errors to disable submiting before the input is valid
              */
            if (numOfErrors.length !== 0) {
                console.log(numOfErrors.length);
            } else {
              myForm.reset();
              if (successText) {
                successText.classList.add('active');
              }
            }
  
            /**
              * Message if the input is incorrect
              * @param input - the input we want to affect
              * @param message - the message we want to present when there is an error
              */
            function setError(input, message) {
              const formControl = input.parentElement,
                  error = formControl && formControl.querySelector('small');
              if (error) {
                  error.classList.add('error');
                  input.classList.add('errorBorder');
                  error.innerHTML = message;
              }
            }
  
            /**
              * Message if the input is correct
              * @param input - the input we want to affect
              */
            function setValid(input) {
              const formControl = input.parentElement,
                  error = formControl && formControl.querySelector('small');
              if (error) {
                  input.classList.add('succesBorder');
                  error.classList.remove('error');
              }
            }
          }
        }//FORM FUNCTION
}
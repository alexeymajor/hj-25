'use strict';

const signInForm = document.querySelector('.sign-in-htm');
const signUpForm = document.querySelector('.sign-up-htm');

function formDataToJson(formData) {
    const result = {};
    for (const [key, value] of formData) {
        result[key] = value;
    }

    return result;
}

function makeQuery(form, url, okEnding) {
    fetch(url, {
        body: JSON.stringify(formDataToJson(new FormData(form))),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (200 <= res.status && res.status < 300) {
            return res;
        }
        throw new Error(res.statusText);
    }).then(res =>res.json()
    ).then(res => {
        if (res.error) {
            throw new Error(res.message);
        }
        form.querySelector('.error-message').textContent = `Пользователь ${res.name} успешно ${okEnding}`;
    }).catch(reason => {
        form.querySelector('.error-message').textContent = reason;
    })
}

signInForm.addEventListener('click', evt => {
    if (evt.target.classList.contains('button')) {
        evt.preventDefault();
        makeQuery(signInForm, 'https://neto-api.herokuapp.com/signin', 'авторизован');
    }
});

signUpForm.addEventListener('click', evt => {
    if (evt.target.classList.contains('button')) {
        evt.preventDefault();
        makeQuery(signUpForm, 'https://neto-api.herokuapp.com/signup', 'зарегистрирован');
    }
});



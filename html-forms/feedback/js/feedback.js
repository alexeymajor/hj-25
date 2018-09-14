'use strict';

document.addEventListener('DOMContentLoaded', init);

function init() {
    const content = document.getElementsByClassName('contentform')[0];
    const contentBtn = content.getElementsByClassName('button-contact')[0];
    const output = document.getElementById('output');

    const validateInput = function(evt) {
        if (evt.target.name === 'zip') {
            evt.target.value = evt.target.value.replace(/\D/g, '');
        }
        validateForm();
    };

    const validateForm = function() {
        contentBtn.disabled = fields.find(
            field => {
                return !field.input.value
            }
        );
    };

    const fields = Array.from(content.getElementsByTagName('input'))
        .concat(Array.from(content.getElementsByTagName('textarea')))
        .map(
            field => {
                field.addEventListener('input', validateInput);
                return {
                    input: field,
                    output: document.getElementById(field.name)
                }
            });

    contentBtn.addEventListener('click', evt => {
        evt.preventDefault();

        fields.forEach(field => {
            if (!field.output) {
                return;
            }

            field.output.value = field.input.value;
        });

        content.classList.add('hidden');
        output.classList.remove('hidden');

    });

    output.getElementsByClassName('button-contact')[0]
        .addEventListener('click', evt => {
            evt.preventDefault();
            content.classList.remove('hidden');
            output.classList.add('hidden');
        });

    validateForm();
}
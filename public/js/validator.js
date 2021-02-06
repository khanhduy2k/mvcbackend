function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }

    }

    var selectorRules = {};

    function validate (inputElement, rule) {
        var outputMessage = getParent(inputElement, options.formGroup).querySelector(options.message);
        var errorMessage;
        var rules = selectorRules[rule.selector]

        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
        }
            if (errorMessage) break;
        }

        if (errorMessage) {
            outputMessage.innerHTML = errorMessage;
            getParent(inputElement, options.formGroup).classList.add('invalid');
        }
        else {
            outputMessage.innerHTML = '';
            getParent(inputElement, options.formGroup).classList.remove('invalid');
        }

        return !errorMessage;
    }

    function inputVali (inputElement) {
        var outputMessage = getParent(inputElement, options.formGroup).querySelector(options.message);
        outputMessage.innerHTML = '';
        getParent(inputElement, options.formGroup).classList.remove('invalid');
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false;
                }
            });
                
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    var enabelInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enabelInputs).reduce(function (values, input) {
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="'+ input.name +'"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = [];
                                    return values
                                };
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value)
                                break;
                            case 'file': 
                                values[input.name] = input.files;
                                break;    
                            default:
                                values[input.name] = input.value
                        }
                        return values;
                    }, {});
                    options.onSubmit(formValues)
                }
                else {
                    formElement.submit();
                }
            }
        }


        options.rules.forEach(function (rule) {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            } 
            var inputElements = document.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                inputElement.oninput = function () {
                    inputVali(inputElement);
                }
            })
        });
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là Email';
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Mật khẩu tối thiểu ${min} kí tự`;
        }
    }
}

Validator.isConfirmed = function (selector, getValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}

# VeeValidate

## Painless Vue forms

VeeValidate is the most popular Vue.js form library. It takes care of value tracking, validation, errors, submissions
and more. [learn more here](https://vee-validate.logaretm.com/v4/).

## How to use it

Essentially you have options to handle form submissions:

- Use the <Form> component.
- Use the useForm composition API helper.

You can find an example on how to use the Form component in the  [FormLogin Component](FormLogin.vue), for the useForm
you can have a look at the [FormShipment Component](FormShipment.vue).

Basically we don't rely much on v-model, instead we use the formValues provide by the plugin. 

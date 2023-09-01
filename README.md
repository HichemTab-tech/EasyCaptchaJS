# EasyCaptchaJS

**EasyCaptchaJS** is a lightweight and user-friendly jQuery/JS library that simplifies the integration of Google reCAPTCHA API into web pages. With EasyCaptchaJS, developers can effortlessly add the security and anti-bot protection of reCAPTCHA to their web applications, enhancing their overall security and user experience.

## Table of Contents

- [EasyCaptchaJS](#easycaptchajs)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Installation](#installation)
    - [npm](#npm)
    - [CDN](#cdn)
    - [Local Download](#local-download)
  - [Usage](#usage)
      - [Auto rendering](#auto-rendering)
  - [Examples](#examples)
    - [Example 1: Auto Rendering with Data Attributes and okbtn Selector](#example-1-auto-rendering-with-data-attributes-and-okbtn-selector)
    - [Example 2: Initializing EasyCaptchaJs with Options Object](#example-2-initializing-easycaptchajs-with-options-object)
    - [Example 3: Initializing EasyCaptchaJs on Multiple Targets with Customized Messages](#example-3-initializing-easycaptchajs-on-multiple-targets-with-customized-messages)
  - [Options](#options)
    - [1- Options object](#1--options-object)
    - [2- Options attributes](#2--options-attributes)
  - [Methods](#methods)
  - [Demo](#demo)
  - [Contributing](#contributing)
  - [Authors](#authors)
  - [License](#license)


## Features

- Easy integration of Google reCAPTCHA API into web pages.
- Dynamically imports the required reCAPTCHA API script for seamless usage.
- Provides customizable success, failure, and expired event callbacks for reCAPTCHA submissions.
- Enables simple verification of reCAPTCHA responses and retrieval of reCAPTCHA tokens.
- Automatic initiation of reCAPTCHA when using the data-auto-easycaptcha attribute.



## Requirements

To use the EasyCaptchaJS jQuery Plugin, you need the following dependencies:
- jQuery (minimum version 3.7.0)
- Bootstrap (minimum version 4.x) *optional*
You can include these dependencies in your HTML file via CDN or by downloading the files locally.

## Installation
To use the EasyCaptchaJS Plugin in your project, you can include the necessary files via npm, CDN or by downloading the files locally.
### npm
You can install EasyCaptchaJS via npm:
```bash
  npm install easycaptchajs
```


### CDN
You can also include EasyCaptchaJS directly from a CDN by adding the following script tag to your HTML file:

```HTML
    <script src="https://cdn.jsdelivr.net/gh/HichemTab-tech/EasyCaptchaJS@1.2.1/dist/easycaptcha.min.js"></script>
```
    
### Local Download
If you prefer to host the library locally, you can download the latest release from the source code and include it in your project:

```HTML
  <script src="path/to/easycaptcha.min.js"></script>
```
## Usage

EasyCaptchaJS can be easily initialized on target elements using jQuery. The library supports two methods of providing options:

- __Using Object Options__:

```HTML
<div id="targetElement"></div>
```
```javascript
const options = {
  ReCAPTCHA_API_KEY_CLIENT: 'YOUR_RECAPTCHA_SITE_KEY',
  // Add other options here
};

// Initialize EasyCaptchaJS with options
$('YOUR_TARGET_ELEMENT_SELECTOR').EasyCaptcha(options);

```

- __Using Data Attributes__:

```HTML
<div data-recaptcha-apikey="GOOGLE_RECAPTCHA_API_KEY_CLIENT" 
     data-theme="dark" 
     data-okbtn-selector="#submitBtn" 
     data-required-msg-example-selector="#errorMsgExample"
     data-loading-msg-example-selector="#loadingMsgExample"
     data-error-msg-example-selector="#errorMsgExample"
></div>
```
```javascript
$('YOUR_TARGET_ELEMENT_SELECTOR').EasyCaptcha();
```

#### Auto rendering

you can skip initializing the EasyCaptchaJS by adding the `data-auto-easycaptcha` to the targetElement so the library will render everything automatically after the page load with any js code.
in this case you need to add the GOOGLE_RECAPTCHA_API_KEY_CLIENT in a meta tag in `<head>` like the following example :

```HTML

<head>
    <title>EasyCaptchaJs Demo</title>
    ...
    <meta name="ReCAPTCHA_API_KEY_CLIENT" content="GOOGLE_RECAPTCHA_API_KEY_CLIENT">
</head>
```

## Examples

### Example 1: Auto Rendering with Data Attributes and okbtn Selector

- Create an HTML file (index.html):

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EasyCaptchaJs - Example 1</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <meta name="ReCAPTCHA_API_KEY_CLIENT" content="YOUR_RECAPTCHA_SITE_KEY">
</head>
<body>
<form>
    <div class="container">
      <h1>EasyCaptchaJs</h1>
        <label class="label">Hi</label>
        <div class="form-group">
            <div class="captchaTarget" data-auto-easycaptcha data-okbtn-selector="#ok"></div>
        </div>
        <div class="form-group">
            <button type="button" class="btn btn-primary" id="ok">OK</button>
        </div>
    </div>
</form>
<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="dist/easycaptcha.js"></script>
</body>
</html>
```

- Replace 'YOUR_RECAPTCHA_SITE_KEY' with your actual Google reCAPTCHA site key.

- Save the HTML file and open it in your web browser.

- The form will display a Google reCAPTCHA checkbox. When users complete the reCAPTCHA verification, the "OK" button will become enabled, allowing them to proceed with form submission.

This example demonstrates the auto-rendering capability of EasyCaptchaJs using data attributes. By adding the data-auto-easycaptcha attribute to the target element, the library automatically renders the Google reCAPTCHA checkbox without the need for additional JavaScript initialization.

#### Features:
- **Auto Rendering**: The Google reCAPTCHA checkbox is automatically rendered for the element with the class `"captchaTarget"` due to the presence of the `data-auto-easycaptcha` attribute. The library handles the integration of the reCAPTCHA API script and initialization process.
- **okbtn handler**: The "OK" button is *disabled* by default and becomes *enabled* only when users successfully complete the reCAPTCHA verification. The `data-okbtn-selector` attribute is used to associate the "OK" button with EasyCaptchaJs. When the reCAPTCHA is verified, the button becomes clickable, allowing users to proceed with form submission, also when the verification expires or fails the button will be disabled again.

This example showcases the simplicity of adding Google reCAPTCHA to a form with just a few data attributes. It provides a user-friendly approach to ensure that only human interactions are allowed in the form submission process.

### Example 2: Initializing EasyCaptchaJs with Options Object

This example demonstrates how to initialize EasyCaptchaJs using the options object and target a specific element by its ID for reCAPTCHA integration.

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EasyCaptchaJs - Example 2</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <meta name="ReCAPTCHA_API_KEY_CLIENT" content="YOUR_RECAPTCHA_SITE_KEY">
</head>
<body>
<form>
    <div class="container">
        <h1>EasyCaptchaJs - Example 2</h1>
        <label class="label">Hi</label>
        <div class="form-group">
            <div id="myCaptcha"></div>
        </div>
        <div class="form-group">
            <button type="button" class="btn btn-primary" id="okBtn">OK</button>
        </div>
    </div>
</form>
<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="dist/easycaptcha.js"></script>
<script>
    // JavaScript
    const options = {
        ReCAPTCHA_API_KEY_CLIENT: 'YOUR_RECAPTCHA_SITE_KEY',
        ReCaptchaSubmit: {
            success: () => {
                console.log('reCAPTCHA verification successful!');
            },
            failed: () => {
                console.log('reCAPTCHA verification failed!');
            },
            expired: () => {
                console.log('reCAPTCHA verification expired!');
            },
        },
        autoVerification: {
            okBtn: "#okBtn",
            requiredMsg: "<div class='alert alert-danger'>Please verify that you are not a robot.</div>",
        },
        apiScriptLoading: {
            error: () => {
                console.log('Error while loading API script.');
            },
        },
    };

    // Initialize EasyCaptchaJs with options object and target element by ID
    $('#myCaptcha').EasyCaptcha(options);
</script>
</body>
</html>
```

#### Features:

- **Options Object**: The EasyCaptchaJs instance is initialized using the options object, which allows developers to customize various aspects of the reCAPTCHA and EasyCaptchaJs behavior.
- **ID Selector**: The target element with the ID "myCaptcha" is selected for EasyCaptchaJs initialization.



### Example 3: Initializing EasyCaptchaJs on Multiple Targets with Customized Messages

In this example, we will showcase how to initialize EasyCaptchaJs on multiple targets using the shared class name for initialization. Additionally, we will customize messages in two ways: using the options object and using attributes with predefined elements.

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EasyCaptchaJs - Example 3</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <meta name="ReCAPTCHA_API_KEY_CLIENT" content="YOUR_RECAPTCHA_SITE_KEY">
</head>
<body>
<form>
    <div class="container">
        <h1>EasyCaptchaJs - Example 3</h1>
        <div class="form-group">
            <div class="captchaTarget" data-okbtn-selector="#okBtn1"></div>
        </div>
        <div class="form-group">
            <button type="button" class="btn btn-primary" id="okBtn1">OK</button>
        </div>

        <div class="form-group">
            <div class="captchaTarget" data-okbtn-selector="#okBtn2"
                 data-required-msg-example-selector="#msg2"></div>
        </div>
        <div class="form-group">
            <button type="button" class="btn btn-primary" id="okBtn2">OK</button>
        </div>
    </div>

    <div class='alert alert-danger hidden' id="msg1">Please check the box above!</div>
    <div class='alert alert-danger hidden' id="msg2">Don't forget to verify!</div>

</form>
<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="dist/easycaptcha.js"></script>
</body>
</html>

```

```javascript
// JavaScript
const options = {
    ReCAPTCHA_API_KEY_CLIENT: 'YOUR_RECAPTCHA_SITE_KEY',
    ReCaptchaSubmit: {
        success: () => {
            console.log('reCAPTCHA verification successful!');
        },
        failed: () => {
            console.log('reCAPTCHA verification failed!');
        },
        expired: () => {
            console.log('reCAPTCHA verification expired!');
        },
    },
    autoVerification: {
        requiredMsg: $("#msg1"),
    },
    apiScriptLoading: {
        loadingMsg: '<div class="spinner-border text-warning" role="status"></div>',
        error: () => {
            console.log('Error while loading API script.');
        },
        errorMsg: "<div class='alert alert-danger'>Custom Error while loading API Script. <b class='retry-load-api-script clickable'>retry</b></div>",
    },
};

// Initialize EasyCaptchaJs on multiple targets with the shared class name "captchaTarget"
$('.captchaTarget').EasyCaptcha(options);

```

#### Features:

- **Multiple Targets**: EasyCaptchaJs is initialized on multiple targets with the shared class name "captchaTarget."
- **Customized Messages**: We customize the required message and error message using both the options object and attributes. This example demonstrates two methods for customizing messages: directly through the options object and by creating predefined elements and setting their selectors as attributes.


*Note: the attributes data overrider the options object data.*

In this example, two captcha targets are selected using the shared class name "captchaTarget." The first captcha target uses customized messages directly through the options object, while the second captcha target utilizes predefined elements with customized messages using attributes.

The customized messages enhance the user experience and provide developers with flexible options to tailor the EasyCaptchaJs behavior according to their specific requirements.

## Options

### 1- Options object

| **Option**                         | **Type**         | **Default**                                                                                                                    | **Description**                                                                                                                                 |
|------------------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **`ReCAPTCHA_API_KEY_CLIENT`**     | String           | `null`                                                                                                                         | The Google reCAPTCHA site key to be used for verification. Replace `null` with your actual Google reCAPTCHA site key.                           |
| **`ReCaptchaSubmit.success`**      | Function         | `() => {}`                                                                                                                     | The function to be executed when the reCAPTCHA verification is successful.                                                                      |
| **`ReCaptchaSubmit.failed`**       | Function         | `(error) => {}`                                                                                                                | The function to be executed when the reCAPTCHA verification fails.                                                                              |
| **`ReCaptchaSubmit.expired`**      | Function         | `() => {}`                                                                                                                     | The function to be executed when the reCAPTCHA verification expires.                                                                            |
| **`autoVerification.okBtn`**       | String \| Jquery | `null`                                                                                                                         | The selector of the "OK" button that should be enabled or disabled based on the reCAPTCHA verification state. Set it to `null` if not required. |
| **`autoVerification.requiredMsg`** | String \| Jquery | `'<div class='alert alert-danger'>Please verify that you are not a robot.</div>'`                                              | The message to be displayed when the user has not completed the reCAPTCHA verification.                                                         |
| **`apiScriptLoading.loadingMsg`**  | String \| Jquery | `'<div class="spinner-border text-primary" role="status"></div>'`                                                              | The loading message displayed while the API script is being loaded.                                                                             |
| **`apiScriptLoading.error`**       | Function         | `() => {}`                                                                                                                     | The function to be executed if an error occurs while loading the API script.                                                                    |
| **`apiScriptLoading.errorMsg`**    | String \| Jquery | `'<div class='alert alert-danger'>Error while loading Api Script. <b class='retry-load-api-script clickable'>retry</b></div>'` | The error message to be displayed when there is an error loading the API script. It includes a "retry" button for users to attempt reloading.   |
| **`theme`**                        | String           | `'light'`                                                                                                                      | The theme to be used for the Google reCAPTCHA widget. Supported values are `'light'` and `'dark'`.                                              |
| **`failure`**                      | Function         | `(error) => { console.error(error); }`                                                                                         | The function to be executed when any failure occurs within EasyCaptchaJs. It is mainly used for error logging and handling.                     |

Here's a preview of default options :

```javascript
let options = {
    ReCAPTCHA_API_KEY_CLIENT: null,
    ReCaptchaSubmit: {
        success: () => {
        },
        failed: () => {
        },
        expired: () => {
        },
    },
    autoVerification: {
        okBtn: null,
        requiredMsg: "<div class='alert alert-danger'>Please verify that you are not a robot.</div>",
    },
    apiScriptLoading: {
        loadingMsg: '<div class="spinner-border text-primary" role="status"></div>',
        error: () => {
        },
        errorMsg: "<div class='alert alert-danger'>Error while loading Api Script. <b class='retry-load-api-script clickable'>retry</b></div>",
    },
    theme: 'light',
    failure: (error) => {
        console.error(error);
    }
};
```

### 2- Options attributes

| **Data Attribute**                   | **Description**                                                                                                                                                                                                                                                              | **Example Usage**                                        |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| `data-okbtn-selector`                | The selector of the "OK" button that should be enabled or disabled based on the reCAPTCHA verification state. remove it if not required.                                                                                                                                     | `data-okbtn-selector="#myOKButton"`                      |
| `data-recaptcha-apikey`              | The Google reCAPTCHA site key to be used for verification.                                                                                                                                                                                                                   | `data-recaptcha-apikey="YOUR_RECAPTCHA_SITE_KEY"`        |
| `data-required-msg-example-selector` | The selector of an example element that contains the custom message to be displayed when the user has not completed the reCAPTCHA verification. It should have class 'hidden' initially.                                                                                     | `data-required-msg-example-selector="#msg1"`             |
| `data-loading-msg-example-selector`  | The selector of an example element that contains the custom loading message to be displayed while the API script is being loaded. It should have class 'hidden' initially.                                                                                                   | `data-loading-msg-example-selector="#loadingMsgExample"` |
| `data-error-msg-example-selector`    | The selector of an example element that contains the custom error message to be displayed when there is an error loading the API script. It should have class 'hidden' initially. The error message should include a clickable element with class `'retry-load-api-script'`. | `data-error-msg-example-selector="#errorMsgExample"`     |
| `data-theme`                         | The theme to be used for the Google reCAPTCHA widget. Supported values are `'light'` and `'dark'`.                                                                                                                                                                           | `data-theme="dark"`                                      |
| `data-auto-easycatcha`               | If you add this attribute you don't need to initialize the library with js, it will be initialized automatically right after the page loads                                                                                                                                  | `data-auto-easycaptcha`                                  |

## Methods

EasyCaptchaJs provides some methods that can be called on the EasyCaptcha elements using the $().EasyCaptcha('methodName') syntax. Each method performs a specific action and returns the results in a structured format. Here are the available methods and their return types:

- **'verify'** : This method is used to verify the reCAPTCHA checkbox status. It returns an array of verification results containing objects with the following properties:

| **Property**        | **Type** | **Description**                                                        |
|---------------------|----------|------------------------------------------------------------------------|
| **`parentElement`** | JQuery   | The parent element of the EasyCaptcha checkbox.                        |
| **`verified`**      | Boolean  | A boolean indicating whether the reCAPTCHA checkbox has been verified. |

- **'response'** : This method is used to get the reCAPTCHA response token. It returns an array of response results containing objects with the following properties:

| **Property**        | **Type** | **Description**                                 |
|---------------------|----------|-------------------------------------------------|
| **`parentElement`** | JQuery   | The parent element of the EasyCaptcha checkbox. |
| **`token`**         | String   | The reCAPTCHA response token as a string.       |

- **'reset'** : This method is used to reset the reCAPTCHA checkbox. It takes no arguments and does not return anything.

- **'destroy'** : This method is used to destroy the EasyCaptcha elements and remove their associated data. It does not return anything.

*Note:* The library function EasyCaptcha at the end returns either the array of results if there are multiple results, or a single result object if there is only one result. If no results are available, it returns `null`.
## Demo

Here's a Demo example : 

[Demo](https://hichemtab-tech.github.io/EasyCaptchaJs)
## Contributing

Contributions are always welcome!

If you have any ideas, improvements, or bug fixes, please [open an issue](https://github.com/HichemTab-tech/EasyCaptchaJs/issues) or [submit a pull request](https://github.com/HichemTab-tech/EasyCaptchaJs/pulls).

## Authors

- [@HichemTab-tech](https://www.github.com/HichemTab-tech)

## License

[MIT](https://github.com/HichemTab-tech/EasyCaptchaJs/blob/master/LICENSE)

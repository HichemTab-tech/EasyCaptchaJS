export const EasyCaptcha = function (options = {}, ...args) {
    let AUTO_INIT = options === null;
    if (options === null) options = {};
    if ($(this).length === 0 && !AUTO_INIT) {
        throw "no ReCaptcha div parent.";
    }

    let results = [];

    const methods = {
        'getTarget': function (results, data, args) {
            if (args.length !== 0) {
                if (args[0].startsWith('#')) args[0] = args[0].substring(1);
                if (args[0] === data.parentId) {
                    let res = {
                        parentElement: $("#" + data.parentId),
                        data: data
                    };
                    results.push(res);
                }
            }
            else{
                let res = {
                    parentElement: $("#" + data.parentId),
                    data: data
                };
                results.push(res);
            }
            return results;
        },
        'verify': function (results, data, args) {
            if (args.length !== 0) {
                if (args[0].startsWith('#')) args[0] = args[0].substring(1);
                if (args[0] === data.parentId) {
                    let res = {
                        verified: grecaptcha.getResponse(data.widgetId) !== "",
                    };
                    results.push(res);
                }
            }
            else{
                let res = {
                    parentElement: $("#" + data.parentId),
                    verified: grecaptcha.getResponse(data.widgetId) !== "",
                };
                results.push(res);
            }
            return results;
        },
        'response': function (results, data, args) {
            if (args.length !== 0) {
                if (args[0].startsWith('#')) args[0] = args[0].substring(1);
                if (args[0] === data.parentId) {
                    let res = {
                        token: grecaptcha.getResponse(data.widgetId),
                    };
                    results.push(res);
                }
            }
            else{
                let res = {
                    parentElement: $("#" + data.parentId),
                    token: grecaptcha.getResponse(data.widgetId),
                };
                results.push(res);
            }
            return results;
        },
        'reset': function (results, data, args) {
            if (args.length !== 0) {
                if (args[0].startsWith('#')) args[0] = args[0].substring(1);
                if (args[0] === data.parentId) {
                    grecaptcha.reset(data.widgetId);
                }
            }
            else{
                grecaptcha.reset();
            }
            return results;
        },
        'destroy': function (results, data) {
            let p = $("#" + data.parentId);
            p.empty();
            p.removeData('EasyCaptcha');
            return results;
        }
    };

    if (typeof options === 'object') {
        handleOneChild($(this), 0, options, AUTO_INIT);
    }
    else{
        for (let i = 0; i < $(this).length; i++) {
            let data = $($(this)[i]).data('EasyCaptcha');
            if (!!data) {
                if (typeof methods[options] !== 'undefined') {
                    results = methods[options](results, data, [...args]);
                }
            }
        }
    }
    return results.length > 1 ? results : (results.length === 0 ? null : results[0]);
}

function handleOneChild($group, i, options, AUTO_INIT) {
    if ($group.length === i) return;
    let $this = $($group[i]);
    let data = $this.data('EasyCaptcha');
    let settings;
    if (!data) {
        data = {};
        data.AUTO_INIT = AUTO_INIT;
        settings = $.extend(
            true,
            {
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
        }, options);
        let meta = $('meta[name="ReCAPTCHA_API_KEY_CLIENT"]');
        if (meta.length !== 0) {
            settings.ReCAPTCHA_API_KEY_CLIENT = meta.attr('content');
        }
        if (attrExist($this.attr('data-okbtn-selector'))) {
            settings.autoVerification.okBtn = $this.attr('data-okbtn-selector');
        }
        if (attrExist($this.attr('data-recaptcha-apikey'))) {
            settings.ReCAPTCHA_API_KEY_CLIENT = $this.attr('data-recaptcha-apikey');
        }
        if (attrExist($this.attr('data-required-msg-example-selector'))) {
            let e = $($this.attr('data-required-msg-example-selector')).clone();
            e.removeClass('hidden');
            e.removeClass('d-none');
            settings.autoVerification.requiredMsg = e;
        }
        if (attrExist($this.attr('data-loading-msg-example-selector'))) {
            let e = $($this.attr('data-loading-msg-example-selector')).clone();
            e.removeClass('hidden');
            e.removeClass('d-none');
            settings.apiScriptLoading.loadingMsg = e;
        }
        if (attrExist($this.attr('data-error-msg-example-selector'))) {
            let e = $($this.attr('data-error-msg-example-selector')).clone();
            e.removeClass('hidden');
            e.removeClass('d-none');
            settings.apiScriptLoading.errorMsg = e;
        }
        if (attrExist($this.attr('data-theme'))) {
            settings.theme = $this.attr('data-theme');
        }
        data.settings = settings;
        changeBtnState(data, false);
        let idSuffix = Math.floor((Math.random() * 1000) + 100);
        if (!attrExist($this.attr('id'))) {
            $this.attr('id', idSuffix + "_ReCaptchaTargetParent");
        }
        data.parentId = $this.attr('id');
        data.elementId = data.parentId + '__child';
        let $RecaptchaTarget = $('<div class="ReCaptchaTarget" id="' + data.elementId + '"></div>');
        $RecaptchaTarget.appendTo($this);
        let $alertsParent = $('<div class="alertsParent"></div>');
        $alertsParent.appendTo($this);
        if (data.AUTO_INIT) {
            let $hiddenInput = $('<input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response" value="">');
            $hiddenInput.appendTo($this);
        }
        $this.data('EasyCaptcha', data);
        startCheckingGoogleReCaptchaScript(data).then(
            function () {
                handleOneChild($group, i+1, options, AUTO_INIT);
            },
            function (error) {
                settings.failure(error??"Unknown error");
            }
        );
    } else {
        handleOneChild($group, i+1, options, AUTO_INIT);
    }
}

async function startCheckingGoogleReCaptchaScript(data) {
    await new Promise(function (myResolve, myReject) {
        checkAndInitGoogleReCaptchaScript(myResolve, myReject, data);
    }).then(
        function () {
            initReCaptchaHandlers(data);
        },
        function (error) {
            data.settings.apiScriptLoading.error(error);
        }
    );
}

async function checkAndInitGoogleReCaptchaScript(myResolve, myReject, data) {
    const scriptApiUrl = 'https://www.google.com/recaptcha/api.js?onload=EasyCaptchaScriptCallback&render=explicit';
    let $EasyCaptchaScript = $('script[src="'+scriptApiUrl+'"]');
    if ($EasyCaptchaScript.length === 0 || $EasyCaptchaScript.attr('loaded') !== 'true') {
        if ($EasyCaptchaScript.length !== 0) $EasyCaptchaScript.remove();
        let $alertsParent = $("#"+data.parentId).find('.alertsParent');
        $alertsParent.empty();
        let $loadingMsg = $(data.settings.apiScriptLoading.loadingMsg);
        $loadingMsg.appendTo($alertsParent);
        window.EasyCaptchaScriptCallback = () => {
            $('script[src="'+scriptApiUrl+'"]').attr('loaded', 'true');
            myResolve();
            $alertsParent.empty();
        }
        let $newEasyCaptchaScript = document.createElement('script');
        $newEasyCaptchaScript.src = scriptApiUrl;
        $newEasyCaptchaScript.async = true;
        $newEasyCaptchaScript.defer = true;
        $newEasyCaptchaScript.onerror = function () {
            myReject("EasyCaptchaScript_FAILED");
            $alertsParent.empty();
            let $errorMsg = $(data.settings.apiScriptLoading.errorMsg);
            $errorMsg.appendTo($alertsParent);
            $errorMsg.find('.retry-load-api-script').on('click', function () {
                startCheckingGoogleReCaptchaScript(data);
            });
        };
        $('head')[0].appendChild($newEasyCaptchaScript);
    }
    else{
        myResolve();
    }
}

let grecaptcha;
function initReCaptchaHandlers(data) {
    /**
     * @typedef {Object} ReCaptcha_grecaptcha
     * @property {function} render
     * @property {function} reset
     * @property {function} getResponse
     */
    // noinspection JSUnresolvedReference
    /** @type ReCaptcha_grecaptcha */
    grecaptcha = window.grecaptcha;
    let theme;
    if (typeof data.settings.theme === 'string') {
        theme = data.settings.theme;
    }
    else if (typeof data.settings.theme === 'function') {
        theme = data.settings.theme();
    }
    if (theme !== 'light' && theme !== 'dark') theme = 'light';
    data.widgetId = grecaptcha.render(data.elementId, {
        'sitekey': data.settings.ReCAPTCHA_API_KEY_CLIENT,
        'callback': () => onReCAPTCHASubmitsSuccessfulResponse_default(data),
        'expired-callback': () => onReCAPTCHAResponseExpired_default(data),
        'error-callback': () => onReCAPTCHAError_default(data),
        'theme': theme,
    });
}

function onReCAPTCHASubmitsSuccessfulResponse_default(data) {
    data.settings.ReCaptchaSubmit.success();
    changeBtnState(data, true);
    fillHiddenInput(data, grecaptcha.getResponse(data.widgetId));
}
function onReCAPTCHAResponseExpired_default(data) {
    data.settings.ReCaptchaSubmit.expired();
    changeBtnState(data, false);
    fillHiddenInput(data, "");
}
function onReCAPTCHAError_default(data) {
    data.settings.ReCaptchaSubmit.failed();
    changeBtnState(data, false);
    fillHiddenInput(data, "");
}

function fillHiddenInput(data, value) {
    if (data.AUTO_INIT) {
        $("#" + data.parentId).find('[name="g-recaptcha-response"]').val(value);
    }
}

function changeBtnState(data, enable) {
    if (data.settings.autoVerification.okBtn != null) {
        let $okBtn = $(data.settings.autoVerification.okBtn);
        $okBtn.prop('disabled', !enable);
        if (!enable) $okBtn.addClass('disabled');
        else $okBtn.removeClass('disabled');
    }
}

function attrExist(attr) {
    return typeof attr !== 'undefined' && attr !== null && attr !== "";
}
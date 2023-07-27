import {EasyCaptcha} from "./src/easycaptcha";

(function ($) {
    $.fn.EasyCaptcha = EasyCaptcha;
})(jQuery);

$('[data-auto-easycaptcha]').EasyCaptcha(null);

export { EasyCaptcha };
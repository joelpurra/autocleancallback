/*!
* @license AutoCleanCallback
* Copyright (c) 2011, 2012 The Swedish Post and Telecom Authority (PTS)
* Developed for PTS by Joel Purra <http://joelpurra.se/>
* Released under the BSD license.
*
* A jQuery plugin to clean input fields with common functionality, like
* trim, normalize whitespace, digits only. It is also easily extensible.
*/
// https://gist.github.com/2254354

// Uses Ben Alman's JavaScript Debug: A simple wrapper for console.log
// http://benalman.com/projects/javascript-debug-console-log/

/*jslint vars: true, white: true, browser: true*/
/*global jQuery*/

// Set up namespace, if needed
var JoelPurra = JoelPurra || {};

(function ($, namespace) {

    // TODO: put in common library for reuse
    namespace.getFunctionName = function (fn) {

        if (fn === undefined) {

            return undefined;
        }

        var fnStr = ("" + fn);

        return $.trim(fnStr.substr(0, fnStr.indexOf("(")));
    };

    // TODO: put in common library for reuse
    namespace.getFunctionSignature = function (fn) {

        if (fn === undefined) {

            return undefined;
        }

        var fnStr = ("" + fn);

        return $.trim(fnStr.substr(0, fnStr.indexOf(")") + 1));
    };

    namespace.autoCleanCallback = function ($input, callback) {

        var callbackName = namespace.getFunctionName(callback);

        debug.log(".autoCleanCallback($input, callback)", $input, callbackName);

        if ($input.length === 0) {

            debug.error(".autoCleanCallback($input, callback)", $input, callbackName, "Called with an empty $input.");

            return;
        }

        if ($input.length !== 1) {

            debug.error(".autoCleanCallback($input, callback)", $input, callbackName, "Called with more than one matched $input.");

            return;
        }

        // Could also be checked against
        // http://www.w3.org/TR/html5/the-input-element.html#attr-input-type
        if (!$input.is(":input")) {

            debug.error(".autoCleanCallback($input, callback)", $input, callbackName, "Called with a non-:input $input.");

            return;
        }

        if (callback === undefined) {

            debug.error(".autoCleanCallback($input, callback)", $input, callbackName, "Called without callback($input).");

            return;
        }

        if (callback === null) {

            debug.error(".autoCleanCallback($input, callback)", $input, callbackName, "Called with a null callback($input).");

            return;
        }

        if (!$.isFunction(callback)) {

            debug.error(".autoCleanCallback($input, callback)", $input, callbackName, "Called with a non-function callback($input).");

            return;
        }

        function cleanCallback(evt) {

            debug.log(".autoCleanCallback($input, callback)", $input, callbackName, "cleanCallback(evt)", evt);

            var field = $(evt.target);

            var clean = callback(field);

            if (clean !== null) {

                field.val(clean);
            }
        }

        // TODO: might be better to check the key events and then allow/disallow them
        // Right now the unclean character flashes before being deleted
        $input.keyup(cleanCallback);
        $input.change(cleanCallback);
    };

    namespace.autoCleanTrim = function ($input) {

        debug.log(".autoCleanTrim($input)", $input);

        function cleanTrim($inputToClean) {

            debug.log(".autoCleanTrim($input)", $input, "cleanTrim($inputToClean)", $inputToClean);

            var val = $inputToClean.val();

            var clean = val.trim();

            if (val !== clean) {

                return clean;
            }

            return null;
        }

        namespace.autoCleanCallback($input, cleanTrim);
    };

    namespace.autoCleanReplace = function ($input, disallowed, replaceWith) {

        debug.log(".autoCleanReplace($input, disallowed, replaceWith)", $input, disallowed, replaceWith);

        function cleanReplace($inputToClean) {

            debug.log(".autoCleanReplace($input, disallowed, replaceWith)", $input, disallowed, replaceWith, "cleanReplace($inputToClean)", $inputToClean);

            var val = $inputToClean.val();

            var clean = val.replace(disallowed, replaceWith);

            if (val !== clean) {

                return clean;
            }

            return null;
        }

        namespace.autoCleanCallback($input, cleanReplace);
    };

    namespace.autoCleanNormalizeWhitespace = function ($input) {

        debug.log(".autoCleanNormalizeWhitespace($input)", $input);

        var disallowed = /(\s)\1/g;

        var replaceWith = "$1";

        namespace.autoCleanReplace($input, disallowed, replaceWith);
    };

    namespace.autoCleanKeepNumbersOnly = function ($input) {

        debug.log(".autoCleanKeepNumbersOnly($input)", $input);

        var disallowed = /[^\d]/g;

        var replaceWith = "";

        namespace.autoCleanReplace($input, disallowed, replaceWith);
    };

} (jQuery, JoelPurra));
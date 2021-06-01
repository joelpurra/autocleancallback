# [AutoCleanCallback](https://joelpurra.com/projects/autocleancallback) javascript library

A jQuery plugin to clean input fields with common functionality, like trim, normalize whitespace, digits only. It is also easily extensible.



> ## ⚠️ This project has been archived
>
> No future updates are planned. Feel free to continue using it, but expect no support.



## Usage

```html
<input id="auto-clean-me" type="text" />
```

```javascript
// $input is a jQuery object with an input field.
var $input = $("#auto-clean-me");

// Pick one or more of these auto clean functions.
JoelPurra.autoCleanTrim($input);
JoelPurra.autoCleanTrimLeft($input);
JoelPurra.autoCleanTrimRight($input);
JoelPurra.autoCleanLowerCase($input);
JoelPurra.autoCleanUpperCase($input);
JoelPurra.autoCleanNormalizeWhitespace($input); // Don't allow repeated whitespace characters
JoelPurra.autoCleanKeepNumbersOnly($input);
```

## Extensibility

Have a look at the source code. Write your versions to call these base functions, and you'll be on your way.

```javascript
// $input is a jQuery object with an input field.
// Callback is called with the input field as an argument, and is expected to return the new, cleaned value, for the input.
JoelPurra.autoCleanCallback($input, callback);

// $input is a jQuery object with an input field.
// disallowed represents disallowed characters; it can be a string or a regexp.
// replaceWith is a string, possibly with regexp $1...$n replacement values.
JoelPurra.autoCleanReplace($input, disallowed, replaceWith);
```



## Runtime dependencies
- [jQuery](https://jquery.com/)
- [Ben Alman's JavaScript Debug](http://benalman.com/projects/javascript-debug-console-log/), a simple wrapper for console.log



## License
Developed for PTS by [Joel Purra](https://joelpurra.com/)

Copyright (c) 2011, 2012, 2013, 2014, 2015 The Swedish Post and Telecom Authority (PTS)
All rights reserved.

Released under the BSD license.

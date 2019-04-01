
/**
 * @file
 * Default JavaScript file for Modal Page.
 */

jQuery.noConflict();

jQuery( document ).ready(function () {

  'use strict';

  var modalPage = jQuery('#js-modal-page-show-modal');

  if (getQueryVariable("killmodalcookie") == "yes") {
    eraseCookie(modalName);
    //console.log("erased cookie " + modalName);
  }
  else {
    var myCookie = getCookie(modalName);
    //console.log("set the myCookie var");
  }
  
  if (myCookie == null) {
    //console.log("cookie is null");

    if (modalPage.length) {

      // leaving these 2 calls and the loadScript() function for possible future debugging:
      // call jquery lib: https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
      //loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js",
      //  function () { console.log('jQuery 3.1.1 has been loaded.'); });
      // call bootstrap lib: https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js
      //loadScript("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
      //  function () { console.log('bootstrap 3.3.7 has been loaded.'); });

      modalPage.modal();
      //console.log("modal loaded");

      setCookie(modalName,"modal-no-load",modalExp);
    }
  }

  function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    //console.log("cookie " + modalName + " is set...");
    var myCookie = getCookie(modalName);
    if (myCookie == null) {
      //console.log("arg the cookie is null");
    }
    else {
      //console.log("yay the cookie is not null");
    }
  }

  function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    // return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
    }
    return(false);
  }

  function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
  }

  function loadScript(url, completeCallback) {
     var script = document.createElement('script'), done = false,
         head = document.getElementsByTagName("head")[0];
     script.src = url;
     script.onload = script.onreadystatechange = function(){
       if ( !done && (!this.readyState ||
            this.readyState == "loaded" || this.readyState == "complete") ) {
         done = true;
         completeCallback();

        // IE memory leak
        script.onload = script.onreadystatechange = null;
        head.removeChild( script );
      }
    };
    head.appendChild(script);
}

});


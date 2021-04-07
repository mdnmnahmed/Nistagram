export const setCookie = (name, value, days = 365) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    //document.cookie = name + "=" + (value || "")  + expires + "; path=/; samesite=none; secure=true";
    document.cookie = name + "=" + (value || "");
}

/**
 * Cookie setting function.
 * @param {cookie_name} string - string.
 * @return {string} string - cookie value
*/
export const getCookie = (cookie_name) => {
    var name = cookie_name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
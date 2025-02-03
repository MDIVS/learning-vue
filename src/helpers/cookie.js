/**
 * Helper functions for getting and setting cookies.
 */
export const Cookie = {
  /**
   * Retrieves the value of a cookie by name.
   *
   * @param {string} name - The name of the cookie.
   * @return {string|null} - The cookie value or null if not found.
   */
  get(name) {
    // Split document.cookie string into individual cookies
    const cookies = document.cookie.split(';');
    // Iterate through the cookies array
    for (let cookie of cookies) {
      // Trim leading whitespace
      cookie = cookie.trim();
      // Check if the cookie string starts with the given name followed by '='
      if (cookie.startsWith(name + '=')) {
        // Return the decoded cookie value
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  },

  /**
   * Sets a cookie with a given name, value, and options.
   *
   * @param {string} name - The name of the cookie.
   * @param {string} value - The value of the cookie.
   * @param {Object} [options={}] - Optional settings for the cookie.
   *   Options may include:
   *     - expires {number|Date|string}: Number of days until expiration, a Date object, or a valid UTC date string.
   *     - path {string}: The path where the cookie is visible. Defaults to "/".
   *     - domain {string}: The domain where the cookie is visible.
   *     - secure {boolean}: If true, the cookie will only be transmitted over secure protocols like HTTPS.
   *     - sameSite {string}: Controls cookie cross-site behavior ('Strict', 'Lax', or 'None').
   */
  put(name, value, options = {}) {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    // Handle expires option
    if (options.expires) {
      let expires;
      if (typeof options.expires === 'number') {
        // When options.expires is a number, treat it as days
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        expires = date.toUTCString();
      } else if (options.expires instanceof Date) {
        expires = options.expires.toUTCString();
      } else {
        expires = options.expires; // Assume it's a valid UTC string
      }
      cookieStr += `; expires=${expires}`;
    }

    // Handle path
    cookieStr += `; path=${options.path || '/'}`;

    // Handle domain
    if (options.domain) {
      cookieStr += `; domain=${options.domain}`;
    }

    // Handle secure
    if (options.secure) {
      cookieStr += '; secure';
    }

    // Handle sameSite
    if (options.sameSite) {
      cookieStr += `; SameSite=${options.sameSite}`;
    }

    document.cookie = cookieStr;
  },

  /**
   * Removes the cookie with the given name.
   *
   * @param {string} name - The name of the cookie to remove.
   */
  remove(name) {
    // Set the cookie with an expiration date in the past to remove it.
    // Using expires: -1 will set the expiration to 1 day in the past.
    this.put(name, '', { expires: -1 });
  }
};

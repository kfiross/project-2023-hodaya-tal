export const PrefsKeys = {
  USER_TYPE: "USER_TYPE"
}

class PrefsUtils {
  static clear() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear();
    }
  }

  /**
   *
   * @param key {string}
   * @param value {boolean}
   */
  static setBoolean(key, value) {
    localStorage.setItem(key, ""+value);
  }

  /**
    @returns {boolean}
   */
  static getBoolean(key) {
    let value = localStorage.getItem(key);
    return value === "true";
  }

  /**
   *
   * @param key {string}
   * @param value {number}
   */
  static setInt(key, value) {
    localStorage.setItem(key, ""+value);
  }

  /**
   @returns {number}
   */
  static getInt(key) {
    let value = localStorage.getItem(key);
    return parseInt(value);
  }

  /**
   *
   * @param key {string}
   * @param value {string}
   */
  static setString(key, value) {
    localStorage.setItem(key, value);
  }

  /**
   @returns {string}
   */
  static getString(key) {
    return localStorage.getItem(key);
  }
}

export default PrefsUtils;

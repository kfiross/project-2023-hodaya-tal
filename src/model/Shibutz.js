class Shibutz {
  /**
   *
   * @param {string} userId
   * @param {number} mismeret
   * @param {Date} date
   */
  constructor(userId, mismeret, date) {
    this.userId = userId;
    this.mismeret = mismeret;
    this.date = date;
  }

  toJSON(){
    return {
      userId: this.userId,
      mismeret: this.mismeret,
      date: this.date.getDate(),
    }
  }

  /**
   * @param {{string: any}} json
   * @returns {Shibutz}
   */
  static fromJSon(json){
    return new Shibutz(
      json['userId'],
      json['mismeret'],
      new Date(json['date']),
    );
  }
}

export default Shibutz;

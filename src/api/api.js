import {getDatabase, set, get, ref} from "firebase/database";
import firebase_app from "../firebase";
import moment from "moment";

const rtdb = getDatabase(firebase_app);

class API {
  /**
   *
   * @param {string} userId
   * @param {number} mishmert
   * @param {number} rate
   * @param {Date} day
   * @returns {Promise<boolean>}
   */
  static async addShibutz(userId, mishmert, rate, day) {
    const date = moment(day).format("DD-MM-YYYY");
    const splits = date.split('-');
    const [dd, mm, yyyy] = splits
    const path = `shibuzim/${yyyy}/${mm}/${dd}/${userId}/${mishmert}`
    try {
      const response = set(ref(rtdb, path), rate);
    }
    catch (e){
      console.error(e);
      return false;
    }
    return true;
  }

  /**
   *
   * @param {string} userId
   * @param {string} fromDate
   * @param {string} toDate
   * @returns {Promise<{string: any}>}
   */
  static async getShomerShibutzim(userId, fromDate, toDate) {
    let allShibutzim = [];
    const startDate = moment(fromDate, "DD/MM/YYYY")
    const endDate = moment(toDate, "DD/MM/YYYY")

    const days = endDate.diff(startDate, 'days') - 1;
    let start = startDate.toDate();

    let promises = [];

    for (let i = 0; i < days; i++) {
      const dateToCheck = moment(start).add(i, 'd').format("YYYY-MM-DD")
      const [year, month, day] = dateToCheck.split('-');

      const shibutzimRef = ref(rtdb, `shibuzim/${year}/${month}/${day}/${userId}`)
      promises.push(get(shibutzimRef));
    }

    let resolvers = await Promise.all(promises);

    for (let i = 0; i < days; i++) {
      const shibutzimSnapshot = resolvers[i]
      const shibutzimVal = shibutzimSnapshot.val();
      let shibutzim = {1: null, 2: null, 3: null, 4: null}

      if (!shibutzim){
        // do nothing
      }


      if (Array.isArray(shibutzimVal)){
        for(let x of shibutzimVal){
            shibutzim[`${shibutzimVal.indexOf(x)}`] = x
        }
      }

      allShibutzim.push(shibutzim)
    }

    return allShibutzim;
  }


  /**
   *
   * @param {string} userId
   * @param {string} date
   * @returns {Promise<{string: any}>}
   */
  static async getShomerShibutz(userId, date) {

    const dateToCheck = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD")
    const [year, month, day] = dateToCheck.split('-');

    const shibutzimRef = ref(rtdb, `shibuzim/${year}/${month}/${day}/${userId}`)
    const shibutzimSnapshot = await get(shibutzimRef);
    const shibutzimVal = shibutzimSnapshot.val();
    let shibutzim = {1: null, 2: null, 3: null, 4: null}

    if (!shibutzim){
      // do nothing
    }


    if (Array.isArray(shibutzimVal)){
      for(let x of shibutzimVal){
        shibutzim[`${shibutzimVal.indexOf(x)}`] = x
      }
    }

   return shibutzim
  }


}

export default API;

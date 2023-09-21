import { LANGUAGES } from "./constant";
import localization from 'moment/locale/vi';
import moment from "moment";

// TIMEZONE='Asia/Ho_Chi_Minh'

class CommonUtils {
    static getBase64 (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject();
        })
    }

    static getAllDays (language) {
        // Today + alldays
        let allDays = [];

        // Get today
        if (language === LANGUAGES.VI) {
            const ddmm = moment(new Date()).format('DD/MM'); // Ex: 29/12
            allDays.push({
                label: `Hôm nay - ${ddmm}`,
                value: moment(new Date()).add(0, 'days').startOf('day').valueOf()
            })
        } else {
            const ddmm = moment(new Date()).format('DD/MM'); // Ex: 29/12
            allDays.push({
                label: `Today - ${ddmm}`,
                value: moment(new Date()).add(0, 'days').startOf('day').valueOf()
            })
        }

        // Get all days
        for (let i = 1; i < 7; i++) {
            if (language === LANGUAGES.VI) {
                allDays.push({
                    label: moment(new Date()).add(i, 'days').format('dddd - DD/MM'),
                    value: moment(new Date()).add(i, 'days').startOf('day').valueOf()
                })
            }
            else {
                allDays.push({
                    label: moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM'),
                    value: moment(new Date()).add(i, 'days').startOf('day').valueOf()
                })
            }
        }
        return allDays;
    }
}

export default CommonUtils;
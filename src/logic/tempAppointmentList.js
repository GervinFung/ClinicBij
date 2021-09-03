import { db } from '../components/util/database';
import { Alert } from 'react-native';

let appointmentList = [];

const optionList = ['All', 'Cancelled', 'Done', 'Pending'];

export const getAppointmentList = async (uid) => {
    return new Promise((resolve, reject)=> {
         db.transaction((tx) => {
             const command = `SELECT a.appointment_id, a.appointment_dateTime, a.status, a.purpose, b.username 
             FROM appointment AS a, user AS b WHERE a.patient_id = ? AND a.doctor_id = b.user_id`;
            tx.executeSql(command, [uid], (_, results) => {
                var list = [];
                if (results.rows.length > 0) {
                    for (let i = 0; i < results.rows.length; i++) {
                        list.push(results.rows.item(i));
                    }
                    resolve(list);
                } else {
                    Alert.alert('You have no appointment');
                }
            });
        });
     });
};

export const getOptionList = () => {
    return optionList;
};

const getDoneAppointmentList = (uid) => {
    return getAppointmentList(uid).filter((appointment) => {
        return isDoneStatus(appointment.status);
    });
};

export const getPendingAppointmentList = (uid) => {
    return getAppointmentList(uid).filter((appointment) => {
        return isPendingStatus(appointment.status);
    });
};

const getCancelledAppointmentList = (uid) => {
    return getAppointmentList(uid).filter((appointment) => {
        return isCancelledStatus(appointment.status);
    });
};

export const isAllStatus = (all) => {
    return all.toLowerCase() === 'all';
};

export const isDoneStatus = (done) => {
    return done.toLowerCase() === 'done';
};

export const isPendingStatus = (pending) => {
    return pending.toLowerCase() === 'pending';
};

export const isCancelledStatus = (cancelled) => {
    return cancelled.toLowerCase() === 'cancelled';
};

export const getFilteredAppointmentList = (itemValue, uid) => {
    if (isAllStatus(itemValue)) {
        return getAppointmentList(uid);
    } else if (isDoneStatus(itemValue)) {
        return getDoneAppointmentList(uid);
    } else if (isCancelledStatus(itemValue)) {
        return getCancelledAppointmentList(uid);
    } else if (isPendingStatus(itemValue)) {
        return getPendingAppointmentList(uid);
    }
    throw new Error('Status should be either ALL, DONE, CANCELLED or PENDING');
};

// remove from appointment

export const removeFromPendingAppointmentList = (id) => {
    appointmentList = appointmentList.filter((appointment) => {
        return appointment.id !== id;
    });
    return getPendingAppointmentList();
};

// add to appointment

export const addToAppointmentList = (user, doctor, date, time, purpose) => {
    const id = Math.max.apply(Math, appointmentList.map((appointment) => {
        return appointment.id;
    }));
    const appointment = {
        doctor: doctor,
        date: date,
        time: time,
        status: 'pending',
        purpose: purpose,
        id: id + 1,
    };
    appointmentList.push(appointment);
};

// update to appointment

const getAppointmentFound = (id) => {
    const appointmentFound = appointmentList.find((appointment) => {
        return appointment.id === id;
    });
    if (appointmentFound === undefined) {
        throw new Error('ID passed as parameter is invalid, hence no appointment was found');
    }
    return appointmentFound;
};

export const updatePurposeOfAppointment = (user, id, purpose) => {
    getAppointmentFound(id).purpose = purpose;
};

export const updateDateTimeOfAppointment = (user, id, date, time) => {
    const appointmentFound = getAppointmentFound(id);
    appointmentFound.date = date;
    appointmentFound.time = time;
};

export const updateDoctorOfAppointment = (user, id, doctor) => {
    getAppointmentFound(id).doctor = doctor;
};

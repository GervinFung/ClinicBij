let appointmentList = [{
    doctor: 'Doctor Bonab',
    date: '27/8/2020',
    time: '15:00',
    status: 'pending',
    purpose: 'Covid-19',
    id: 1,
}, {
    doctor: 'Doctor Michael',
    date: '27/8/2020',
    time: '15:30',
    status: 'done',
    purpose: 'Pregnancy',
    id: 2,
}, {
    doctor: 'Doctor Bonab',
    date: '27/8/2020',
    time: '15:00',
    status: 'cancelled',
    purpose: 'Back pain',
    id: 3,
}, {
    doctor: 'Doctor Sheeva',
    date: '27/8/2020',
    time: '15:00',
    status: 'done',
    purpose: 'Heart problem',
    id: 4,
}, {
    doctor: 'Doctor Bonab',
    date: '27/8/2020',
    time: '15:00',
    status: 'pending',
    purpose: 'Skin problem',
    id: 5,
}, {
    doctor: 'Doctor Bonab',
    date: '27/8/2020',
    time: '15:00',
    status: 'done',
    purpose: 'Knee pain',
    id: 6,
},
];

const optionList = ['All', 'Cancelled', 'Done', 'Pending'];

export const getAppointmentList = (user, appointmentDate, appointmentTime) => appointmentList;

export const getOptionList = () => optionList;

const getDoneAppointmentList = (user) => {
    return appointmentList.filter((appointment) => {
        return isDoneStatus(appointment.status);
    });
};

export const getPendingAppointmentList = (user) => {
    return appointmentList.filter((appointment) => {
        return isPendingStatus(appointment.status);
    });
};

const getCancelledAppointmentList = (user) => {
    return appointmentList.filter((appointment) => {
        return isCancelledStatus(appointment.status);
    });
};

export const isAllStatus = (all) => all.toLowerCase() === 'all';

export const isDoneStatus = (done) => done.toLowerCase() === 'done';

export const isPendingStatus = (pending) => pending.toLowerCase() === 'pending';

export const isCancelledStatus = (cancelled) => cancelled.toLowerCase() === 'cancelled';

export const getFilteredAppointmentList = (itemValue) => {
    if (isAllStatus(itemValue)) {
        return getAppointmentList();
    } else if (isDoneStatus(itemValue)) {
        return getDoneAppointmentList();
    } else if (isCancelledStatus(itemValue)) {
        return getCancelledAppointmentList();
    } else if (isPendingStatus(itemValue)) {
        return getPendingAppointmentList();
    }
    throw new Error('Status should be either ALL, DONE, CANCELLED or PENDING');
};

// change to cancel from pending from appointment

export const removeFromPendingAppointmentList = (id) => {
    getAppointmentFound(id).status = 'cancelled';
    return getPendingAppointmentList();
};

// add to appointment

export const addToAppointmentList = (user, doctor, date, time, purpose) => {
    const id = Math.max.apply(Math, appointmentList.map((appointment) => appointment.id));
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
    const appointmentFound = appointmentList.find((appointment) => appointment.id === id);
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

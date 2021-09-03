let offDayList = [{
    id: '1',
    doctor:'Doctor Bonab',
    startDate: '27/8/2020',
    endDate: '25/9/2020',
}, {
    id: '2',
    doctor:'Doctor Bonab',
    startDate: '30/8/2020',
    endDate: '30/9/2020',
}, {
    id: '3',
    doctor:'Doctor Bonab',
    startDate: '6/9/2020',
    endDate: '10/10/2020',
}, {
    id: '4',
    doctor:'Doctor Bonab',
    startDate: '11/10/2020',
    endDate: '20/10/2020',
}, {
    id: '5',
    doctor:'Doctor Bonab',
    startDate: '21/10/2020',
    endDate: '25/9/2020',
}, 
];
var doctorDefaultOffDay = 'Monday'

export const removeFromOffDayList = (id) => {
    offDayList = offDayList.filter((offDay) => {
        return offDay.id !== id;
    });
    return offDayList;
};

export const getOffDayList = () => {
    return offDayList;
};

export const setChangedDefaultOffDay = (defaultOffDay) => {
    doctorDefaultOffDay = defaultOffDay;
};

export const getDefaultOffDay = () => {
    return doctorDefaultOffDay;
};

export const addOffDayList = (doctor, startDate, endDate) => {
    const id = Math.max.apply(Math, offDayList.map((offDay) => offDay.id));
    const specificOffDay = {
        id: id + 1,
        doctor: doctor,
        startDate: startDate,
        endDate: endDate,
    };
    offDayList.push(specificOffDay);
};
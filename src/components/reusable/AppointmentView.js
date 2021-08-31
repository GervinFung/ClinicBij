import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import {isDoneStatus, isPendingStatus, isCancelledStatus} from '../../logic/tempAppointmentList';

const DONE = require('../../../img/appointmentStatus/done.jpg');
const CANCELLED = require('../../../img/appointmentStatus/cancelled.jpg');
const PENDING = require('../../../img/appointmentStatus/pending.jpg');

const appointmentStyles = StyleSheet.create({
    containerView: {
        width: '100%',
        padding: 10,
    },
    spaceBetweenView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    importantText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 17,
    },
    statusText: {
        fontStyle: 'italic',
    },
    image: {
        width: 50,
        height: 50,
    },
    centerView: {
        justifyContent: 'center',
    },
});

const UntouchableAppointmentView = ({status, index, onShowUnderlay, onHideUnderlay, date, time, doctor, purpose}) => {
    const getStatusImage = () => {
        if (isDoneStatus(status)) {
            return DONE;
        } else if (isCancelledStatus(status)) {
            return CANCELLED;
        } else if (isPendingStatus(status)) {
            return PENDING;
        }
        throw new Error('Status should be either DONE, CANCELLED or PENDING');
    };

    return (
        <TouchableHighlight
            key={index}
            style={appointmentStyles.containerView}
            onShowUnderlay={onShowUnderlay}
            onHideUnderlay={onHideUnderlay}
        >
            <View>
                <View style={appointmentStyles.spaceBetweenView}>
                    <View><Text style={appointmentStyles.importantText}>Appointment {index}</Text></View>
                    <View><Text style={appointmentStyles.importantText}>{date}</Text></View>
                </View>
                <View style={appointmentStyles.spaceBetweenView}>
                    <View style={appointmentStyles.centerView}>
                        <Text style={appointmentStyles.text}>{doctor}</Text>
                        <Text style={appointmentStyles.text}>{purpose}</Text>
                        <Text style={appointmentStyles.text}>{time}</Text>
                        <Text style={appointmentStyles.text}>Status: <Text style={appointmentStyles.statusText}>{status.toUpperCase()}</Text></Text>
                    </View>
                    <View style={appointmentStyles.centerView}>
                        <Image source={getStatusImage()} style={appointmentStyles.image}/>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const TouchableAppointmentView = ({status, index, onShowUnderlay, onHideUnderlay, onPress, date, time, doctor, purpose}) => {

    const getStatusImage = () => {
        if (isDoneStatus(status)) {
            return DONE;
        } else if (isCancelledStatus(status)) {
            return CANCELLED;
        } else if (isPendingStatus(status)) {
            return PENDING;
        }
        throw new Error('Status should be either DONE, CANCELLED or PENDING');
    };

    return (
        <TouchableOpacity
            key={index}
            style={appointmentStyles.containerView}
            onShowUnderlay={onShowUnderlay}
            onHideUnderlay={onHideUnderlay}
            onPress={onPress}
        >
            <View>
                <View style={appointmentStyles.spaceBetweenView}>
                    <View><Text style={appointmentStyles.importantText}>Appointment {index}</Text></View>
                    <View><Text style={appointmentStyles.importantText}>{date}</Text></View>
                </View>
                <View style={appointmentStyles.spaceBetweenView}>
                    <View style={appointmentStyles.centerView}>
                        <Text style={appointmentStyles.text}>{doctor}</Text>
                        <Text style={appointmentStyles.text}>{purpose}</Text>
                        <Text style={appointmentStyles.text}>{time}</Text>
                        <Text style={appointmentStyles.text}>Status: <Text style={appointmentStyles.statusText}>{status.toUpperCase()}</Text></Text>
                    </View>
                    <View style={appointmentStyles.centerView}>
                        <Image source={getStatusImage()} style={appointmentStyles.image}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export {UntouchableAppointmentView, TouchableAppointmentView};

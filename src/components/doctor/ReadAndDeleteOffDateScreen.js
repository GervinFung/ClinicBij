import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, Alert } from 'react-native';
import {getOffDayList, getDefaultOffDay, removeFromOffDayList} from '../../logic/tempOffDayList';
import {TouchableOffDayView} from '../reusable/OffDayView';
import HorinzontalLine from '../reusable/HorizontalLine';

const ReadAndDeleteOffDateScreen = ({ navigation }) => {

    const [offDayList, setOffDayList] = useState(getOffDayList());
    const [defaultOffDay, setDefaultOffDay] = useState(getDefaultOffDay());

    useEffect(() => {
        setOffDayList(getOffDayList());
        setDefaultOffDay(getDefaultOffDay());
    }, []);

    const onPress = (id) => {
        Alert.alert(`Delete Off Day Period ${id} Confirmation`, 'This action cannot be undone', [{
                text: 'Delete', style: 'cancel',
            }, {
                text: 'OK', onPress: () => {
                    setOffDayList(removeFromOffDayList(id));
                },
            },
        ]);
    };
    const GetFlatList = () => {
        if (offDayList.length === 0) {
            return (
                <View style={styles.centerView}>
                    <Text style={styles.noAppointmentMessage}>No Specific Off Days(s)</Text>
                </View>
            );
        }
        return (
            <FlatList
            data={offDayList}
            renderItem={({ item: offDay, separators }) => (
                <TouchableOffDayView
                    index={offDay.id}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}
                    doctor={offDay.doctor}
                    startDate={offDay.startDate}
                    endDate={offDay.endDate}
                    onPress={() => onPress(offDay.id)}
                />
            )}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageTextView}>
                <Image source={require('../../../img/doctor/readOffDate.jpg')} style={styles.image}/>
                <Text style={styles.text}>View Off Date</Text>
                <Text style={styles.OffDay}>Weekly off day: {defaultOffDay}</Text>
                <HorinzontalLine/>
                <Text style={styles.OffDay}>Specific Off Days</Text>
            </View>
            <GetFlatList/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    generalView: {
        padding: 4,
        paddingBottom: 7,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        padding: 4,
        paddingBottom: 7,
        width: '100%',
        flex: 1,
        backgroundColor: '#FEFEFE',
    },
    title: {
        color: '#000',
        fontSize: 30,
        paddingBottom: 10,
    },
    imageTextView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 70,
        height: 70,
    },
    pickerView: {
        color: '#121212',
        height: 30,
        width: 150,
        borderColor: 'black',
        borderWidth: 1,
    },
    centerBetweenView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 15,
    },
    OffDay: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 20,
    },
    text: {
        fontSize: 16,
    },
});

export default ReadAndDeleteOffDateScreen;

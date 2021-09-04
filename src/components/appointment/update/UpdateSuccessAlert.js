import {Alert} from 'react-native';

const alertSuccess = (navigation) => {
    Alert.alert('Update Completed', 'Your Appointment Has Been Updated Successfully', [{
            text: 'No', style: 'cancel',
        }, {
            text: 'Yes', onPress: () => {
                navigation.navigate('HomeScreen');
            },
        },
    ]);
};

export default alertSuccess;

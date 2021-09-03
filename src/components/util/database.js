import {openDatabase} from 'react-native-sqlite-storage';
import { Alert } from 'react-native';

export const db = openDatabase({name : 'clinic', location : 'default', createFromLocation : '~clinic.sqlite'},
    () => {
        console.log('Database OPENED');
    },
    (err) => {
        console.log(err);
    }
);

export const getUserData = async (uid) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM user WHERE user_id = ?', [uid], (_, results) => {
                if (results.rows.length > 0) {
                    resolve(results.rows.item(0));
                } else {
                    Alert.alert('Error: No such user');
                }
            });
        });
    });
};

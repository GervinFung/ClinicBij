import sqlite3

db = sqlite3.connect('clinic.sqlite')

db.execute('DROP TABLE IF EXISTS user')

db.execute('''CREATE TABLE user(
    uuid text PRIMARY KEY,
    fullName text NOT NULL,
    ic text NOT NULL,
    userType text NOT NULL
)''')

db.execute('DROP TABLE IF EXISTS appointment')

db.execute('''CREATE TABLE appointment(
    appointment_id integer PRIMARY KEY AUTOINCREMENT,
    patient_id text NOT NULL,
    doctor_id text NOT NULL,
    appointment_dateTime text NOT NULL,
    status text NOT NULL,
    purpose text NOT NULL,
    FOREIGN KEY(patient_id) REFERENCES user(uuid),
    FOREIGN KEY(doctor_id) REFERENCES user(uuid)
)''')

db.execute('DROP TABLE IF EXISTS doctorBlockDate')

db.execute('''CREATE TABLE doctorBlockDate(
    doctor_id text PRIMARY KEY,
    startDate text NOT NULL,
    endDate text NOT NULL,
    FOREIGN KEY(doctor_id) REFERENCES user(uuid)
)''')

db.execute('DROP TABLE IF EXISTS doctorOffDay')

db.execute('''CREATE TABLE doctorOffDay(
    doctor_id text PRIMARY KEY,
    offDay text NOT NULL,
    FOREIGN KEY(doctor_id) REFERENCES user(uuid)
)''')


cursor = db.cursor()
# prepopulate patient into user
patients = [
    ('HCXD7pvXdKVxSx0ZXsUMIZ0Utz53', 'July', '990617-14-1121', 'patient'),
    ('ObYeGFHVLXgjcGgJaYf3FLeu6cP2', 'Drakon', '000618-14-1222', 'patient'),
    ('YxwIkQ72lHf6KV62JDbfFE5tZBp2', 'Gervin', '000619-14-1323', 'patient'),
    ('vhsmG4aiSCUl2GrVTgV0wJyM0Ku2', 'RongSoon', '000620-14-1424', 'patient'),
    ('vRuUbKBKWZV6F360zRrNwEWCuoF3', 'Jane', '000621-14-1525', 'patient')
]
cursor.executemany('INSERT INTO user VALUES(?,?,?,?);', patients)


# prepopulate doctor into user
doctors = [
    ('TS72MUaf37SLfEV44Lcu2HX4cx42', 'Bonab', '950617-14-1327', 'doctor'),
    ('xY9Ip5FurKbt8wYNfGj1enj2rAa2', 'Sheeva', '900717-14-1422', 'doctor'),
    ('SBm2imDaJSbHHyEBUrnYr9j0sin1', 'Michael', '800817-14-2125', 'doctor'),
]
cursor.executemany('INSERT INTO user VALUES(?,?,?,?);', doctors)


# prepopulate appointment
appointments = [
    (1, 'HCXD7pvXdKVxSx0ZXsUMIZ0Utz53', 'TqHvxVPiMrV0hh3cqTp5A4bpbhu2', '10:30 16/09/2021', 'pending', 'heart condition'),
    (2, 'ObYeGFHVLXgjcGgJaYf3FLeu6cP2', '2rxtoVKmmaVTLW9JJcEO9B03v562', '11:00 16/09/2021', 'pending', 'skin disease'),
    (3, 'YxwIkQ72lHf6KV62JDbfFE5tZBp2', 'RPzHdkXSq5Y24tGyd8VOX5fKqII3', '12:00 21/09/2021', 'pending', 'face problem'),
    (4, 'vhsmG4aiSCUl2GrVTgV0wJyM0Ku2', '2rxtoVKmmaVTLW9JJcEO9B03v562', '13:00 18/09/2021', 'pending', 'back pain'),
    (5, 'vRuUbKBKWZV6F360zRrNwEWCuoF3', 'RPzHdkXSq5Y24tGyd8VOX5fKqII3', '14:00 17/09/2021', 'pending', 'coughing'),
    (6, 'vRuUbKBKWZV6F360zRrNwEWCuoF3', 'RPzHdkXSq5Y24tGyd8VOX5fKqII3', '14:40 26/09/2021', 'pending', 'lung problem')
]
cursor.executemany('INSERT INTO appointment VALUES(?,?,?,?,?,?);', appointments)


# prepopulate block date
block_date = [
    ('TqHvxVPiMrV0hh3cqTp5A4bpbhu2', '21/09/2021', '21/09/2021')
]
cursor.executemany('INSERT INTO doctorBlockDate VALUES(?,?,?);', block_date)

# prepopulate default off day
off_day = [
    ('TqHvxVPiMrV0hh3cqTp5A4bpbhu2', 'Monday'),
    ('2rxtoVKmmaVTLW9JJcEO9B03v562', 'Friday'),
    ('RPzHdkXSq5Y24tGyd8VOX5fKqII3', 'Sunday'),
]
cursor.executemany('INSERT INTO doctorOffDay VALUES(?,?);', off_day)

db.commit()
db.close()
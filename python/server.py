import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

DB = 'clinic.sqlite'

app = Flask(__name__)


#
# user
#

# get user
@app.route('/user/<id>', methods=['GET'])
def getUser(id):

    db = sqlite3.connect(path)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM user WHERE uuid = ?', (id,))
    rows = cursor.fetchone()

    print(rows)

    db.close()

    return jsonify(rows), 200

# update user
@app.route('/user/<id>', methods=['PUT'])
def updateUser(id):
    if not request.json:
        abort(400)

    if 'uuid' not in request.json:
        abort(400)

    update_user = (
        request.json['fullName'],
        id,
    )

    db = sqlite3.connect(path)
    cursor = db.cursor()

    cursor.execute('UPDATE user SET fullName=? WHERE uuid=?', update_user)

    db.commit()

    response = {
        'id': id,
        'affected': db.total_changes,
    }

    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(response), 201

# delete user
@app.route('/user/<id>', methods=['DELETE'])
def deleteUser(id):
    db = sqlite3.connect(path)
    cursor = db.cursor()

    cursor.execute('DELETE FROM user WHERE uuid = ?', id)

    db.commit()

    response = {
        'id': id,
        'affected': db.total_changes,
    }

    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(response), 201

# create user
@app.route('/user/<id>', methods=['POST'])
def createUser():
    if not request.json:
        abort(400)

    if 'uuid' not in request.json:
        abort(400)

    db = sqlite3.connect(path)
    cursor = db.cursor()

    user = {
        'uuid': request.json['uuid'],
        'fullName': request.json['fullName'],
        'ic': request.json['ic'],
        'userType': request.json['userType'],
    }

    cursor.execute('INSERT INTO user VALUES(?,?,?,?)', user)

    db.commit()

    response = {
        'id': id,
        'affected': db.total_changes,
    }

    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(response), 201


#
# appointment
#

# read appointment patient
@app.route('/patient/<id>/appointment', methods=['GET'])
def getAppointment(id):
    db = sqlite3.connect(path)
    cursor = db.cursor()
    command = '''SELECT a.appointment_id, a.appointment_dateTime, a.status, a.purpose, b.fullname 
             FROM appointment AS a, user AS b WHERE a.patient_id = ? AND a.doctor_id = b.uuid'''
    cursor.execute(command, (id,))
    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(rows), 200

# read appointment doctor
@app.route('/doctor/<id>/appointment', methods=['GET'])
def doctorGetAppointment(id):
    db = sqlite3.connect(path)
    cursor = db.cursor()
    command = '''SELECT a.appointment_id, a.appointment_dateTime, a.status, a.purpose, b.fullname 
    FROM appointment AS a, user AS b WHERE a.doctor_id = ? AND a.patient_id = b.uuid'''
    cursor.execute(command, (id,))
    rows = cursor.fetchall()

    print(rows)

    db.close()

    # rows_as_dict = []
    # for row in rows:
    #     row_as_dict = get_row_as_dict(row)
    #     rows_as_dict.append(row_as_dict)

    return jsonify(rows), 200

# create appointment
@app.route('/patient/<id>/appointment', methods=['PUT'])
def createAppointment(id):
    if not request.json:
        abort(400)

    if 'uuid' not in request.json:
        abort(400)

    db = sqlite3.connect(path)
    cursor = db.cursor()

    appointment = {
        'patient_id': request.json['patient_id'],
        'doctor_id': request.json['doctor_id'],
        'appointment_dateTime': request.json['appointment_dateTime'],
        'status': request.json['status'],
        'purpose': request.json['purpose'],
    }

    command = 'INSERT INTO appointment VALUES(?,?,?,?,?,?)'

    cursor.execute(command, appointment)

    response = {
        'id': id,
        'affected': db.total_changes,
    }

    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(rows), 200

# cancel appointment
@app.route('/cancelAppointment/<id>', methods=['PUT'])
def cancelAppointment(id):
    if not request.json:
        abort(400)

    if 'appointment_id' not in request.json:
        abort(400)

    cancel_appointment = (
        request.json['status'],
        id,
    )

    db = sqlite3.connect(path)
    cursor = db.cursor()

    cursor.execute('UPDATE appointment SET status=? WHERE appointment_id=?', cancel_appointment)

    db.commit()

    response = {
        'id': id,
        'affected': db.total_changes,
    }

    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(response), 201

# update appointment dateTime
@app.route('/appointment/<id>/update/dateTime', methods=['PUT'])
def updateAppointmentDateTime(id):
    if not request.json:
        abort(400)

    if 'appointment_id' not in request.json:
        abort(400)

    update_appointment_dateTime = (
        request.json['appointment_dateTime'],
        id,
    )

    db = sqlite3.connect(path)
    cursor = db.cursor()

    cursor.execute('UPDATE appointment SET appointment_dateTime=? WHERE appointment_id=?', update_appointment_dateTime)

    db.commit()

    response = {
        'id': id,
        'affected': db.total_changes,
    }

    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(response), 201

# update appointment doctor
@app.route('/appointment/<id>/update/doctor', methods=['PUT'])
def updateAppointmentDoctor(id):
    if not request.json:
        abort(400)

    if 'appointment_id' not in request.json:
        abort(400)

    update_appointment_doctor = (
        request.json['doctor_id'],
        id,
    )

    db = sqlite3.connect(path)
    cursor = db.cursor()

    cursor.execute('UPDATE appointment SET doctor_id=? WHERE appointment_id=?', update_appointment_doctor)

    db.commit()

    response = {
        'id': id,
        'affected': db.total_changes,
    }

    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(response), 201

# update appointment purpose
@app.route('/appointment/<id>/update/purpose', methods=['PUT'])
def updateAppointmentPurpose(id):
    if not request.json:
        abort(400)

    if 'appointment_id' not in request.json:
        abort(400)

    update_appointment_purpose = (
        request.json[purpose],
        id,
    )

    db = sqlite3.connect(path)
    cursor = db.cursor()

    cursor.execute('UPDATE appointment SET purpose=? WHERE appointment_id=?', update_appointment_purpose)

    db.commit()

    response = {
        'id': id,
        'affected': db.total_changes,
    }

    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(response), 201

#
# block dates
#

# add block date
@app.route('/blockDate/<id>/add', methods=['PUT'])
def addBlockDate(id):
    if not request.json:
        abort(400)

    if 'doctor_id' not in request.json:
        abort(400)

    add_block_date = {
        'doctor_id': request.json[doctor_id],
        'startDate': request.json[startDate],
        'endDate': request.json[endDate],
    }

    db = sqlite3.connect(path)
    cursor = db.cursor()

    cursor.execute('INSERT INTO doctorBlockDate VALUES(?,?,?);', add_block_date)

    db.commit()

    response = {
        'id': id,
        'affected': db.total_changes,
    }

    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(response), 201

# delete block date
@app.route('/blockDate/<id>/delete', methods=['DELETE'])
def deleteBlockDate(id):
    if not request.json:
        abort(400)

    if 'doctor_id' not in request.json:
        abort(400)

    delete_block_date = (
        request.json[doctor_id],
        request.json[startDate],
        request.json[endDate],
    )

    db = sqlite3.connect(path)
    cursor = db.cursor()

    cursor.execute('DELETE FROM doctorBlockDate WHERE doctor_id=? AND startDate=? AND endDate=?', delete_block_date)

    db.commit()

    response = {
        'id': id,
        'affected': db.total_changes,
    }

    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(response), 201

@app.route('/blockDate/<id>', methods=['GET'])
def getBlockedDate(id):
    db = sqlite3.connect(path)
    cursor = db.cursor()
    command = 'SELECT startDate, endDate FROM doctorBlockDate WHERE doctor_id = ?'
    cursor.execute(command, (id,))
    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(rows), 200

@app.route('/OffDay/<id>', methods=['GET'])
def getOffDay(id):
    db = sqlite3.connect(path)
    cursor = db.cursor()
    command = 'SELECT offDay FROM doctorOffDate WHERE doctor_id = ?'
    cursor.execute(command, (id,))
    rows = cursor.fetchone()

    print(rows)

    db.close()

    return jsonify(rows), 200

# update offday
@app.route('/OffDay/<id>', methods=['PUT'])
def updateOffDay(id):
    if not request.json:
        abort(400)

    if 'doctor_id' not in request.json:
        abort(400)

    update_offDay = (
        request.json['offDay'],
        id,
    )

    db = sqlite3.connect(path)
    cursor = db.cursor()

    cursor.execute('UPDATE doctorOffDay SET offDay=? WHERE doctor_id=?', update_offDay)

    db.commit()

    response = {
        'id': id,
        'affected': db.total_changes,
    }

    rows = cursor.fetchall()

    print(rows)

    db.close()

    return jsonify(response), 201


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=6000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)
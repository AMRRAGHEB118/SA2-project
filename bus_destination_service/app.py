from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import json

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_HEADERS"] = "Content-Type"

db_config = {
    "host": "bus_destination_db",
    "user": "root",
    "password": "123",
    "database": "bus_destination"
}

@app.route('/')
def index():
    return 'Hello, World!'

@app.get('/api/createTable')
def create_table():
    try:
        with mysql.connector.connect(**db_config) as connection:

            cursor = connection.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS bus_destinations (
                    Id INT PRIMARY KEY AUTO_INCREMENT,
                    DestinationName VARCHAR(255),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
                )
            """)

            connection.commit()
        return ({"message": "done"}, 201)
    except mysql.connector.Error as err:
        return f"Error connecting to database: {err}", 500

@app.route('/api/createDestination', methods=['POST'])
def create_destination():
    try:
        request_data = request.get_json()
        destination_name = request_data.get('destination_name')

        if not destination_name:
            return ({"message": "the destination name is required"} ,422)

        with mysql.connector.connect(**db_config) as connection:
            cursor = connection.cursor()

            insert_query = """
                INSERT INTO bus_destinations (destination_name)
                VALUES (%s)
            """
            cursor.execute(insert_query, (destination_name))

            connection.commit()

            get_query = "SELECT * FROM bus_destinations"
            cursor.execute(get_query)
            destinations = cursor.fetchone()

        return jsonify({"data": destinations}), 201
    
    except mysql.connector.Error as err:
        return jsonify({"messege": f"Error connecting to database: {err}"}), 500

@app.route('/api/updateDestination/<int:destination_id>', methods=['PUT'])
def update_destination(destination_id):
    try:
        request_data = request.get_json()
        destination_name = request_data.get('destination_name')
        appointments = json.dumps(request_data.get('appointments'))
        
        if not destination_name:
            return ({"message": "the destination name is required"} ,422)

        if not appointments:
            return ({"message": "the appointments are required"} ,422)

        with mysql.connector.connect(**db_config) as connection:
            cursor = connection.cursor()

            update_query = """
                UPDATE bus_destinations
                SET destination_name = %s, appointments = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """
            cursor.execute(update_query, (destination_name, appointments, destination_id))

            connection.commit()

            return jsonify({"message": "Destination updated successfully"}), 200
        
    except mysql.connector.Error as err:
        return jsonify({"error": f"Error updating destination: {err}"}), 500

@app.get('/api/getDestinations')
def get_destinations():
    try:
        with mysql.connector.connect(**db_config) as connection:
            cursor = connection.cursor()

            cursor.execute("SELECT * FROM bus_destinations ")  

            data = cursor.fetchall()

        formatted_data = []
        for row in data:
            formatted_data.append({
                'id': row[0],
                'destination_name': row[1],
                'created_at': row[2],  
                'appointments': json.loads(row[3]),
                'updated_at': row[4] if row[4] else None  # Convert to ISO format or None
            })


        return jsonify({"data": formatted_data}), 200
    
    except mysql.connector.Error as err:
        return f"Error connecting to database: {err}"

@app.route('/api/deleteDestination/<int:destination_id>', methods=['DELETE'])
def delete_destination(destination_id):
    try:
        with mysql.connector.connect(**db_config) as connection:
            cursor = connection.cursor()
            check_query = "SELECT id FROM bus_destinations WHERE id = %s"
            cursor.execute(check_query, (destination_id,))
            existing_id = cursor.fetchone()

            if not existing_id:
                return jsonify({"message": "Destination ID not found"}), 404

            delete_query = "DELETE FROM bus_destinations WHERE id = %s"
            cursor.execute(delete_query, (destination_id,))
            connection.commit()



            return jsonify({"message": "Destination deleted successfully"}), 200
        
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error deleting destination: {err}"}), 500

@ app.errorhandler(500)
def server_error(error):
    return ({"message": "Something went wrong on the server"}, 500)

@ app.errorhandler(404)
def server_error(error):
    return ({"message": "this api is not supported"}, 404)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
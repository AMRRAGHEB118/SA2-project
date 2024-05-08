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
        destination = request.args.get('destination')

        if not destination:
            return ({"message": "the destination name is required"} ,422)

        with mysql.connector.connect(**db_config) as connection:
            cursor = connection.cursor()

            insert_query = """
                INSERT INTO bus_destinations (DestinationName)
                VALUES (%s)
            """
            cursor.execute(insert_query, (destination,))

            connection.commit()

            get_query = "SELECT * FROM bus_destinations"
            cursor.execute(get_query)
            destinations = cursor.fetchall()

            destinations_list = []
            for destination in destinations:
                destination_dict = {
                    "id": destination[0],
                    "destinationName": destination[1]
                }
                destinations_list.append(destination_dict)

        return destinations_list, 201
    
    except mysql.connector.Error as err:
        return jsonify({"messege": f"Error connecting to database: {err}"}), 500
    except Exception as err:
        return jsonify({"messege": f"Error connecting to database: {err}"}), 500

@app.route('/api/updateDestination/<int:destination_id>', methods=['PUT'])
def update_destination(destination_id):
    try:
        request_data = request.get_json()
        destination_name = request_data.get('destination')
        
        if not destination_name:
            return ({"message": "the destination name is required"} ,422)


        with mysql.connector.connect(**db_config) as connection:
            cursor = connection.cursor()

            update_query = """
                UPDATE bus_destinations
                SET DestinationName = %s, updated_at = CURRENT_TIMESTAMP
                WHERE Id = %s
            """
            cursor.execute(update_query, (destination_name, destination_id))

            connection.commit()

            get_query = "SELECT * FROM bus_destinations"
            cursor.execute(get_query)
            destinations = cursor.fetchall()

            destinations_list = []
            for destination in destinations:
                destination_dict = {
                    "id": destination[0],
                    "destinationName": destination[1]
                }
                destinations_list.append(destination_dict)

        return destinations_list, 200
        
    except mysql.connector.Error as err:
        return jsonify({"error": f"Error updating destination: {err}"}), 500

@app.get('/api/getDestinations')
def get_destinations():
    try:
        with mysql.connector.connect(**db_config) as connection:
            cursor = connection.cursor()

            cursor.execute("SELECT * FROM bus_destinations")  

            data = cursor.fetchall()

        destinations_list = []
        for destination in data:
            destination_dict = {
                "id": destination[0],
                "destinationName": destination[1]
            }
            destinations_list.append(destination_dict)

        return destinations_list, 200
    
    except mysql.connector.Error as err:
        return jsonify({"message": f"Error connecting to database: {err}"}), 500

@app.route('/api/deleteDestination/<int:destination_id>', methods=['DELETE'])
def delete_destination(destination_id):
    try:
        with mysql.connector.connect(**db_config) as connection:
            cursor = connection.cursor()
            check_query = "SELECT Id FROM bus_destinations WHERE Id = %s"
            cursor.execute(check_query, (destination_id,))
            existing_id = cursor.fetchone()

            if not existing_id:
                return jsonify({"message": "Destination ID not found"}), 404

            delete_query = "DELETE FROM bus_destinations WHERE Id = %s"
            cursor.execute(delete_query, (destination_id,))
            connection.commit()

            get_query = "SELECT * FROM bus_destinations"
            cursor.execute(get_query)
            destinations = cursor.fetchall()

            destinations_list = []
            for destination in destinations:
                destination_dict = {
                    "id": destination[0],
                    "destinationName": destination[1]
                }
                destinations_list.append(destination_dict)

        return destinations_list, 200
        
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
from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')  # Enable CORS for requests from http://localhost:3000

# Load the trained models
with open('rf_model_failure.pkl', 'rb') as f:
    rf_model_target = pickle.load(f)

with open('rf_model_target.pkl', 'rb') as f:
    rf_model_failure = pickle.load(f)

# Define a function to process user input and make predictions
def predict(Type, Air_temperature_K, Process_temperature_K, Rotational_speed_rpm, Torque_Nm, Tool_wear_min):
    # Create a DataFrame with user input
    data = {'Type': [Type],
            'Air temperature [K]': [float(Air_temperature_K)],
            'Process temperature [K]': [float(Process_temperature_K)],
            'Rotational speed [rpm]': [float(Rotational_speed_rpm)],
            'Torque [Nm]': [float(Torque_Nm)],
            'Tool wear [min]': [float(Tool_wear_min)]}
    df = pd.DataFrame(data)

    print(f"Processed user features: {df}")

    # Predict for Target
    target_prediction = rf_model_target.predict(df)

    # Predict for Failure Type
    failure_prediction = rf_model_failure.predict(df)

    return target_prediction[0], failure_prediction[0]

# Define route for prediction
@app.route('/predict', methods=['POST'])
def predict_result():
    if request.method == 'POST':
        try:
            data = request.json  # Extract JSON data

            # Extract data from JSON
            Type = data['Type']
            Air_temperature_K = data['Air_temperature_K']
            Process_temperature_K = data['Process_temperature_K']
            Rotational_speed_rpm = data['Rotational_speed_rpm']
            Torque_Nm = data['Torque_Nm']
            Tool_wear_min = data['Tool_wear_min']

            # Get predictions
            target_prediction, failure_prediction = predict(Type, Air_temperature_K, Process_temperature_K, Rotational_speed_rpm, Torque_Nm, Tool_wear_min)

            # Return predictions as JSON response
            return jsonify({
                
                'target_prediction': int(target_prediction),  # Convert to int if needed
                'failure_prediction': int(failure_prediction)  # Convert to int if needed
            })
        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)


# import necessary libraries
# from flask import Flask, request, jsonify
# import pickle
# import pandas as pd
# import mysql.connector
# from flask_cors import CORS

# # Load the trained models
# with open('rf_model_failure.pkl', 'rb') as f:
#     rf_model_failure = pickle.load(f)

# with open('rf_model_target.pkl', 'rb') as f:
#     rf_model_target = pickle.load(f)

# # Initialize Flask app and enable CORS
# app = Flask(__name__)
# CORS(app, origins='http://localhost:3000')  # Enable CORS for requests from http://localhost:3000

# # MySQL connection setup
# conn = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="",
#     database="pdm"
# )
# cursor = conn.cursor()

# # Define a function to process user input, make predictions, and store results in the database
# def predict_store(Type, Air_temperature_K, Process_temperature_K, Rotational_speed_rpm, Torque_Nm, Tool_wear_min):
#     # Create a DataFrame with user input
#     data = {
#         'Type': [Type],
#         'Air_temperature_K': [float(Air_temperature_K)],
#         'Process_temperature_K': [float(Process_temperature_K)],
#         'Rotational_speed_rpm': [float(Rotational_speed_rpm)],
#         'Torque_Nm': [float(Torque_Nm)],
#         'Tool_wear_min': [float(Tool_wear_min)]
#     }
#     df = pd.DataFrame(data)

#     print(f"Processed user features: {df}")

#     # Predict for Target
#     target_prediction = rf_model_target.predict(df)

#     # Predict for Failure Type
#     failure_prediction = rf_model_failure.predict(df)

#     # Store input variables and predictions in the database
#     query = "INSERT INTO predictions (Type, Air_temperature_K, Process_temperature_K, Rotational_speed_rpm, Torque_Nm, Tool_wear_min, target_prediction, failure_prediction) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
#     cursor.execute(query, (
#         Type,
#         Air_temperature_K,
#         Process_temperature_K,
#         Rotational_speed_rpm,
#         Torque_Nm,
#         Tool_wear_min,
#         int(target_prediction[0]),
#         int(failure_prediction[0])
#     ))
#     conn.commit()

#     return int(target_prediction[0]), int(failure_prediction[0])

# # Define route for prediction
# @app.route('/predict', methods=['POST'])
# def predict_result():
#     if request.method == 'POST':
#         try:
#             data = request.json  # Extract JSON data

#             # Extract data from JSON
#             Type = data['Type']
#             Air_temperature_K = data['Air_temperature_K']
#             Process_temperature_K = data['Process_temperature_K']
#             Rotational_speed_rpm = data['Rotational_speed_rpm']
#             Torque_Nm = data['Torque_Nm']
#             Tool_wear_min = data['Tool_wear_min']

#             # Get predictions and store results in the database
#             target_prediction, failure_prediction = predict_store(Type, Air_temperature_K, Process_temperature_K, Rotational_speed_rpm, Torque_Nm, Tool_wear_min)

#             # Return predictions as JSON response
#             return jsonify({
#                 'target_prediction': target_prediction,
#                 'failure_prediction': failure_prediction
#             })
#         except Exception as e:
#             return jsonify({'error': str(e)})

# if __name__ == '__main__':
#     app.run(debug=True)

# job_recommendation.py
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from flask import Flask, request, jsonify

# Load job dataset (you need to provide a dataset)
job_data = pd.read_csv('job_dataset.csv')  # Replace with your dataset path

# Extract necessary columns (e.g., job title, category, location)
job_data = job_data[['job_title', 'category', 'location', 'skills_required']]

# Use a simple encoding for demonstration
job_data['category_code'] = job_data['category'].astype('category').cat.codes
job_data['location_code'] = job_data['location'].astype('category').cat.codes

# NearestNeighbors model
nn_model = NearestNeighbors(n_neighbors=5, algorithm='auto')
nn_model.fit(job_data[['category_code', 'location_code']])

# Flask app
app = Flask(__name__)

@app.route('/recommend_jobs', methods=['POST'])
def recommend_jobs():
    user_data = request.json
    user_location = user_data.get('location')
    user_category = user_data.get('category')

    # Convert to codes
    user_location_code = job_data['location'].astype('category').cat.categories.get_loc(user_location)
    user_category_code = job_data['category'].astype('category').cat.categories.get_loc(user_category)

    # Find the nearest jobs
    distances, indices = nn_model.kneighbors([[user_category_code, user_location_code]])
    recommendations = job_data.iloc[indices[0]].to_dict(orient='records')

    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(port=5001, debug=True)

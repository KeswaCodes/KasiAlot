# ai_api.py
from flask import Flask, request, jsonify
from job_recommendation import recommend_jobs

app = Flask(__name__)

@app.route('/api/recommend_jobs', methods=['POST'])
def recommend_jobs_api():
    user_id = request.json['user_id']
    recommended_jobs = recommend_jobs(user_id)
    return jsonify(recommended_jobs.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(port=5001)
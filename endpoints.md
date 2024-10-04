# Endpoints

## Register a User
### POST /api/users/register

```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "location": "New York",
        "skills": ["JavaScript", "Node.js","MongoDB"],
        "contactNumber": "1234567890"
    }
```

## Get User Profile
### GET /api/users/profile/:email
    - Replace :email with the user's email. Use a GET request.


##  Update User Profile
### PUT /api/users/profile/:email

- Replace :email with the user's email. Use a PUT request.

```json
    {
        "name": "John Doe",
        "location": "San Francisco",
        "skills": ["JavaScript", "Node.js"],
        "contactNumber": "0987654321"
    }
```

## Post a Job/Task
### POST /api/tasks

```json
    {
        "taskName": "Windows",
        "compensation": 500,
        "description": "Clean my windows.",
        "location": "Remote",
        "userEmail": "john.doe@example.com"
    }
```

## Get All Jobs/Tasks
### GET /api/tasks

## Get Jobs/Tasks by User
### GET /api/tasks/user/:userEmail

## Accept a Task
### PUT /api/tasks/:taskId/accept

```json
    {
        "userEmail": "jane.doe@example.com"
    }
```

## Register Workers
### POST /api/workers/register

```json
    {
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "skills": ["Plumbing", "Carpentry"],
    "contactNumber": "1234567890"
    }
```
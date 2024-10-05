# Endpoints

## Register a User
### POST /api/users/register

```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phoneNumber": "+1234567890",
    "password": "securePassword123"
}
```

##  Update User Profile
### POST api/users/login


```json
{
    "email": "johndoe@example.com",
    "password": "securePassword123"
}

```

### POST /api/posts

```json
{
    "title": "Late Delivery",
    "content": "The delivery was two days late.",
    "username": "john_doe",  // Username instead of userId
    "postType": "complaint",
    "nature": "Delivery Issue"
}


{
    "title": "Great Customer Service",
    "content": "The customer service was excellent!",
    "username": "jane_doe",  // Username instead of userId
    "postType": "review",
    "nature": "Customer Service"
}
```
<!-- 
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
``` -->
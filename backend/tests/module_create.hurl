POST http://localhost:8000/login
{
  "email": "test@iu.edu",
  "password": "test"
}
HTTP 200
[Asserts]
jsonpath "$.access_token" exists
[Captures]
access_token: jsonpath "$.access_token"

POST http://localhost:8000/module/create
Authorization: Bearer {{access_token}}
{
    "course_id": 102,
    "module_name": "Module 2"
}
HTTP 200
[Asserts]
jsonpath "$.status" exists
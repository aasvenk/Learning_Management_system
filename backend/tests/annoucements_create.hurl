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


POST http://localhost:8000/announcements/create
Authorization: Bearer {{access_token}}
{
  "courseId": "1",
  "title": "title",
  "description": "this is announcement description"
}
HTTP 200
[Asserts]
jsonpath "$.status" exists
POST http://localhost:8000/login
{
  "email": "student@iu.edu",
  "password": "acnnn@student"
}
HTTP 200
[Asserts]
jsonpath "$.access_token" exists
[Captures]
access_token: jsonpath "$.access_token"

GET http://localhost:8000/chatRooms/all
Authorization: Bearer {{access_token}}
HTTP 200
[Asserts]
jsonpath "$.course_rooms" exists
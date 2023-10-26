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

GET http://localhost:8000/course/102/getmodule
Authorization: Bearer {{access_token}}
HTTP 200
[Asserts]





POST http://localhost:8000/login
{
  "email": "test",
  "password": "test"
}
HTTP 200
[Asserts]
jsonpath "$.access_token" exists
[Captures]
access_token: jsonpath "$.access_token"

GET http://localhost:8000/userInfo
Authorization: Bearer {{access_token}}
HTTP 200
[Asserts]
jsonpath "$.userInfo" exists
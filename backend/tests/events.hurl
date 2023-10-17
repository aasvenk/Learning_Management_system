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

POST http://localhost:8000/events/101
Authorization: Bearer {{access_token}}
{
  "q_date": "2023-08-22"
}
HTTP 200
[Asserts]
jsonpath "$.events" exists
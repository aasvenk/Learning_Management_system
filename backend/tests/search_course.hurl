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

POST http://localhost:8000/search/course
Authorization: Bearer {{access_token}}
{
  "search": "Applied",
  "searchParam": "course_name"
}
HTTP 200
[Asserts]
jsonpath "$.searchResults" exists
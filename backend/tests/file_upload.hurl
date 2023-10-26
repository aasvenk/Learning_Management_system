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

POST http://localhost:8000/upload
Authorization: Bearer {{access_token}}
[MultipartFormData]
target: module
file: file,sample.pdf;
HTTP 200

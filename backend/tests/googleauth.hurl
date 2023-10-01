GET http://localhost:8000/auth/google
HTTP 200
[Asserts]
jsonpath "$.auth_url" exists
[Captures]
auth_url: jsonpath "$.auth_url"

#GET {{auth_url}}
#HTTP 200
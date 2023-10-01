POST http://localhost:8000/recoverPassword
{
  "type": "using_email",
  "email": "srvemu@iu.edu"
}
HTTP 200
[Asserts]
jsonpath "$.reset_url" exists
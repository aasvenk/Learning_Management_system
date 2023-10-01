POST http://localhost:8000/recoverPassword
{
  "type": "using_security_question",
  "email": "srvemu@iu.edu",
  "security_answer": "test"
}
HTTP 200
[Asserts]
jsonpath "$.reset_url" exists
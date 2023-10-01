POST http://localhost:8000/register
{
  "email": "srvemu@iu.edu",
  "password": "test",
  "password2": "test",
  "firstName": "Nikhil",
  "lastName": "Vemula",
  "secQuestion": "What is your birth city?",
  "secAnswer": "test"
}

HTTP 200
[Asserts]
jsonpath "$.msg" == "user created"
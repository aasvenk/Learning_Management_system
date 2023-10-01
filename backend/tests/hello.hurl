GET http://localhost:8000/

HTTP 200
[Asserts]
jsonpath "$.status" == "RUNNING"
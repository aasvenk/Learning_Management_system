
function Login() {
  return (
    <div className="App">
      <header className="App-header">
      <h1> Login Page</h1> 
        <form> 
          <div id = "Login">  
            <label> 
              Username: <br></br>
              <input type = "text" id ="username" Placeholder = "Enter your Username"/>
              </label> 
            </div>
            <label>
            Password: 
            </label>
            <br></br>
            <input type = 'password' id = "password" Placeholder ="Enter your Password"/>
            <label> <br></br></label>
            <input type ='Submit' id = "Submit" value = "Submit"  />
        </form>
      </header>
    </div>
  );
}

export default Login;

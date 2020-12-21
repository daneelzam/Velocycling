const loginForm = document.forms.logInForm

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const {action, method, username: {value: username}, password: {value: password}} = e.target;
  const response = await fetch(action, {
    method,
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({username, password})
  });
  const data = await response.json();
 
    switch (data.typeError) {
      case 'username':
        e.target.username.value = ''
        e.target.username.placeholder = data.message
        break;

      case 'password':
        e.target.password.value = ''
        e.target.password.placeholder = data.message
        break;
    
      default:
        window.location.href = '/authorization/dashboard' 
        break;
    }
  
})

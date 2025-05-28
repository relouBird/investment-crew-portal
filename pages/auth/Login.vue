
<template>
  <div class="auth-container">
    <div class="title">
      <h2>Welcome Back!</h2>
      <p>Login with your information to continue.</p>
    </div>
    
    <form class="form">
      <div class="input">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Email Address" />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Password" />
      </div>
      <div class="login">
        <button type="submit">Login</button>
      </div>
    </form>
    
    <div class="end">
      <p>Dont't have account ? <a href="/auth/register">Sign In</a></p>
    </div>
  </div>
</template>

<style scoped>

.auth-container {
  width: 100%;
}

.title {
  margin-bottom: 2rem;
  text-align: center;
}

h2 {
  margin-bottom: 0.5rem;
}

.title p {
  color: #6b7280;
  font-size: 0.95em;
}

.form {
  width: 100%;
}

.input {
  margin-bottom: 1.5rem;
}

.input label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.95em;
}

.input input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  transition: border-color 0.3s;
}

.input input:focus {
  border-color: #1E3A8A;
  outline: none;
}

.login button {
  width: 100%;
  padding: 0.75rem;
  background-color: #1E3A8A;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login button:hover {
  background-color: #1E3A8A;
}

.end {
  margin-top: 1.5rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.95em;
}

.end a {
  color: #1E3A8A;
  text-decoration: none;
}

.end a:hover {
  text-decoration: underline;
}
</style>

<template>
  <div class="auth-container">
    <div class="title">
      <h2>Let's Register</h2>
      <p>Add your personal information to continue.</p>
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
      <!-- <div class="input">
        <label for="name">Nom</label>
        <div class="inp">
          <input type="text" id="name" placeholder="First Name" />
          <input type="text" id="name" placeholder="Last Name" />
        </div>
      </div> -->
      <div class="input">
        <label for="password">Confirm Password</label>
        <input type="password" id="confirmpassword" placeholder="Confirm Password" />
      </div>
      <div class="login">
        <button type="submit">Login</button>
      </div>
    </form>

    <div class="end">
      <p>Already have account ? <a href="/auth/login">Sign In</a></p>
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
  margin-bottom: 1.2rem;
}

.input:nth-child(2) .inp{
    display: flex;
    gap: 0.5em;
}
.input:nth-child(2) .inp input{
    padding: 0.75em 0.5em 0.75em 1em;
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

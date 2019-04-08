class UserService {

  static getUser(email, password) {
    return fetch("http://localhost:3030/users/login", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      method: "POST",
      body: JSON.stringify({email, password})
    })
      .then(res => res.json());
  }
}

export default UserService;
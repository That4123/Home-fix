// Sử dụng class để tạo module user
class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  // Phương thức của user
  displayInfo() {
    console.log(`Username: ${this.username}, Email: ${this.email}`);
  }
}

// Sử dụng module user
const user1 = new User("john_doe", "john@example.com");
user1.displayInfo();

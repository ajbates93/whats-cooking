package auth

import "golang.org/x/crypto/bcrypt"

type User struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

func LoadTestUser() *User {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("password"), 8)
	return &User{Password: string(hashedPassword), Username: "ajbates93"}
}

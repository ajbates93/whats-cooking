package handler

import (
	"net/http"
	"whats-cooking/pkg/auth"

	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func SignIn(c echo.Context) error {
	// Load our test user
	storedUser := auth.LoadTestUser()

	// Initiate a new User struct
	u := new(auth.User)

	// Parse the submitted data and fill the user struct with the data from the form
	if err := c.Bind(u); err != nil {
		data := map[string]interface{}{
			"message": err.Error(),
		}
		return c.JSON(http.StatusInternalServerError, data)
	}

	// Compare the stored hashed password with the hashed version of the password that was received
	if err := bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(u.Password)); err != nil {
		// If the two passwords don't match, return a 401
		data := map[string]interface{}{
			"message": "Invalid username or password",
		}

		return c.JSON(http.StatusUnauthorized, data)
	}

	// If password is correct, generate tokens and set cookies
	err := auth.GenerateTokensAndSetCookies(storedUser, c)

	if err != nil {
		data := map[string]interface{}{
			"message": err.Error(),
		}
		return c.JSON(http.StatusUnauthorized, data)
	}

	// Return a 200 status code and a success message
	data := map[string]interface{}{
		"message": "Successfully signed in",
	}
	return c.JSON(http.StatusOK, data)

}

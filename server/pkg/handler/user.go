package handler

import (
	"net/http"
	"whats-cooking/pkg/database"
	"whats-cooking/pkg/model"

	"github.com/labstack/echo/v4"
)

func GetUsers(c echo.Context) error {
	u := new([]model.User)
	db := database.DB()
	if res := db.Find(&u); res.Error != nil {
		data := map[string]interface{}{
			"message": res.Error.Error(),
		}
		return c.JSON(http.StatusInternalServerError, data)
	}

	response := map[string]interface{}{
		"data": u,
	}

	return c.JSON(http.StatusOK, response)
}
func GetUserByID(c echo.Context) error {
	id := c.Param("id")
	u := new(model.User)
	db := database.DB()
	if res := db.First(&u, "id = ?", id); res.Error != nil {
		data := map[string]interface{}{
			"message": res.Error.Error(),
		}
		return c.JSON(http.StatusInternalServerError, data)
	}

	response := map[string]interface{}{
		"data": u,
	}

	return c.JSON(http.StatusOK, response)
}

func CreateUser(c echo.Context) error {
	u := new(model.User)
	if err := c.Bind(u); err != nil {
		data := map[string]interface{}{
			"message": err.Error(),
		}
		return c.JSON(http.StatusBadRequest, data)
	}

	db := database.DB()
	// Check to see if user already exists with the given email or username or both
	var user model.User
	if res := db.Where("email = ? OR username = ?", u.Email, u.Username).First(&user); res.Error == nil {
		data := map[string]interface{}{
			"message": "User already exists with the given email or username",
		}

		return c.JSON(http.StatusBadRequest, data)
	}

	// Create the user
	if res := db.Create(&u); res.Error != nil {
		data := map[string]interface{}{
			"message": res.Error.Error(),
		}
		return c.JSON(http.StatusInternalServerError, data)
	}

	response := map[string]interface{}{
		"data": u,
	}

	return c.JSON(http.StatusOK, response)
}

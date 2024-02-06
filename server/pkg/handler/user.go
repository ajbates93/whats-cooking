package handler

import (
	"net/http"
	"whats-cooking/pkg/database"
	"whats-cooking/pkg/model"

	"github.com/labstack/echo/v4"
)

func CreateUser(c echo.Context) error {
	u := new(model.User)
	if err := c.Bind(u); err != nil {
		data := map[string]interface{}{
			"message": err.Error(),
		}
		return c.JSON(http.StatusBadRequest, data)
	}

	db := database.DB()
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

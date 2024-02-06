package router

import (
	"whats-cooking/pkg/handler"

	"github.com/labstack/echo/v4"
)

func NewRouter(e *echo.Echo) {
	e.GET(("/"), func(c echo.Context) error {
		return c.JSON(200, map[string]interface{}{
			"message": "Hello, World!",
		})
	})

	// Users
	e.POST("/users", handler.CreateUser)

	// Meals
	e.GET("/meals?start_date=:start_date&end_date=:end_date", handler.GetMealsFromDateRange)
	e.POST("/meals", handler.CreateMeal)
}

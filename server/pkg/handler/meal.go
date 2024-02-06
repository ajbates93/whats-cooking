package handler

import (
	"net/http"
	"whats-cooking/pkg/database"
	"whats-cooking/pkg/model"

	"github.com/labstack/echo/v4"
)

func GetMealsFromDateRange(c echo.Context) error {
	// Get the start and end date from the query parameters
	startDate := c.QueryParam("start_date")
	endDate := c.QueryParam("end_date")
	// Get the database connection
	db := database.DB()

	// Create a slice of meals to store the results
	var meals []model.Meal
	// Query the database for meals within the date range
	if res := db.Find(&meals, "date BETWEEN ? and ?", startDate, endDate); res.Error != nil {
		// If there is an error, return a 500 status code and an error message
		data := map[string]interface{}{
			"message": res.Error.Error(),
		}
		return c.JSON(http.StatusInternalServerError, data)
	}

	// Return the meals as a JSON response
	response := map[string]interface{}{
		"data": meals,
	}

	return c.JSON(http.StatusOK, response)

}

// Create a new meal. If the day table has no day with the given date, create a new day.
func CreateMeal(c echo.Context) error {
	mr := new(model.MealRequest)
	// Get the database connection
	db := database.DB()

	if err := c.Bind(&mr); err != nil {
		// If there is an error, return a 400 status code and an error message
		data := map[string]interface{}{
			"message": err.Error(),
		}
		return c.JSON(http.StatusBadRequest, data)
	}

	// If day table has no day with the given date, create a new day
	var day model.Day
	if res := db.Where("date = ?", mr.Date).First(&day); res.Error != nil {
		// Create the day if it doesn't exist
		day = model.Day{Date: mr.Date}
		if err := db.Create(&day).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]interface{}{
				"message": err.Error(),
			})
		} else if res.Error != nil {
			// If there is an error, return a 500 status code and an error message
			data := map[string]interface{}{
				"message": res.Error.Error(),
			}
			return c.JSON(http.StatusInternalServerError, data)
		}
	}

	// Create a new meal
	meal := model.Meal{
		Type:        mr.Type,
		Name:        mr.Name,
		DayID:       day.ID,
		Ingredients: mr.Ingredients,
	}

	// Save the meal to the database
	if err := db.Create(&meal).Error; err != nil {
		data := map[string]interface{}{
			"message": err.Error(),
		}
		return c.JSON(http.StatusInternalServerError, data)
	}

	return c.JSON(http.StatusCreated, meal)

}

package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID           uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
	Username     string
	Email        string
	PasswordHash string
}

type Meal struct {
	gorm.Model
	Type        string
	Name        string
	Ingredients []Ingredient `gorm:"foreignKey:MealID"`
	DayID       uint
}

type MealRequest struct {
	Type        string       `json:type`
	Name        string       `json:name`
	Date        time.Time    `json:date`
	Ingredients []Ingredient `json:ingredients`
}

type Ingredient struct {
	gorm.Model
	Name   string
	MealID uint
}

type Day struct {
	gorm.Model
	Date   time.Time
	Meals  []Meal `gorm:"foreignKey:DayID"`
	UserID uint
}

type ShoppingList struct {
	gorm.Model
	UserID      uint
	Ingredients []Ingredient `gorm:"many2many:shopping_list_ingredients;"`
}

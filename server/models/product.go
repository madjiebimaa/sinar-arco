package models

import (
	"time"
)

type Product struct {
	ID        string    `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" gorm:"type:varchar(200); not null"`
	Price     uint      `json:"price" gorm:"not null"`
	Quantity  uint      `json:"quantity" gorm:"not null"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

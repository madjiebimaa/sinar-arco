package models

import "time"

type User struct {
	ID        string    `json:"id" gorm:"primaryKey"`
	FirstName string    `json:"first_name" gorm:"type:varchar(200); not null"`
	LastName  string    `json:"last_name" gorm:"type:varchar(200)"`
	UserName  string    `json:"user_name" gorm:"type:varchar(200); unique; not null"`
	Email     string    `json:"email" gorm:"type:varchar(200); unique; not null"`
	Password  string    `json:"password" gorm:"type:varchar(1000); not null"`
	CreatedAt time.Time `json:"created_at"`
}

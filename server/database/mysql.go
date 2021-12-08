package database

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/madjiebimaa/sinar-arco/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewGorm() *gorm.DB {

	if err := godotenv.Load(".env"); err != nil {
		panic("failed to get environment variables")
	}

	mysqlUser := os.Getenv("MYSQL_USER")
	mysqlPassword := os.Getenv("MYSQL_PASSWORD")
	mysqlHost := os.Getenv("MYSQL_HOST")
	mysqlPort := os.Getenv("MYSQL_PORT")
	mysqlDatabase := os.Getenv("MYSQL_DATABASE")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", mysqlUser, mysqlPassword, mysqlHost, mysqlPort, mysqlDatabase)
	orm, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect Gorm MySQL database")
	}

	if err = orm.AutoMigrate(&models.User{}, &models.Product{}); err != nil {
		panic(err)
	}

	fmt.Println("PONG MYSQL")

	return orm
}

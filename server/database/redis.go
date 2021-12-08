package database

import (
	"fmt"
	"os"
	"strconv"

	"github.com/gofiber/storage/redis"
	"github.com/joho/godotenv"
)

func NewRedis() *redis.Storage {

	if err := godotenv.Load(".env"); err != nil {
		panic("failed to get environment variables")
	}

	redisHost := os.Getenv("REDIS_HOST")
	redisPort, _ := strconv.Atoi(os.Getenv("REDIS_PORT"))

	rdb := redis.New(redis.Config{
		Host:     redisHost,
		Port:     redisPort,
		Username: "",
		Password: "",
		Database: 0,
		Reset:    false,
	})

	fmt.Println("PONG REDIS")

	return rdb
}

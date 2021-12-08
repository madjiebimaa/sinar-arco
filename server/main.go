package main

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/gofiber/utils"
	"github.com/madjiebimaa/sinar-arco/database"
	"github.com/madjiebimaa/sinar-arco/helpers"
	"github.com/madjiebimaa/sinar-arco/models"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	app := fiber.New()

	orm := database.NewGorm()
	rdb := database.NewRedis()
	store := session.New(session.Config{
		Storage:        rdb,
		Expiration:     24 * time.Hour,
		KeyLookup:      "cookie:session_id",
		CookieHTTPOnly: true,
		CookieSecure:   false, // if in production change this to true
		KeyGenerator:   utils.UUID,
	})
	defer store.Storage.Close()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowCredentials: true,
	}))

	app.Post("/api/users/register", func(c *fiber.Ctx) error {
		now := time.Now()
		sess, err := store.Get(c)
		if err != nil {
			return helpers.WebResponseFail(c, now, fiber.StatusInternalServerError, "session", err.Error())
		}

		userRequest := models.User{}
		if err := c.BodyParser(&userRequest); err != nil {
			return helpers.WebResponseFail(c, now, fiber.StatusBadRequest, "request input", err.Error())
		}

		user := models.User{}
		orm.First(&user, "user_name = ?", userRequest.UserName)
		if len(user.ID) != 0 {
			return helpers.WebResponseFail(c, now, fiber.StatusBadRequest, "user_name", "that user_name already exist")
		}
		orm.First(&user, "email = ?", userRequest.Email)
		if len(user.ID) != 0 {
			return helpers.WebResponseFail(c, now, fiber.StatusBadRequest, "email", "that email already exist")
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userRequest.Password), 12)
		if err != nil {
			return helpers.WebResponseFail(c, now, fiber.StatusInternalServerError, "password", "failed to be hashed")
		}

		userRequest.Password = string(hashedPassword)
		orm.Create(&userRequest)

		sess.Set("user_id", userRequest.ID)

		if err := sess.Save(); err != nil {
			return helpers.WebResponseFail(c, now, fiber.StatusInternalServerError, "session", err.Error())
		}

		return helpers.WebResponseSuccess(c, now, fiber.StatusCreated, userRequest)
	})

	app.Post("/api/users/login", func(c *fiber.Ctx) error {
		now := time.Now()
		sess, err := store.Get(c)
		if err != nil {
			return helpers.WebResponseFail(c, now, fiber.StatusInternalServerError, "session", err.Error())
		}

		userRequest := models.User{}
		if err = c.BodyParser(&userRequest); err != nil {
			return helpers.WebResponseFail(c, now, fiber.StatusBadRequest, "user input", err.Error())
		}

		user := models.User{}
		if len(userRequest.Email) != 0 {
			orm.First(&user, "email = ?", userRequest.Email)
			if len(user.ID) == 0 {
				return helpers.WebResponseFail(c, now, fiber.StatusBadRequest, "email", "that email does'nt exist")
			}
		} else if len(userRequest.UserName) != 0 {
			orm.First(&user, "user_name = ?", userRequest.UserName)
			if len(user.ID) == 0 {
				return helpers.WebResponseFail(c, now, fiber.StatusBadRequest, "user_name", "that user_name does'nt exist")
			}
		}

		if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userRequest.Password)); err != nil {
			return helpers.WebResponseFail(c, now, fiber.StatusBadRequest, "password", "invalid password")
		}

		sess.Set("user_id", user.ID)

		if err := sess.Save(); err != nil {
			return helpers.WebResponseFail(c, now, fiber.StatusInternalServerError, "session", err.Error())
		}

		return helpers.WebResponseSuccess(c, now, fiber.StatusAccepted, user)
	})

	app.Get("/api/users/me", func(c *fiber.Ctx) error {
		now := time.Now()
		sess, err := store.Get(c)
		if err != nil {
			panic(err)
		}

		id := sess.Get("user_id").(string)
		if len(id) == 0 {
			return helpers.WebResponseFail(c, now, fiber.StatusBadRequest, "user", "not logged in")
		}

		user := models.User{}
		orm.First(&user, "id = ?", id)

		return helpers.WebResponseSuccess(c, now, fiber.StatusAccepted, user)
	})

	app.Listen(":3000")
}

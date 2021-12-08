package helpers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/madjiebimaa/sinar-arco/models"
)

func WebResponseSuccess(c *fiber.Ctx, now time.Time, status int, data interface{}) error {
	return c.Status(status).Type(fiber.MIMEApplicationJSON).JSON(models.WebResponse{
		Took:   uint(time.Until(now).Milliseconds()),
		Status: status,
		Data:   data,
		Errors: nil,
	})
}

func WebResponseFail(c *fiber.Ctx, now time.Time, status int, field string, message string) error {
	return c.Status(status).Type(fiber.MIMEApplicationJSON).JSON(models.WebResponse{
		Took:   uint(time.Until(now).Milliseconds()),
		Status: status,
		Data:   nil,
		Errors: []models.FieldError{
			{Field: field, Message: message},
		},
	})
}

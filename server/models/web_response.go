package models

type FieldError struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

type WebResponse struct {
	Took   uint         `json:"took"`
	Status int          `json:"status"`
	Data   interface{}  `json:"data"`
	Errors []FieldError `json:"errors"`
}

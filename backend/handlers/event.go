package handlers

import (
	"context"
	"strconv"
	"time"

	"github.com/RealBinaryGuru/sombot-easy/models"
	"github.com/gofiber/fiber/v2"
)

type EventHandler struct {
	repository models.EventRepository
}

func (h *EventHandler) GetMany(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	events, err := h.repository.GetMany(context)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  "fail",
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
		"status":  "success",
		"message": "",
		"data":    events,
	})
}

func (h *EventHandler) GetOne(ctx *fiber.Ctx) error {
	eventId, _ := strconv.Atoi(ctx.Params("eventId"))

	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	event, err := h.repository.GetOne(context, uint(eventId))

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  "fail",
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
		"status":  "success",
		"message": "",
		"data":    event,
	})
}

func (h *EventHandler) CreateOne(ctx *fiber.Ctx) error {
	event := &models.Event{}

	if err := ctx.BodyParser(event); err != nil {
		return ctx.Status(fiber.StatusUnprocessableEntity).JSON(&fiber.Map{
			"status":  "fail",
			"message": "Invalid request data",
			"data":    nil,
		})
	}

	file, err := ctx.FormFile("image")
	if err == nil {
		fileContent, err := file.Open()
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"status":  "fail",
				"message": "Unable to read image file",
			})
		}
		defer fileContent.Close()

		imageData := make([]byte, file.Size)
		if _, err := fileContent.Read(imageData); err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"status":  "fail",
				"message": "Error reading image data",
			})
		}

		event.Image = imageData
	}

	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	event, err = h.repository.CreateOne(context, event)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  "fail",
			"message": err.Error(),
			"data":    nil,
		})
	}

	return ctx.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"status":  "success",
		"message": "Event created",
		"data":    event,
	})
}

func (h *EventHandler) UpdateOne(ctx *fiber.Ctx) error {
	eventId, _ := strconv.Atoi(ctx.Params("eventId"))
	updateData := make(map[string]interface{})

	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	if err := ctx.BodyParser(&updateData); err != nil {
		return ctx.Status(fiber.StatusUnprocessableEntity).JSON(&fiber.Map{
			"status":  "fail",
			"message": err.Error(),
			"data":    nil,
		})
	}

	event, err := h.repository.UpdateOne(context, uint(eventId), updateData)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  "fail",
			"message": err.Error(),
			"data":    nil,
		})
	}

	return ctx.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"status":  "success",
		"message": "Event updated",
		"data":    event,
	})
}

func (h *EventHandler) DeleteOne(ctx *fiber.Ctx) error {
	eventId, _ := strconv.Atoi(ctx.Params("eventId"))

	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	err := h.repository.DeleteOne(context, uint(eventId))

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
			"status":  "fail",
			"message": err.Error(),
		})
	}

	return ctx.SendStatus(fiber.StatusNoContent)
}

func (h *EventHandler) GetPopularEvents(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	events, err := h.repository.GetPopularEvents(context)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "fail",
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
		"status": "success",
		"data":   events,
	})
}

func (h *EventHandler) GetUpcomingEvents(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	events, err := h.repository.GetUpcomingEvents(context)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "fail",
			"message": err.Error(),
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{
		"status": "success",
		"data":   events,
	})
}

func NewEventHandler(router fiber.Router, repository models.EventRepository) {
	handler := &EventHandler{
		repository: repository,
	}

	router.Get("/", handler.GetMany)
	router.Post("/", handler.CreateOne)
	router.Get("/:eventId", handler.GetOne)
	router.Put("/:eventId", handler.UpdateOne)
	router.Delete("/:eventId", handler.DeleteOne)
	router.Get("/popular", handler.GetPopularEvents)
	router.Get("/upcoming", handler.GetUpcomingEvents)
}

package main

import (
	"fmt"

	"github.com/RealBinaryGuru/sombot-easy/config"
	"github.com/RealBinaryGuru/sombot-easy/db"
	"github.com/RealBinaryGuru/sombot-easy/handlers"
	"github.com/RealBinaryGuru/sombot-easy/repositories"
	"github.com/RealBinaryGuru/sombot-easy/services"
	"github.com/gofiber/fiber/v2"
)

func main() {
	envConfig := config.NewEnvConfig()
	db := db.Init(envConfig, db.DBMigrator)

	app := fiber.New(fiber.Config{
		AppName:      "Ticket-Booking",
		ServerHeader: "Fiber",
	})

	// Repositories
	eventRepository := repositories.NewEventRepository(db)
	ticketRepository := repositories.NewTicketRepository(db)
	authRepository := repositories.NewAuthRepository(db)

	// Routing
	server := app.Group("/api")

	authService := services.NewAuthService(authRepository)

	handlers.NewAuthHandler(server.Group("/auth"), authService)
	handlers.NewEventHandler(server.Group("/event"), eventRepository)
	handlers.NewTicketHandler(server.Group("/ticket"), ticketRepository)

	app.Listen(fmt.Sprintf(":" + envConfig.ServerPort))
}

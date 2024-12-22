package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/RealBinaryGuru/sombot-easy/config"
	"github.com/RealBinaryGuru/sombot-easy/db"
	"github.com/RealBinaryGuru/sombot-easy/handlers"
	"github.com/RealBinaryGuru/sombot-easy/middlewares"
	"github.com/RealBinaryGuru/sombot-easy/repositories"
	"github.com/RealBinaryGuru/sombot-easy/services"
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

	// Service
	authService := services.NewAuthService(authRepository)

	// Routing
	server := app.Group("/api")
	handlers.NewAuthHandler(server.Group("/auth"), authService)

	privateRoutes := server.Use(middlewares.AuthProtected(db))

	handlers.NewEventHandler(privateRoutes.Group("/event"), eventRepository)
	handlers.NewTicketHandler(privateRoutes.Group("/ticket"), ticketRepository)

	app.Listen(fmt.Sprintf(":" + envConfig.ServerPort))
}

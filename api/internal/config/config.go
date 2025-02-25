package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

// Config holds all configuration for the application
type Config struct {
	Server   ServerConfig
	Database DatabaseConfig
}

// ServerConfig holds server-specific configuration
type ServerConfig struct {
	Port int
	Host string
}

// DatabaseConfig holds database-specific configuration
type DatabaseConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	Name     string
	SSLMode  string
}

// Load loads the configuration from files and environment variables
func Load() (*Config, error) {
	viper.SetConfigName("application") // Name of config file (without extension)
	viper.SetConfigType("yaml")        // Type of config file
	viper.AddConfigPath(".")           // Look for config in the working directory
	viper.AddConfigPath("./config")    // Look for config in ./config directory
	
	// Set default values
	viper.SetDefault("server.port", 8080)
	viper.SetDefault("server.host", "0.0.0.0")
	viper.SetDefault("database.host", "localhost")
	viper.SetDefault("database.port", 5432)
	viper.SetDefault("database.sslmode", "disable")
	
	// Enable environment variable overrides
	viper.AutomaticEnv()
	
	// Read the config file
	if err := viper.ReadInConfig(); err != nil {
		// It's okay if config file doesn't exist
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return nil, fmt.Errorf("error reading config file: %s", err)
		}
		log.Println("No config file found, using defaults and environment variables")
	}
	
	var config Config
	if err := viper.Unmarshal(&config); err != nil {
		return nil, fmt.Errorf("unable to decode config into struct: %s", err)
	}
	
	return &config, nil
}

// GetDatabaseDSN returns the database connection string
func (c *DatabaseConfig) GetDatabaseDSN() string {
	return fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		c.Host, c.Port, c.User, c.Password, c.Name, c.SSLMode,
	)
} 
package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// MySQLConfig holds the MySQL database configuration parameters
type MySQLConfig struct {
	Host      string
	Port      string
	User      string
	Password  string
	DBName    string
	Charset   string
	ParseTime string
	Loc       string
}

// LoadMySQLConfig loads MySQL configuration from environment variables
func LoadMySQLConfig() (*MySQLConfig, error) {
	// Load .env file if it exists
	godotenv.Load()

	config := &MySQLConfig{
		Host:      getEnv("DB_HOST", "localhost"),
		Port:      getEnv("DB_PORT", "3306"),
		User:      getEnv("DB_USERNAME", "root"),
		Password:  getEnv("DB_PASSWORD", "password"),
		DBName:    getEnv("DB_NAME", "retrogram"),
		Charset:   getEnv("DB_CHARSET", "utf8mb4"),
		ParseTime: getEnv("DB_PARSE_TIME", "True"),
		Loc:       getEnv("DB_LOC", "Local"),
	}

	return config, nil
}

// GetDSN returns the database connection string for MySQL
func (c *MySQLConfig) GetDSN() string {
	return fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=%s&parseTime=%s&loc=%s",
		c.User, c.Password, c.Host, c.Port, c.DBName, c.Charset, c.ParseTime, c.Loc,
	)
}

// ConnectDatabase establishes a connection to the MySQL database
func ConnectDatabase() (*gorm.DB, error) {
	config, err := LoadMySQLConfig()
	if err != nil {
		return nil, err
	}

	dsn := config.GetDSN()
	
	// Configure GORM logger
	gormLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			LogLevel: logger.Info,
			Colorful: true,
		},
	)

	// Open database connection
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: gormLogger,
	})
	
	if err != nil {
		return nil, err
	}

	// Configure connection pool
	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}
	
	// Set connection pool settings
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	return db, nil
}

// Helper function to get environment variable with a default value
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
} 
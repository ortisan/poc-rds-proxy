package main

import (
	"encoding/json"

	"fmt"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/spf13/viper"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Config struct {
	DBHost     string `mapstructure:"DB_HOST"`
	DBPort     string `mapstructure:"DB_PORT"`
	DBUser     string `mapstructure:"DB_USER"`
	DBPassword string `mapstructure:"DB_PASSWORD"`
	DBName     string `mapstructure:"DB_NAME"`
}

func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigFile(".env")
	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}

type User struct {
	ID        int64     `json:"id" gorm:"primaryKey column:id"`
	FirstName string    `json:"firstName" gorm:"column:firstName"`
	LastName  string    `json:"lastName" gorm:"column:lastName"`
	Email     string    `json:"email" gorm:"column:email"`
	CreatedAt time.Time `json:"createdAt" gorm:"column:createdAt" "autoCreateTime:true"`
	UpdatedAt time.Time `json:"updatedAt" gorm:"column:updatedAt" "autoUpdateTime:true"`
}

type Tabler interface {
	TableName() string
}

func (User) TableName() string {
	return "users"
}

func getDbConnectionString() string {
	c, err := LoadConfig("./")
	if err != nil {
		panic(err)
	}
	return fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable TimeZone=America/Sao_Paulo", c.DBHost, c.DBPort, c.DBUser, c.DBPassword, c.DBName)
	//return "host=host.docker.internal user=postgres password=123456789 dbname=poc_rds_proxy port=5432 sslmode=disable TimeZone=America/Sao_Paulo"
}

func GetConnection() (*gorm.DB, error) {
	dbStringConnection := getDbConnectionString()
	db, err := gorm.Open(postgres.Open(dbStringConnection), &gorm.Config{})
	return db, err
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	user := User{}
	err := json.Unmarshal([]byte(request.Body), &user)
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       "Invalid body json body",
			StatusCode: 400,
		}, nil
	}
	db, err := GetConnection()
	if err != nil {
		return events.APIGatewayProxyResponse{
			Body:       "Error to obtain db connection",
			StatusCode: 500,
		}, nil
	}
	result := db.Create(&user)
	if result.Error != nil {
		return events.APIGatewayProxyResponse{
			Body:       "Error to create user",
			StatusCode: 500,
		}, nil
	} else {
		bu, _ := json.Marshal(user)
		return events.APIGatewayProxyResponse{
			Body:       string(bu),
			StatusCode: 200,
		}, nil
	}
}

func main() {
	lambda.Start(handler)
}

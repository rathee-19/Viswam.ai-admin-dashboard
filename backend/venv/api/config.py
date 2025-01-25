from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_USER: str = "admin"
    DB_PASSWORD: str = "admin"
    DB_HOST: str = "localhost"
    DB_NAME: str = "myappdb"
    DB_PORT: int = 5432

    class Config:
        env_file = ".env"

settings = Settings()

# ---------- Stage 1: Build the application ----------
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy all project files to the container
COPY . .

# Build the application (skip tests to speed up build)
RUN mvn clean package -DskipTests


# ---------- Stage 2: Run the application ----------
FROM eclipse-temurin:17-jdk-alpine

# Set working directory for the runtime container
WORKDIR /app

# Copy the JAR file from the build stage to the runtime container
COPY --from=build /app/target/*.jar app.jar

# Expose the Spring Boot default port
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]

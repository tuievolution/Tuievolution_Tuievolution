# Java 25 JDK içeren temel imaj
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

# Maven'ı manuel kuruyoruz
RUN apt-get update && apt-get install -y maven

COPY . .
# Testleri atlayarak derleme yapıyoruz
RUN mvn clean package -DskipTests

# Çalıştırma aşaması (JRE 25)
FROM eclipse-temurin:25-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Render'ın portunu dinamik olarak alması için
EXPOSE 8080
ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]
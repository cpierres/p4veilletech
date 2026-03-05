@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo Mettre à jour les versions dans backend/pom.xml et backend/.env
pause

:: Définir JAVA_HOME
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.9.10-hotspot"

:: Vérifier que Java fonctionne
"%JAVA_HOME%\bin\java.exe" -version
if errorlevel 1 (
    echo Erreur: Java non trouvé
    exit /b 1
)

:: Récupérer la version depuis .env
for /f "tokens=2 delims==" %%a in ('findstr /b "PROJECT_VERSION=" .env') do set "PROJECT_VERSION=%%a"
echo Version détectée: %PROJECT_VERSION%

:: Formater la version pour le nom du stack Docker
set "STACK_VERSION=%PROJECT_VERSION%"
set "STACK_VERSION=%STACK_VERSION:.=-%"

:: Build backend
cd backend
call mvnw.cmd clean package -Pdocker -DskipTests
if errorlevel 1 (
    echo Erreur lors du build backend
    cd ..
    exit /b 1
)
cd ..

:: Build frontend avec version
cd frontend
docker build -t cpierres/p4vt-ia-frontend:%PROJECT_VERSION% .
if errorlevel 1 (
    echo Erreur lors du build frontend
    cd ..
    exit /b 1
)
cd ..

:: Déploiement
echo Déploiement du stack p4veilletech-%STACK_VERSION%...
docker-compose -p p4veilletech-%STACK_VERSION% up -d

echo.
echo Build et déploiement terminés!
pause

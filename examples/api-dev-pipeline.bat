@echo off
SET BRANCH=dev
SET SRC_DIR=C:\inetpub\api-netcore-dev
SET BUILD_DIR=C:\inetpub\api\build-dev
SET PUBLISH_DIR=C:\inetpub\api\api\dev
SET WEB_CONFIG=C:\inetpub\api\api\web.config
SET IIS_APP_NAME=dev

cd %SRC_DIR%

REM Checks if is there any changes in the server
SETLOCAL ENABLEDELAYEDEXPANSION

SET command=git rev-list HEAD...origin/%BRANCH% --count
FOR /F "tokens=* USEBACKQ" %%F IN (`%command%`) DO (
SET RESULT=%%F
)


IF %RESULT% EQU 0 (
    echo(
    echo There is no changes in branch: %BRANCH%
    echo(
) ELSE (
    @echo on
    git checkout %BRANCH%
    git pull

    cd Shinhancard.WebApi

    dotnet publish -c Release -o %PUBLISH_DIR%
    @echo off
    echo Deleting previouse files....
    del /f /s /q %PUBLISH_DIR%\*
    echo copying new files...
    appcmd stop site %IIS_APP_NAME%
    timeout 5
    xcopy  /e /h /k /o /x /y /c %BUILD_DIR%\*.*  %PUBLISH_DIR%
    appcmd start site %IIS_APP_NAME%
    echo Job successfully finished.
)

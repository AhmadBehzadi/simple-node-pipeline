@echo off
SET BRANCH=develop
SET DIR_PATH=C:\inetpub\web_dev
SET PUBLISH_OUTPUT=C:\inetpub\web\dev


cd %DIR_PATH%

REM Checks if is there any changes in the server
SETLOCAL ENABLEDELAYEDEXPANSION

SET command=git rev-list HEAD...origin/%BRANCH% --count
FOR /F "tokens=* USEBACKQ" %%F IN (`%command%`) DO (
SET RESULT=%%F
)


IF %RESULT% EQU 0  (
    echo[
    echo There is no changes in branch: %BRANCH%
    echo(
) else (
    @echo on
    git checkout %BRANCH%
    git pull
    yarn
    yarn build
    @echo off
    echo Deleting previouse files....
    del %PUBLISH_OUTPUT%\*.*
    echo copying new files...
    xcopy  /e /h /k /o /x /y /c %DIR_PATH%\build\*.*  %PUBLISH_OUTPUT%
    echo Job successfully finished.
)

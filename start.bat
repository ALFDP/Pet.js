@echo off
set uid=%1
set file=%2

if "%file%" == "" (
	set file="main.js"
)

call pm2 list
(pm2 list | grep %uid% | wc -l) >tmp

set /p a=<tmp

del /F tmp

if %a% == 0 (
	pm2 start %file% -n %uid% --watch
)
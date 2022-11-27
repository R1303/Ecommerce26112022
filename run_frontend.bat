cls

@ECHO OFF
cd..
cd..
cd..
D:
cd project/frontend/moviehub
:CONFIRM

echo Are you want to host on different ip(Y/N)

set/p "cho=>"
if %cho%==Y goto HOST

if %cho%==y goto HOST

if %cho%==n goto RUN

if %cho%==N goto RUN

echo Invalid choice.

goto CONFIRM

:HOST
goto GETIP


:RUN
echo ******** Application Frontend Executing.... ********
TIMEOUT /T 2 /NOBREAK
ng serve

:RUNHOST
echo ******** Application Frontend Executing on %ipaddress% .... **********
start run_application_on_ip.bat
TIMEOUT /T 2 /NOBREAK
ng serve --host %ipaddress%
start http://localhost:4200/

:INVALIDIP
echo Invalid Ip
goto CONFIRM

:GETIP
SETLOCAL ENABLEDELAYEDEXPANSION
echo Get Ip
FOR /F "tokens=* USEBACKQ" %%F IN (`ipconfig^| findstr /C:IPv4`) DO (
  SET var=%%F
)
set ipaddress=%var:~36%

if %ipaddress%==~36 goto RUN 

else goto CHECKIP

:CHECKIP
goto RUNHOST





@echo off

echo build wechat %env%
cd wechat
if %env% == 0 ( mvn clean install -Pdev-local) else if %env% == 1 ( mvn clean install -Pdev) else if %env% == 2 ( mvn clean install -Ptest) else if %env% == 3 ( mvn clean install -Pprod) else (echo env error)
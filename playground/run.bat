for %%i in (%*) do (
    cd %~dp0
    cd ..
    node exec.js %%i
)
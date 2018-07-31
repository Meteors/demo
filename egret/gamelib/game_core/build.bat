call egret build
copy .\bin\*.* ..\..\pt\libs\modules\game_core
cd ..\..\pt
call  egret publish --target wxgame
cd ..\gamelib\game_core
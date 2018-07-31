call egret build
copy .\bin\*.* ..\..\pt\libs\modules\game_platform
cd ..\..\pt
call  egret publish --target wxgame
cd ..\gamelib\game_platform
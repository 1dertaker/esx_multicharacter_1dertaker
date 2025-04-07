fx_version 'cerulean'
game 'gta5'
author 'ESX-Framework - 1dertak3r'
description 'esx_powered1dertak3r'
version '1.9.4'
lua54 'yes'



shared_scripts {'@es_extended/imports.lua', '@es_extended/locale.lua', 'locales/*.lua', 'config.lua'}

server_scripts {'@oxmysql/lib/MySQL.lua', 'server/*.lua'}

client_scripts {'client/*.lua'}

ui_page {'html/ui.html'}

files {'html/ui.html', 'html/css/main.css', 'html/js/app.js', 'html/locales/*.js', 'html/css/logo.png'}

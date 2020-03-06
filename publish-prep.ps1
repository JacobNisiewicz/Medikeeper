clear
$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
$reactPath = $dir + "\react";
$dotnetPath = $dir + "\dotnet";

cd $dir
.\build-all.ps1
.\copy-client.cmd
.\copy-node.cmd
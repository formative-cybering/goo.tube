#!/bin/bash -x

IMG=$(find ~/Code/goo.tube/web/x -type f | shuf -n 1)

pixterm -d 2 -s 2 $IMG

sleep 0.2

pixterm -d 2 -s 2 $IMG

sleep 1

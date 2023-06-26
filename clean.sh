#!/bin/bash

len=$#
if [ $len -eq 0 ]; then
  echo "please supply the namespace"
  exit 1
fi
echo "using namespace $1"

helm del -n $1 $(helm ls --all -n $1 --short)
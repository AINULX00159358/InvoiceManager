#!/bin/bash

len=$#
if [ $len -eq 0 ]; then
  echo "please supply the namespace"
  exit 1
fi
echo "using namespace $1"
kubectl apply --namespace=$1 -R -f kubernets/
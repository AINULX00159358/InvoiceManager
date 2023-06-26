#!/bin/bash

len=$#
if [ $len -eq 0 ]; then
  echo "please supply the namespace"
  exit 1
fi
echo "using namespace $1"


echo "create deploy app"
helm upgrade -n $1 --install invoice-manager-app ./helm -f ./helm/app-values/app.yaml

echo "create deploy data"
helm upgrade -n $1 --install invoice-manager-data ./helm -f ./helm/app-values/data.yaml

echo "create deploy generator"
helm upgrade -n $1 --install invoice-manager-generator ./helm -f ./helm/app-values/generator.yaml

echo "create deploy payment"
helm upgrade -n $1 --install invoice-manager-payment ./helm -f ./helm/app-values/payment.yaml
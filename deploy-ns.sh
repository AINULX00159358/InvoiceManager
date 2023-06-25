#!/bin/bash
echo "create namespace $1"
kubectl create namespace $1
kubectl label namespace $1 name=$1 istio-injection=enabled
kubectl apply --namespace=$1 -f ./sa/invoice-mgr-sa.yaml

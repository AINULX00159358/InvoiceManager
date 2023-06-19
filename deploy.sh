#!/bin/bash

echo "starting $*"

deployns() {
  echo "create namespace $1"
  kubectl create namespace $1
  kubectl label namespace $1 name=$1 istio-injection=enabled
  kubectl get namespace $1 -o=yaml
}

deployapp() {
  echo "create deploy app $1"
  helm upgrade -n $1 --install invoice-manager-app ./helm
}

deploygateway() {
  echo "create deploy gateway $1 $2"
  helm upgrade --install invoice-manager-gateway ./gateway/helm --set destination.host.live="invoice-mgr-app-svc.$1.svc.cluster.local" --set destination.host.canary="invoice-mgr-app-svc.$2.svc.cluster.local"
}


case "$1" in
  "namespace")
    deployns $2
    ;;
  "application")
    deployapp $2
    ;;
  "gateway")
     deploygateway $2 $3
    ;;
  *)
    echo "You have failed to specify what to do correctly."
    exit 1
    ;;
esac

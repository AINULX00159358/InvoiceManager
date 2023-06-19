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

deployvs() {
  echo "create deploy gateway $1"
  helm upgrade -n $1 --install invoice-mgr ./gateway/helm
}


case "$1" in
  "namespace")
    deployns $2
    ;;
  "application")
    deployapp $2
    ;;
  "virtualservice")
     deployvs $2
    ;;
  *)
    echo "You have failed to specify what to do correctly."
    exit 1
    ;;
esac

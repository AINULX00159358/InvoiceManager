#!/bin/bash


while getopts ns:app:vs: flag
do
    case "${flag}" in
        ns) deployns ${OPTARG};;
        app) deployapp ${OPTARG};;
        vs) deployvs ${OPTARG};;
    esac
done

deployns() {
  kubectl create namespaces $1
  kubectl label namespace $1 name=$1 istio-injection=enabled
}

deployapp() {
  helm upgrade --namespaces $1 --install invoice-mgr ./helm
}

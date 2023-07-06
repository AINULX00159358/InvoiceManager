#!/bin/bash
kubectl create namespace istio-system
kubectl create secret generic cacerts -n istio-system \
      --from-file=certs/ca-cert.pem \
      --from-file=certs/ca-key.pem \
      --from-file=certs/root-cert.pem \
      --from-file=certs/cert-chain.pem
kubectl get secret cacerts -n istio-system -o=yaml

#!/bin/bash
kubectl apply -f kubernetes/invoice-mgr-gtw.yaml
kubectl get gateway -o=yaml
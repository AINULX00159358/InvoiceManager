#!/bin/bash
kubectl apply -f gateway/invoice-mgr-gtw.yaml
kubectl get gateway -o=yaml
#!/bin/bash
kubectl exec "$(kubectl get pod -l app=payment -n default -o jsonpath={.items..metadata.name})" -c istio-proxy -n default -- openssl s_client -showcerts -connect data:3300 > data-certs.txt
cat data-certs.txt
sed -n '/-----BEGIN CERTIFICATE-----/{:start /-----END CERTIFICATE-----/!{N;b start};/.*/p}' data-certs.txt > certs.pem
awk 'BEGIN {counter=0;} /BEGIN CERT/{counter++} { print > "proxy-cert-" counter ".pem"}' < certs.pem
rm -rf /tmp/root-ca-certs.pem || true
cat certs/ca-cert.pem certs/root-cert.pem > /tmp/root-ca-certs.pem
openssl verify -CAfile /tmp/root-ca-certs.pem ./proxy-cert-1.pem
openssl verify -CAfile /tmp/root-ca-certs.pem ./proxy-cert-2.pem
openssl verify -CAfile /tmp/root-ca-certs.pem ./proxy-cert-3.pem
openssl verify -CAfile /tmp/root-ca-certs.pem ./proxy-cert-4.pem
rm -rf ./proxy-cert-*.prem
rm -rf ./certs.pem
rm -rf data-certs.txt

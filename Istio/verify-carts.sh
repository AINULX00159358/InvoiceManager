#!/bin/bash
kubectl exec "$(kubectl get pod -l app=payment -n default -o jsonpath={.items..metadata.name})" -c istio-proxy -n default -- openssl s_client -showcerts -connect data:3300 > data-certs.txt
cat data-cert.txt
sed -n '/-----BEGIN CERTIFICATE-----/{:start /-----END CERTIFICATE-----/!{N;b start};/.*/p}' data-cert.txt > certs.pem
awk 'BEGIN {counter=0;} /BEGIN CERT/{counter++} { print > "proxy-cert-" counter ".pem"}' < data-certs.pem

echo "Verify the root certificate is the same as the one specified by the administrator"
sleep 1
openssl x509 -in certs/root-cert.pem -text -noout > /tmp/root-cert.crt.txt
openssl x509 -in ./proxy-cert-3.pem -text -noout > /tmp/invoice-mgr.crt.txt
diff -s /tmp/root-cert.crt.txt /tmp/invoice-mgr.crt.txt

echo "Verify the CA certificate is the same as the one specified by the administrator:"
sleep 1
openssl x509 -in certs/ca-cert.pem -text -noout > /tmp/ca-cert.crt.txt
openssl x509 -in ./proxy-cert-2.pem -text -noout > /tmp/invoice-mgr.chain.crt.txt
diff -s /tmp/ca-cert.crt.txt /tmp/invoice-mgr.chain.crt.txt

echo "verify the certificate chain from the root certificate to the workload certificate:"
sleep 1
openssl verify -CAfile <(cat certs/ca-cert.pem certs/root-cert.pem) ./proxy-cert-1.pem
rm -rf ./proxy-cert*.pem
rm -rf ./data-certs.*
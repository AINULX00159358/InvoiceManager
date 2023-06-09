export INGRESS_HOST=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
echo "INGRESS_HOST set to ${INGRESS_HOST}"
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].port}')
echo "INGRESS_PORT set to ${INGRESS_PORT}"
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
echo "GATEWAY_URL set to ${GATEWAY_URL}"
echo "    "
kubectl get vs --all-namespaces
echo "--------------"
kubectl get svc -n ui
kubectl get svc
echo "--------------"
kubectl get destinationrule --all-namespaces
echo "--------------"
sleep 4
istioctl analyze
echo "----------------------"
sleep 2
curl "http://${GATEWAY_URL}/"
echo "    "


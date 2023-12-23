echo "*****************************************************"
echo "*                                                   *"
echo "*      shift 100% traffic to Canary version         *" 
echo "*                                                   *"
echo "*****************************************************"
echo
set -x
kubectl apply -R -f ./InvoiceManager/kubernets/app-v2-full/
echo
set +x

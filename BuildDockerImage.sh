#!/bin/bash
docker build . -t alixtudublincr.azurecr.io/invoice-mgr:$1 -f docker/Dockerfile
docker images | grep invoice
docker push  alixtudublincr.azurecr.io/invoice-mgr:$1
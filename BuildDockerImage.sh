#!/bin/bash
docker build . -t alixtudublincr.azurecr.io/invoice-mgr:v100 -f docker/Dockerfile
docker images | grep invoice

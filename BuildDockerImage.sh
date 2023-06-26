#!/bin/bash
docker build . -t invoice-mgr:v1.1.0 -f docker/Dockerfile
docker tag invoice-mgr:v1.1.0 x00159358/invoice-mgr:v1.1.0
docker images | grep invoice
docker push x00159358/invoice-mgr:v1.1.0

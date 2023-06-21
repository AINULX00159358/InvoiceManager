#!/bin/bash
# docker build . -t invoice-mgr-app:v1.0.0 -f docker/Dockerfile_app
# docker build . -t invoice-mgr-data:v1.0.0 -f docker/Dockerfile_data
# docker build . -t invoice-mgr-gen:v1.0.0 -f docker/Dockerfile_gen
docker build . -t invoice-mgr:v1.0.0 -f docker/Dockerfile_invoice
docker images | grep invoice

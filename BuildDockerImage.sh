#!/bin/bash
docker build . -t invoice-mgr:v1.0.0 -f docker/Dockerfile_gen
docker images | grep invoice

#!/bin/bash
docker build . -t invoice-mgr:v1.1.0 -f docker/Dockerfile
docker images | grep invoice

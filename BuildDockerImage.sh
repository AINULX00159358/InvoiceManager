#!/bin/bash
docker build . -t invoice-mgr:$1 -f docker/Dockerfile
docker images | grep invoice

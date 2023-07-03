#!/bin/bash
VERSION=1.1.0
docker build . -t invoice-mgr:v${VERSION} -f docker/Dockerfile
docker tag invoice-mgr:v${VERSION} x00159358/invoice-mgr:v${VERSION}
docker images | grep invoice
docker push x00159358/invoice-mgr:v${VERSION}

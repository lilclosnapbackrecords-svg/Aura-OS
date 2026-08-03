#!/usr/bin/env bash
set -o errexit

echo "Installing root dependencies..."
npm ci

echo "Building frontend..."
npm run build

echo "Installing backend dependencies..."
npm ci --prefix backend

echo "Build complete!"

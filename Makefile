# Makefile for running frontend and backend tests with coverage

.PHONY: backend-test frontend-test

# Run backend tests with coverage
backend-test:
	pytest --cov=src --cov-report=term-missing

# Run frontend tests with coverage
frontend-test:
	npx c8 --include src \
	--exclude "src/app/.well-known/**" \
	--exclude "src/app/api/**" \
	--exclude "src/hooks/**" \
	--exclude "src/lib/**" \
	--all --check-coverage --lines 80 --functions 80 --branches 80 vitest
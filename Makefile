# Makefile for running tests and generating coverage reports

.PHONY: test coverage frontend-test frontend-coverage

backend-test:
	@bash -c "source venv/bin/activate && pytest --maxfail=1 -q"

backend-coverage:
	@bash -c "source venv/bin/activate && coverage run -m pytest -q && coverage report -m --omit='venv/*,build/*,.next/*'"

frontend-test:
	npm run test

frontend-coverage:
	npm run test:coverage
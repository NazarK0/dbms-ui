dev:
	docker compose up --watch --build --force-recreate --remove-orphans
push-dev-full:
	git push origin dev && git push laguna dev


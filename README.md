# Overleaf CLSI Backend

This repo contains only the Overleaf Common LaTeX Service Interface (CLSI) for compiling LaTeX projects to PDF.

## Usage

1. Build the Docker image

```bash
docker compose build
```

2. Start the compiler service

```bash
docker compose up
```

The service listens on `http://localhost:3013`. POST compile requests as described in the official CLSI documentation.

Compiled files are written to the `compiles/` directory.

3. (Optional) Run the simple Node backend

```
cd backend
npm install
npm start
```

This exposes `POST /compile` on port `5000`. Send raw LaTeX in the request body
and the backend forwards it to the CLSI compiler.

Example using `curl`:

```bash
curl -X POST --data-binary '@example.tex' http://localhost:5000/compile
```

## Directories

- `services/clsi/` – source for the CLSI service.
- `compiles/` – mounted directory for compilation output.
- `ai-prompter/` – placeholder for future frontend.
- `backend/` – minimal API that relays LaTeX to CLSI.

.PHONY: install dev build export clean serve

install:
	@echo "📦 Installing dependencies..."
	npm install

dev:
	@echo "🚀 Starting development server..."
	npm run dev

build:
	@echo "🔨 Building for production..."
	npm run build

export: build
	@echo "📤 Exporting static files..."
	@echo "✅ Static files generated in ./out directory"

serve: export
	@echo "🌐 Starting local server for static files..."
	@echo "📍 Open http://localhost:8000 in your browser"
	@cd out && python3 -m http.server 8000

clean:
	@echo "🧹 Cleaning build files..."
	rm -rf .next out node_modules/.cache

clean-all: clean
	@echo "🧹 Cleaning all generated files..."
	rm -rf node_modules

help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make dev        - Start development server"
	@echo "  make build      - Build for production"
	@echo "  make export     - Export static files for GitHub Pages"
	@echo "  make serve      - Build and serve static files locally (port 8000)"
	@echo "  make clean      - Clean build files"
	@echo "  make clean-all  - Clean all generated files including node_modules"
	@echo "  make help       - Show this help message"

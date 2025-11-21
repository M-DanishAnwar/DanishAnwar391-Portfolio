#!/bin/bash

echo "Setting up Danish Anwar's 3D Portfolio Project..."

# Create necessary directories
mkdir -p public/assets/3d
mkdir -p public/fonts
mkdir -p src/lib
mkdir -p src/content
mkdir -p src/styles

# Create placeholder files
touch src/lib/utils.ts
touch src/content/projects.json
touch src/styles/globals.css

# Create a basic environment file
cat > .env.local << EOF
# Environment variables for Danish Anwar's Portfolio
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF

echo "Project structure created successfully!"

# Instructions for user
echo ""
echo "To complete the setup, please follow these steps:"
echo "1. Run 'npm install' to install dependencies"
echo "2. Install the 3D dependencies separately if needed:"
echo "   npm install three @react-three/fiber @react-three/drei"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "For deployment to Vercel:"
echo "1. Push this code to your GitHub repository"
echo "2. Connect your repository to Vercel"
echo "3. Vercel will automatically build and deploy your site"
echo ""
echo "Important: This project requires significant memory to install all dependencies."
echo "If you encounter memory issues, install dependencies in stages:"
echo "   npm install next react react-dom typescript @types/react @types/node @types/react-dom"
echo "   npm install -D tailwindcss postcss autoprefixer"
echo "   npm install three @react-three/fiber @react-three/drei"
echo "   npm install framer-motion lucide-react"
echo ""
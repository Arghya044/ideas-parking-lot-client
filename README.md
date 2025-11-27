# Ideas Parking Lot - Next.js Application

A modern, full-featured Ideas Parking Lot application built with Next.js (App Router) where users can save and manage their creative ideas.

## Live Link: 
https://ideas-parking-lot-client.vercel.app
## Backend github link:
https://github.com/Arghya044/ideas-parking-lot-server.git

## Features

- 🎨 **Modern UI** - Beautiful, responsive design with a bluish theme
- 🔐 **Authentication** - Google OAuth and email/password authentication
- 💡 **Idea Management** - Create, view, edit, and delete ideas
- 🔍 **Search & Filter** - Search ideas and filter by category
- 📱 **Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🛡️ **Protected Routes** - Secure pages that require authentication

## Tech Stack

- **Next.js 16** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Icons** - Icon library
- **Express.js** - Backend API server (separate)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Express backend server running (see `index.js`)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Start the Express backend server (in a separate terminal):
```bash
node index.js
```

4. Start the Next.js development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

### Public Pages

- **/** - Landing page with hero, features, testimonials, and more
- **/ideas** - Browse all ideas with search and category filters
- **/ideas/[id]** - View detailed information about a specific idea
- **/login** - Login or register (toggle with `?mode=register`)
- **/about** - About page
- **/contact** - Contact page

### Protected Pages (Require Authentication)

- **/add-idea** - Create a new idea
- **/manage-ideas** - View, edit, and delete your ideas

## Authentication

The app supports two authentication methods:

1. **Email/Password** - Traditional registration and login
2. **Google OAuth** - Sign in with Google account

After successful authentication, a JWT token is stored in localStorage and sent with API requests.

## API Integration

The frontend communicates with the Express backend API. Make sure the backend server is running on the port specified in `NEXT_PUBLIC_API_URL`.

### API Endpoints Used

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Get Google OAuth URL
- `POST /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Get current user
- `GET /api/ideas` - Get all ideas
- `GET /api/ideas/:id` - Get single idea
- `GET /api/ideas/user/my-ideas` - Get user's ideas
- `POST /api/ideas` - Create idea
- `DELETE /api/ideas/:id` - Delete idea
- `GET /api/categories` - Get all categories

## Features Overview

### Landing Page
- Sticky navbar with user menu
- Hero section with CTA
- Features section
- Example ideas showcase
- Testimonials
- Stats banner
- How it works section
- Footer

### Ideas Management
- Search functionality
- Category filtering
- Responsive grid layout
- Idea cards with hover effects
- Detailed view page

### Protected Features
- Add new ideas with form validation
- Manage your ideas (view, delete)
- User profile in navbar dropdown

## Styling

The app uses a modern bluish theme with:
- Primary color: Blue (#3B82F6, #1E40AF)
- Clean, minimal design
- Consistent spacing and typography
- Smooth transitions and hover effects
- Fully responsive layouts

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Notes

- The Express backend server (`index.js`) should be running separately
- Google OAuth redirect URI should be configured to: `http://localhost:3000/api/auth/callback/google`
- JWT tokens are stored in localStorage (consider using httpOnly cookies for production)
- All API requests include the JWT token in the Authorization header

## License

This project is private and proprietary.

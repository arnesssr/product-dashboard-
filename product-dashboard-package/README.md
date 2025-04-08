# Product Management Dashboard

A comprehensive dashboard for managing products, with analytics, product management, and user settings.

## Features

- **Dashboard Overview**: View key metrics and product statistics
- **Product Management**: Add, edit, and delete products
- **Category-based Forms**: Dynamic form fields based on product category
- **Image Upload**: Upload and preview product images
- **Analytics**: Visual representation of product data
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React
- TypeScript
- React Router for navigation
- Context API for state management
- React Hook Form for form handling
- Tailwind CSS for styling
- Recharts for data visualization

### Backend
- Express.js
- RESTful API architecture
- Multer for file uploads
- CORS for cross-origin requests

## Getting Started

### Prerequisites
- Node.js 16+ and npm/pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd product-dashboard
```

2. Install frontend dependencies:
```bash
pnpm install
```

3. Install backend dependencies:
```bash
cd server
pnpm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
pnpm start
```

2. Start the frontend development server:
```bash
cd ..
pnpm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

# Product Management Dashboard Development Todo

## Design Phase
- [x] Create UI mockup for dashboard layout
- [x] Design component structure and interactions
- [ ] Plan state management approach

## Setup
- [x] Initialize React project with create_react_app
- [x] Set up folder structure according to requirements
- [x] Install required dependencies (React Router, Tailwind CSS, form library)
- [x] Configure Tailwind CSS

## Frontend Implementation
- [x] Implement layout components (Sidebar, TopNavigation)
- [x] Create dashboard components (WelcomeBanner, StatsCard, AnalyticsSection)
- [x] Develop product components (ProductForm, ImagePreview, RecentProducts)
- [x] Build common components (Button, DropdownMenu)
- [x] Implement page components (Dashboard, AddProduct, Settings, Profile)
- [x] Set up routing with React Router

## Backend Implementation
- [ ] Set up backend server structure
- [ ] Create API endpoints for product management
- [ ] Implement data models
- [ ] Add authentication functionality
- [ ] Connect to database

## Integration
- [ ] Connect frontend to backend API
- [ ] Implement state management (Context API or Redux)
- [ ] Add form validation
- [ ] Handle image uploads

## Testing & Deployment
- [ ] Test application functionality
- [ ] Ensure responsive design works on all devices
- [ ] Deploy application
- [ ] Document application features and usage


## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

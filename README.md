# 🗺️ Smart Bremen

**An interactive mapping platform for documenting and visualizing urban informality in Bremen, Germany.**

Built with React and Leaflet, Smart Bremen enables users to explore, document, and share geotagged stories about informal urban spaces — from street art and community gardens to informal settlements and citizen-led interventions.

---

## ✨ Features

- **Interactive Map** — Leaflet-powered map centered on Bremen with OpenStreetMap tiles, custom markers, and geotagged posts
- **Geotagged Storytelling** — Create location-based posts with titles, descriptions, images, citations, and contact information
- **Informality Layers** — Categorize posts by informality type (e.g., street vending, informal housing, urban gardening)
- **Image Management** — Upload a primary display image plus a gallery collection per post, with drag-and-drop support
- **Authentication & Authorization** — JWT-based login/signup with role-based access (Admin vs. Artist)
- **Admin Dashboard** — Review, publish/unpublish, edit, and delete posts; manage user accounts and roles
- **Responsive Design** — Tailwind CSS with a custom earthy color palette and custom fonts (CircularStd, ClashDisplay)
- **Public Pages** — About Us (team section), Contact Us, and featured content sections

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Maps** | [Leaflet](https://leafletjs.com/) + [React-Leaflet](https://react-leaflet.js.org/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + Custom CSS |
| **Build Tool** | [Create React App](https://create-react-app.dev/) |
| **Testing** | Jest + React Testing Library |
| **Fonts** | CircularStd, ClashDisplay |

---

## 📋 Prerequisites

- **Node.js** ≥ 16.x
- **npm** ≥ 8.x
- A running instance of the [Smart Bremen Backend API](https://smart-bremen.com) (for full functionality)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/lasangnya/smart-bremen-frontend.git
cd smart-bremen-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

---

## 🔧 Configuration

The API base URL is configured in `src/routes.js`:

```js
export const API_BASE_URL = "https://smart-bremen.com";
```

Update this value if your backend runs on a different host or port.

---

## 📁 Project Structure

```
src/
├── App.js                      # Main app component with routing
├── Map.js                      # Interactive Leaflet map with markers & popups
├── CreatePost.js               # Post creation form component
├── routes.js                   # Route definitions & API base URL
├── index.js                    # React entry point
├── index.css                   # Global styles, Tailwind imports, fonts
│
├── assets/                     # Static assets
│   ├── fonts/                  # CircularStd & ClashDisplay fonts
│   ├── icons/                  # Custom map marker icons
│   ├── images/                 # Image assets
│   └── logos/                  # Logo assets
│
├── components/                 # Shared UI components
│   ├── Header.js               # Navigation header
│   ├── Footer.js               # Site footer
│   ├── Button.js               # Reusable button component
│   ├── Featured.js             # Featured content section
│   ├── MapView.js              # Map view wrapper
│   ├── ArtistProfileandName.js # Artist profile component
│   ├── ArtistProfilePicture.js # Artist profile picture
│   └── TeamMember.js           # Team member card
│
├── pages/                      # Public page components
│   ├── AboutUs.js              # About us page with team data
│   └── ContactUs.js            # Contact page
│
├── backend/                    # Admin & authentication features
│   ├── components/
│   │   ├── AuthContext.js      # Authentication context provider
│   │   ├── AddNewLocation.js   # Create/edit location form
│   │   ├── EditLocation.js     # Edit existing location
│   │   ├── PostRequests.js     # Post moderation (review/publish/delete)
│   │   ├── UserRequests.js     # User request management
│   │   ├── Users.js            # Admin user management
│   │   └── BackHeader.js       # Admin dashboard header
│   ├── pages/
│   │   ├── LoginPage.js        # Login page
│   │   ├── SignupPage.js       # Registration page
│   │   └── Dashboard.js        # Admin dashboard with sidebar nav
│   └── data/                   # Mock data for development
│       ├── postRequests.json
│       ├── userRequests.json
│       └── users.json
│
├── data/                       # Content data
│   ├── aboutusData.json        # Team member data
│   ├── artistData.json         # Artist information
│   └── featuredData.json       # Featured content
│
└── styles/
    └── colors.css              # CSS custom properties (color palette)
```

---

## 🗺️ Map Features

The application uses **Leaflet** via `react-leaflet` with the following features:

- **Map center**: Bremen, Germany (53.0765°N, 8.80681°E)
- **Default zoom**: 14
- **Base tiles**: OpenStreetMap
- **Custom markers**: SVG-based markers for post locations
- **Interactive popups**: Click markers to view post details, edit, publish/unpublish, or delete
- **Click-to-create**: Authenticated users can click the map to create a new post at that location
- **Boundary data**: Bremen GeoJSON boundary included at `public/data/bremen.geojson`

---

## 🔐 Authentication

The app uses JWT-based authentication with token storage in `localStorage`:

- **Login**: `POST /api/auth/login`
- **Signup**: `POST /api/auth/register`
- **Logout**: `POST /api/auth/logout`
- **Roles**: `role_id: 1` (Admin), `role_id: 2` (Artist)

Authenticated API requests include the token in the `Authorization: Bearer <token>` header.

---

## 📡 API Endpoints

The frontend communicates with the backend at `https://smart-bremen.com`. Key endpoints include:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/posts` | Fetch all published posts |
| `POST` | `/api/posts` | Create a new post (multipart/form-data) |
| `PUT` | `/api/posts/:id` | Update an existing post |
| `DELETE` | `/api/posts/:id` | Delete a post |
| `POST` | `/api/admin/posts/:id/toggle-publish` | Publish/unpublish a post |
| `GET` | `/api/dashboard/posts` | Fetch all posts for admin dashboard |
| `GET` | `/api/informality-layers` | Fetch informality layer categories |
| `GET` | `/api/users` | Fetch all users (admin only) |
| `PUT` | `/api/users/:id` | Update a user's role/info (admin only) |
| `DELETE` | `/api/users/:id` | Delete a user (admin only) |
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/auth/logout` | User logout |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Run the app in development mode at `http://localhost:3000` |
| `npm run build` | Build the app for production to the `build/` folder |
| `npm test` | Launch the test runner in interactive watch mode |
| `npm run eject` | Eject from Create React App (irreversible) |

---

## 🚢 Deployment

Build the production bundle:

```bash
npm run build
```

This creates an optimized, minified build in the `build/` directory. Deploy it to any static hosting service:

- **Vercel / Netlify**: Connect the repository and set the build command to `npm run build` with publish directory `build`
- **Apache / Nginx**: Point the document root to the `build/` folder
- **Docker**: Serve the `build/` directory with any static file server (nginx, serve, etc.)

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#8f3028` | Primary brand color |
| `--secondary` | `#4F7279` | Secondary accent |
| `--tertiary` | `#a66337` | Tertiary accent |
| `--accent` | `#d5cdb7` | Background accents |
| `--background` | `#ffffff` | Page background |

### Typography

- **Body**: CircularStd (Book, Medium, Bold weights)
- **Headings**: ClashDisplay (Light, Bold weights)
- **Fallback**: System font stack (Segoe UI, Roboto, etc.)

All fonts are bundled in `src/assets/fonts/`.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "Add some feature"`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. Open a **Pull Request**

Please ensure your code follows the existing patterns and includes appropriate tests where applicable.

---

## 📄 License

This project is open source and available for public use.

---

## 🙏 Acknowledgements

- [OpenStreetMap](https://www.openstreetmap.org/) for map tile data
- [Leaflet](https://leafletjs.com/) for the mapping library
- The residents and communities of Bremen who contribute their stories and spaces

---

<p align="center">Made with ❤️ for Bremen</p>

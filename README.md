# 🏪 Store Management System

A modern, full-featured store management application built with Next.js, React, and Tailwind CSS. This application helps store owners manage their products, inventory, and user profiles efficiently.

## ✨ Features

### 📦 Product Management
- **Product Listing**: View all products in a beautiful card-based grid layout
- **Product Details**: Detailed view of individual products with complete information
- **Add/Edit Products**: Create and update product information including:
  - Product name and description
  - Category and rack location
  - Price and stock quantity
  - Product images
- **Delete Products**: Remove products from inventory
- **Stock Status**: Real-time stock status indicators (In Stock, Low Stock, Out of Stock)

### 👤 User Management
- **User Profile**: View user details including name, email, store name, and registration date
- **Update Profile**: Edit user information with form validation
- **Authentication**: Secure user authentication system

### 🎨 Design Features
- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Color Scheme**: Professional indigo and blue color palette
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Toast Notifications**: Real-time feedback for user actions

## 🚀 Technologies Used

- **Frontend Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Language**: JavaScript/JSX

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vicky-Kushwaha/store-management.git
   cd store-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
      ```
      DB_URL=
      JWT_SECRET=
      CLOUDINARY_NAME=
      CLOUDINARY_API_KEY=
      CLOUDINARY_API_SECRET=
      ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

The application uses a global provider for user authentication state management. Ensure you have proper authentication middleware set up on your API endpoints.

## 📦 State Management

Uses React Context API through `GlobalProvider` for:
- User authentication state
- User information
- Loading states

## 🎯 Best Practices Implemented

- Component-based architecture
- Responsive design principles
- Error handling and validation
- Loading states for better UX
- Optimistic UI updates
- Clean code organization
- Reusable components
- Semantic HTML

## 🐛 Error Handling

- Form validation with real-time feedback
- API error handling with toast notifications
- Loading states for async operations
- Graceful fallbacks for missing data

## 🚀 Future Enhancements

- [ ] Advanced search and filtering
- [ ] Bulk product operations
- [ ] Export data to CSV/Excel
- [ ] Dashboard with analytics
- [ ] Order management
- [ ] Supplier management
- [ ] Multi-store support
- [ ] Dark mode toggle
- [ ] Print invoices/reports

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Your Name - Vicky Kumar

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set
- All contributors and supporters

---

**Made with ❤️ for store owners**

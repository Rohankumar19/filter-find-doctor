# 🩺 Doctor Listing Page – Campus Assessment Project

A fully client-side doctor listing web application built for the Campus Assessment. Users can search doctors by name, apply multiple filters (consultation type, specialties), and sort results by fee or experience. Filters are synced with URL query parameters and support browser navigation.

---

## 🚀 Features

- 🔍 **Autocomplete Search** (Top 3 doctor name suggestions)
- 🎛️ **Dynamic Filter Panel**
  - Consultation Type (Video Consult / In Clinic)
  - Specialties (Multi-select)
  - Sort by Fees (Asc) or Experience (Desc)
- 💾 **Frontend-only Filtering**
- 🌐 **URL Query Param Sync** (Retain filter state on refresh or navigation)
- 🎯 **Test Case Ready** (All interactive elements have `data-testid` attributes)

---

## 🏗️ Project Structure

```
src/
├── components/
│   └── ui/                  # Reusable UI components
│       ├── DoctorCard.tsx
│       ├── DoctorListingPage.tsx
│       ├── FilterPanel.tsx
│       └── SearchBar.tsx
├── hooks/                   # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/                     # Shared logic/utils
│   └── utils.ts
├── pages/                   # Page-level components (if routing added)
├── services/                # Data fetching logic
├── types/                   # TypeScript types
├── App.tsx                  # Main component
├── main.tsx                 # App entry point
└── vite-env.d.ts
```

---

## 🧪 Test Attributes (`data-testid`)

| Element                    | `data-testid`                      |
|---------------------------|-------------------------------------|
| Search Bar                | `autocomplete-input`               |
| Suggestion Item           | `suggestion-item`                  |
| Doctor Card Wrapper       | `doctor-card`                      |
| Doctor Name               | `doctor-name`                      |
| Doctor Specialties        | `doctor-specialty`                 |
| Experience                | `doctor-experience`                |
| Fee                       | `doctor-fee`                       |
| Filter Headers            | `filter-header-*`                  |
| Consultation Type Filters | `filter-video-consult`, `filter-in-clinic` |
| Specialty Checkboxes      | `filter-specialty-*`               |
| Sort Options              | `sort-fees`, `sort-experience`     |

---

## 🌐 API Used

- Endpoint: [SRM-C1-25.json](https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json)
- Fetch once on app load
- All filtering and sorting handled client-side

---

## 🧠 Implementation Highlights

- **React Hooks**: Functional components with hooks like `useEffect`, `useState`, and custom query param management
- **Efficient Filtering**: Filters applied in order, using priority
- **Memoized Sorting/Filtering**: Optimized with `useMemo` for performance
- **URL Query Handling**: Syncs state with query parameters using `URLSearchParams`

---

## 🛠️ Setup & Run Locally

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

App runs at `http://localhost:5173`

---

## 🧼 Linting & Formatting

```bash
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```

---

## 📦 Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [bun](https://bun.sh/) (Optional: if you're running with `bun` instead of `npm/yarn`)

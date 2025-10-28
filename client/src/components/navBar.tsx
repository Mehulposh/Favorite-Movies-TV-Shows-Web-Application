// components/SearchFilterBar.tsx
import type { ChangeEvent }  from "react";

/**
 * Props interface for Navbar component
 * Uses controlled component pattern where parent manages state
 * 
 * @property search - Current search query string
 * @property setSearch - Function to update search query
 * @property filter - Current filter value ('', 'MOVIE', or 'TV_SHOW')
 * @property setFilter - Function to update filter value
 */
interface NavbarProps {
    search: string;
    setSearch: (value: string) => void;
    filter: string;
    setFilter: (value: string) => void;
}


/**
 * Navbar/SearchFilterBar Component
 * Provides search and filter controls for the media list
 * 
 * Features:
 * - Real-time search input (filters by title, director, location)
 * - Type filter dropdown (All, Movies, TV Shows)
 * - Controlled components with state lifted to parent
 */
export default function Navbar({ search, setSearch, filter, setFilter }: NavbarProps ) {

    /**
   * Handler for search input changes
   * Updates search state on every keystroke for real-time filtering
   * 
   * @param e - Input change event
   */
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  /**
   * Handler for filter dropdown changes
   * Updates filter state when user selects a different option
   * 
   * @param e - Select change event
   */
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  return (
   <div className="flex gap-3 items-center mb-4">
         {/* Search Input - Full width, responsive */}
            <input
                type="text"
                placeholder="Search by title, director, or location..."
                value={search}
                onChange={handleSearchChange}
                className="border rounded-md px-3 py-2 w-full"
            />
         {/* Filter Dropdown - Fixed width */}
            <select
                value={filter}
                onChange={handleFilterChange}
                className="border rounded-md px-3 py-2"
            >     
                {/* Empty string value shows all items */}
                <option value="">All</option>

                {/* Filter by MOVIE type */}
                <option value="MOVIE">Movies</option>

                {/* Filter by TV_SHOW type */}
                <option value="TV_SHOW">TV Shows</option>
            </select>
    </div>
    
  );
}

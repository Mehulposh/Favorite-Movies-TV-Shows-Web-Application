// components/SearchFilterBar.tsx
import type { ChangeEvent }  from "react";

interface NavbarProps {
    search: string;
    setSearch: (value: string) => void;
    filter: string;
    setFilter: (value: string) => void;
}

export default function Navbar({ search, setSearch, filter, setFilter }: NavbarProps ) {

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  return (
   <div className="flex gap-3 items-center mb-4">
            <input
                type="text"
                placeholder="Search by title, director, or location..."
                value={search}
                onChange={handleSearchChange}
                className="border rounded-md px-3 py-2 w-full"
            />
            <select
                value={filter}
                onChange={handleFilterChange}
                className="border rounded-md px-3 py-2"
            >     
                <option value="">All</option>
                <option value="MOVIE">Movies</option>
                <option value="TV_SHOW">TV Shows</option>
            </select>
    </div>
    
  );
}

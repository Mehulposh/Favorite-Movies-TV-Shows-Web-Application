import React, { useRef, useEffect }  from 'react'

const MediaTable = () => {
  return (
    <div className="bg-white shadow rounded">
        <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
            <tr>
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Director</th>
                <th className="p-2 text-left">Budget</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Duration</th>
                <th className="p-2 text-left">Year</th>
                <th className="p-2 text-left">Actions</th>
            </tr>
            </thead>
        </table>
    </div>
  )
}

export default MediaTable
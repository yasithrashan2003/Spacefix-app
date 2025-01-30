// src/components/StudentDashboard.jsx

import React, { useEffect, useState } from 'react';

const StudentDashboard = () => {
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    const fetchLiveCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/live-count");
        const data = await response.json();
        setLiveCount(data.headcount);
      } catch (error) {
        console.error("Error fetching live count:", error);
      }
    };

    // Poll the API every second to get the live count
    const interval = setInterval(fetchLiveCount, 500);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div>
      <h1>Welcome to the Student Dashboard</h1>
      <h2>Live Count: {liveCount}</h2>
    </div>
  );
};

export default StudentDashboard;

// import React from 'react';
// import { LiveHeadcount } from './LiveHeadcount';

// export const StudentDashboard = () => {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
//       <div className="grid gap-4 md:grid-cols-2">
//         <LiveHeadcount />
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
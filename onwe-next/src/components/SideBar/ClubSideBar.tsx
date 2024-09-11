// "use client";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "@clerk/nextjs";
// import useSWR from "swr";
// import ClubCard from "../clubs/ClubCard";
// import { ClubCardProps } from "@/types/type";

// // interface Club {
// //   id: string;
// //   name: string;
// //   image: string;
// // }
// const fetcher = async (url: string, token: string) => {
//   const response = await axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "ngrok-skip-browser-warning": "69420",
//     },
//   });
//   return response.data;
// };

// const ClubSideBar = () => {
//   const [myClubs, setMyClubs] = useState<ClubCardProps[]>([]);
//   const { getToken } = useAuth();
//   const [token, setToken] = useState<string | null>(null);

//   // useEffect(() => {
//   //   // Fetch magazines from API when the component mounts
//   //   const fetchMyClubs = async () => {
//   //     try {
//   //       const token = await getToken();
//   //       const response = await axios.get(
//   //         `${process.env.NEXT_PUBLIC_API_URL}/myclubs`,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //             "ngrok-skip-browser-warning": "69420",
//   //           },
//   //         }
//   //       );
//   //       setMyClubs(response.data);
//   //       console.log(response.data);

//   //     } catch (error) {
//   //       console.error("Error fetching magazines:", error);
//   //     }
//   //   };

//   //   fetchMyClubs();
//   // }, [getToken]); // Make sure to include getToken in the dependency array

//   useEffect(() => {
//     const fetchToken = async () => {
//       const fetchedToken = await getToken({ template: "test" });
//       setToken(fetchedToken);
//     };
//     fetchToken();
//   }, [getToken]);

//   const { data, error } = useSWR(
//     token ? `${process.env.NEXT_PUBLIC_API_URL}/myclubs` : null,
//     (url) => fetcher(url, token!)
//   );

//   useEffect(() => {
//     if (data) {
//       setMyClubs(data);
//     }
//   }, [data]);

//   return (
//     <div className="h-screen w-full flex flex-col border">
//       <div className="flex items-center border-b h-[8vh] ">
//         <h1 className="text-2xl font-bold pl-8">MY CLUBS</h1>
//       </div>
//       <div className="flex flex-col overflow-y-auto space-y-2 mt-4">
//         {myClubs.map((club) => (
//           <ClubCard key={club.id} club={club} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClubSideBar;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";
import ClubCard from "../clubs/ClubCard";
import { ClubCardProps } from "@/types/type";
import { ChevronLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import SearchC from "../SearchC";
const fetcher = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return response.data;
};

const ClubSideBar = ({ closeSidebar }: { closeSidebar: () => void }) => {
  const [myClubs, setMyClubs] = useState<ClubCardProps[]>([]);
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [showSearchArea, setShowSearchArea] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken({ template: "test" });
      setToken(fetchedToken);
    };
    fetchToken();
  }, [getToken]);

  const { data, error } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/myclubs` : null,
    (url) => fetcher(url, token!)
  );

  useEffect(() => {
    if (data) {
      setMyClubs(data);
    }
  }, [data]);

  return (
    <div className="h-screen w-full flex flex-col border">
      <div className="flex items-center border-b h-[8vh] relative">
        <div className="bg-[#f1f1f1]  w-80 rounded-3xl h-10 ml-7 flex items-center justify-between pr-4">
          <input
            type="text"
            placeholder="Search clubs"
            className="bg-transparent pl-4 outline-none"
            onFocus={() => setShowSearchArea(true)}
            onBlur={() => setShowSearchArea(false)}
          />
          <ArrowRight />
        </div>
        <button className="absolute right-4 sm:hidden" onClick={closeSidebar}>
          <ChevronLeft />
        </button>
        {showSearchArea && (
          <div className="w-80 h-[calc(100dvh-4rem)] p-3 absolute   top-14  bg-white border rounded ">
            <p>search result will be shown here</p>
          </div>
        )}
      </div>
      <div className="overflow-y-auto">
        <div className="flex flex-col overflow-hidden space-y-2 mt-4">
          {myClubs.map((club) => (
            <ClubCard key={club.id} club={club} showJoin={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubSideBar;

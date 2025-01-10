import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import useGetConversation from "../hooks/useGetConversation";
import toast from "react-hot-toast";
import { MdPersonSearch } from "react-icons/md";

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();

  const handleSearch = () => {
    if (!searchTerm) return;
    if (searchTerm.length < 3) {
      return toast.error("Search term should be at least 3 characters long");
    }
    const filteredConversations = conversations.filter((c) => {
      return c.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (filteredConversations.length > 0) {
      setSelectedConversation(filteredConversations[0]); // Vous pouvez ajuster pour gérer plusieurs résultats si nécessaire
      setSearchTerm("");
    } else {
      toast.error("No conversation found!");
    }
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex w-full h-10">
        <input
          type="text"
          className="input input-bordered grow h-full" // Utilisation de h-full pour donner la même hauteur
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Mise à jour du terme de recherche
        />
        <button
          onClick={handleSearch} // Déclenche la recherche au clic
          className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg flex items-center justify-center ml-2 h-full" // Utilisation de h-full ici aussi
          aria-label="Search"
        >
          <MdPersonSearch size={18} />
        </button>
      </div>
    </div>
  );
};

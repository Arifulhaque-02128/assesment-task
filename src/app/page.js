'use client'
import RepoCards from "@/Components/RepoCards";
import { useEffect, useState } from "react";

export default function Home() {

  const [myRepos, setMyRepos] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [lang, setLang] = useState([]);

  const [currentLang, setCurrentLang] = useState("");


  const extractLanguages = (allrepo) => {
    const uniqueLang = [...new Set(allrepo.map((repo) => repo.language))]
    setLang(uniqueLang);
  }

  useEffect (() => {

    const fetchRepos = async () => {
      const res = await fetch("https://api.github.com/orgs/themefisher/repos?per_page=100&page=1");

      if(!res.ok) {
        throw new Error("HTTP Error!");
      }

      const repos = await res.json();
      console.log("REPOS :::", repos);

      setMyRepos(repos);
      extractLanguages(repos);
    }

    fetchRepos();

  }, []);

  const handleSearchBtn = () => {

    const filteredContents = myRepos.filter((rep) => rep.full_name.toLowerCase().includes(searchValue.toLowerCase()) );
    
    if(filteredContents) {
      setFilteredRepos(filteredContents);
      setSearchValue("");
    }
  }

  console.log("current lang : :", currentLang);

  return (
    <div>

      {/* Header */}
      <div className="w-full bg-gray-300 p-4 rounded-md">
        ThemeFisher Github Contents
      </div>

      {/* Search Bar */}
      <div className="flex flex-row gap-3 justify-center items-center mx-4 my-12">
        <input className="p-2 border-2 rounded-md" 
        placeholder="Search By Name"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        />
        <button className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-md"
        onClick={handleSearchBtn}
        > Search </button>
      </div>

      {/* Filter by Language */}

      <div className="flex flex-col justify-center items-center my-8"> 
        <div> 

          <label className="block text-xl font-bold"> Select Language </label>
          <select className="w-xl bg-blue-50 p-4"
          value={currentLang} 
          onChange={(e) => setCurrentLang(e.target.value)}
          > 

            {
              lang.map((item) => {
                return (
                  <option key={item} value={item} className="z-50 p-2" >
                    {
                      item
                    }
                  </option>
                  )

              })
            }

          </select>

        </div>
        
      </div>

      {/* Showing Repos */}

      <RepoCards repos={filteredRepos.length > 0 ? filteredRepos : myRepos} />



    </div>
  );
}

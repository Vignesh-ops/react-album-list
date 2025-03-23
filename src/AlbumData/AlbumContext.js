import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AlbumContext = createContext();



const AlbumDataProvider = ({ children }) => {

    const [albums, setAlbums] = useState([]); 
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const [error,setError] = useState(false);
    const [isloading,setloading] = useState(true)
    const [selectedAlbum, setSelectedAlbum] = useState(null);

     const formatSize = (bytes) => {
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const formatDurationString = (timeStr) => {
        const [hh, mm, ss] = timeStr.split(":").map(Number); 
    
        const totalMinutes = hh * 60 + mm; 
        const seconds = ss; 
    
        return `${totalMinutes} minutes ${seconds} seconds`;
    };
    
     const formatDuration = (seconds) => {
        let hrs = Math.floor(seconds / 3600);
        let remainingSeconds = seconds % 3600;
        let mins = Math.floor(remainingSeconds / 60);
        let secs = remainingSeconds % 60;
    
        return [hrs, mins, secs].map(v => String(v).padStart(2, "0")).join(":");
    };
    
    
    
     const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };
    


    const fetchAlbums = async () => {
        try {
            setloading(true)
            const response = await axios.get("http://localhost:5000/collections");
            setAlbums(response.data || []);
        } catch (err) {
            setError(err);
            console.error("Error fetching data:", err);
        } finally{
            setloading(false)
        }
    };

     const fetchAlbumDetails = async (id) => {
        try {
            setloading(true)
            const response = await axios.get(`http://localhost:5000/collectionDetails/${id}`);
            setSelectedAlbum(response.data);
        } catch (err) {
            setError(err);
            console.error(" Error", err);
        } finally{
            setloading(false)

        }
    };
    useEffect(() => {
        fetchAlbums();
    }, []);


    console.log(albums,"albums")
    const filteredAlbums = Array.isArray(albums)
    ? albums.filter(album =>
        (filter ? album.type === filter : true) &&
        (search ? album.name.toLowerCase().includes(search.toLowerCase()) : true)
    )
    : albums;

    console.log("Filtered Albums:", filteredAlbums);

    return (
        <AlbumContext.Provider value={{ 
            isloading, error, filteredAlbums, fetchAlbumDetails,
            selectedAlbum, setSelectedAlbum, 
            filter, setFilter, 
            search, setSearch, 
            formatDate, formatDuration, formatSize ,formatDurationString
        }}>
            {children}
        </AlbumContext.Provider>
    );
};

export default AlbumDataProvider;

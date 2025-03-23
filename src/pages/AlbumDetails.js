import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AlbumContext } from "../AlbumData/AlbumContext";
const AlbumDetails = () => {
    const { id } = useParams();
    const { selectedAlbum, fetchAlbumDetails, formatSize, formatDuration,formatDate,formatDurationString } = useContext(AlbumContext);
    let totalDuration = 0;
    let totalBytes = 0;
    useEffect(() => {
        fetchAlbumDetails(id);

    }, [id]);



    if (selectedAlbum) {
        totalDuration = selectedAlbum.songs.reduce((sum, song) => {
            return sum + song.durationInSeconds;
        }, 0);
        totalBytes = selectedAlbum.songs.reduce((sum, song) => {
            return sum + song.sizeInBytes;
        }, 0);
    }

    console.log("Total Duration:", totalDuration, totalBytes);

    if (!selectedAlbum) return <h2>Loading...</h2>;

    return (
        <div>
            {selectedAlbum && (
                <div>
                    <div className="view-head">
                        <h1>{selectedAlbum.name}</h1>
                    </div>
                    <div className="tbl-cont">
                    <div className="tbl-head">
                        <table>
                            <thead>
                                <tr>
                                    <th>Artist:</th>
                                    <th>Type</th>
                                    <th>Song Count</th>
                                    <th>Total Size</th>
                                    <th>Total duration</th>
                                    <th>Released On</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={selectedAlbum.id}>
                                    <td>{selectedAlbum.artist}</td>
                                    <td>{selectedAlbum.type}</td>
                                    <td>{selectedAlbum.songCount}</td>
                                    <td>{formatSize(totalBytes)}</td>
                                    <td>{formatDurationString(formatDuration(totalDuration))}</td>
                                    <td>{formatDate(selectedAlbum.releasedOn)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <table className="tbl-data">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Performers</th>
                                <th>Duration</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedAlbum.songs.map((song, index) => (
                                <tr key={index}>
                                    <td>{song.title}</td>
                                    <td>{song.performers.join(", ")}</td>
                                    <td>{formatDuration(song.durationInSeconds)}</td>
                                    <td>{formatSize(song.sizeInBytes)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
</div>
                </div>
            )}
        </div>
    );
};

export default AlbumDetails;

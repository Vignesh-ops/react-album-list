import { Link } from "react-router-dom";
import { useContext } from "react";
import viewicon from '../assets/eye.jpeg'
import { AlbumContext } from "../AlbumData/AlbumContext";
const LandingPage = () => {
    const { isloading, error, filteredAlbums, setFilter, setSearch, filter, search, formatDuration, formatDate, formatSize } = useContext(AlbumContext);


    return (
        <div className="container">
            <h1 className="title">Overview</h1>

            <div className="album-cont">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select className="filter" onChange={(e) => setFilter(e.target.value)} value={filter}>
                        <option value="">All Types</option>
                        <option value="Album">Album</option>
                        <option value="EP">EP</option>
                        <option value="Single">Single</option>
                    </select>
                </div>



                <table className="table">
                    <thead className="table-head">
                        <tr >
                            <th>Collection Name</th>
                            <th>Type</th>
                            <th>Song Count</th>
                            <th>Duration</th>
                            <th>Size</th>
                            <th>Released On</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredAlbums.length > 0 ? (
                            filteredAlbums.map((album) => (
                                <tr key={album.id}>
                                    <td>
                                        <div className="collection-name">{album.name}</div>
                                        <div className="artist-name">{album.artist}</div>
                                    </td>
                                    <td>{album.type}</td>
                                    <td>{album.songCount}</td>
                                    <td>{formatDuration(album.durationInSeconds)}</td>
                                    <td>{formatSize(album.sizeInBytes)}</td>
                                    <td>{formatDate(album.releasedOn)}</td>
                                    <td>
                                        <div className="view-cont">
                                            <img src={viewicon} className="view-img"></img>
                                            <Link to={`/collectionDetails/${album.id}`}>view more</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr style={{ textAlign: 'center' }}>
                                {isloading && (<td colSpan="6" className="loading">Loading...</td>)}
                                {error && <td colSpan="6" className="error">  {error.message}</td>}

                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LandingPage;

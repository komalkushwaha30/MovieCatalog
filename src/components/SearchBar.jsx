function SearchBar( {setSearch, setCurrentPage}){

    function handleSeach(e){
        setSearch(e.target.value)
        setCurrentPage(0)
        
    }
    
    return(
        <>
            <div className="searchbar">
                
                <input className="searchbar-input" type="text" placeholder="Enter the title or any other attribute" onChange={(e)=>handleSeach(e)} />
            </div>
        </>
    )

}
export default SearchBar;
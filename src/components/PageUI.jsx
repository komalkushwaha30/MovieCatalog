
function PageUI({totalPages , handlePage, setCurrentPage, curretpage, darkMode}){
    
    
    // make the arrayOfPages array coz we wanted to iterate over it 
    let arrayOfPages = []
    for(let i =0; i<totalPages; i++){
        arrayOfPages.push(i)
    }

    
    return(
            <div >
              <div className="page-ui">
                <div className="page-ui">
                  <>  
                    <button disabled={curretpage<=0} onClick={()=>setCurrentPage((prev)=>prev-1)}>previous</button>
                    <div>
                        {arrayOfPages.map((item)=>(
                            <button onClick={()=>handlePage(item)} className={`btn ${curretpage==item ? "active-page": ""}`}>{item}</button>
                        ))}
                    </div>
                    <button disabled={curretpage == totalPages-1 } onClick={()=>setCurrentPage((prev)=>prev+1)} >Next</button>
                  </>
                </div>
              </div>
            </div>
        )
    
}
export default PageUI;
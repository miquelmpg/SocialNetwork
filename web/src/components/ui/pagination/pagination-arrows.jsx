function PaginationArrows({ numPage, subtractOneTpoPage, addOneToPage, posts, home, detail }) {
    return (
        <>
            {home && <div className="d-flex justify-content-around align-items-center">
                    <div className={`fa fa-arrow-left btn btn-outline-light btn-sm rounded-pill align-content-center ${numPage === 1 ? 'disabled' : ""}`} disabled={numPage === 1} style={{height: '60px', width: '60px'}} role="button" onClick={() => subtractOneTpoPage()}></div>
                    <div className="text-white fs-5">{numPage}</div>
                    <div className={`fa fa-arrow-right btn btn-outline-light btn-sm rounded-pill align-content-center ${posts.length === 0  ? 'disabled' : ""}`} style={{height: '60px', width: '60px'}} role="button" onClick={() => {addOneToPage((prev) => prev + 1)}}></div>
            </div>}

            {detail && <div className="d-flex align-items-center gap-5 rounded-5 p-2" style={{backgroundColor: '#202020'}}>
                    <div className={`fa fa-arrow-left btn btn-outline-light btn-sm rounded-pill align-content-center`} disabled={numPage === 1} style={{height: '60px', width: '60px'}} role="button" onClick={() => subtractOneTpoPage()}></div>
                    <div className="text-white fs-5">{numPage + 1} / {posts.length}</div>
                    <div className={`fa fa-arrow-right btn btn-outline-light btn-sm rounded-pill align-content-center`} style={{height: '60px', width: '60px'}} role="button" onClick={() => {addOneToPage((prev) => prev + 1)}}></div>
            </div>}
        </>
    );
};

export default PaginationArrows;
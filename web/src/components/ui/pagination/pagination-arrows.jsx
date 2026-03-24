function PaginationArrows({ numPage, subtractOneTpoPage, addOneToPage, posts }) {
    return (
        <div>
            <div>Current Page:</div>
                <div className="d-flex gap-2">
                <div className={`fa fa-arrow-left btn btn-outline-dark btn-sm rounded-pill align-self-center ${numPage === 1 ? 'disabled' : ""}`} disabled={numPage === 1} style={{ width: '50px', height: 'auto'}} role="button" onClick={() => subtractOneTpoPage()}></div>
                {numPage}
                <div className={`fa fa-arrow-right btn btn-outline-dark btn-sm rounded-pill align-self-center ${posts.length === 0  ? 'disabled' : ""}`} style={{ width: '50px', height: 'auto'}} role="button" onClick={() => {addOneToPage((prev) => prev + 1)}}></div>
            </div>
        </div>
    );
};

export default PaginationArrows;
function PostDateFilter({ value, setDate, initial, final }) {
    return (
        <>
            {initial && <div>
                            <input
                                className="form-select rounded-pill mx-auto"
                                style={{width: '150px'}}
                                type="text"
                                name="date"
                                value={value}
                                placeholder='YYYY-MM-DD'
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={(e) => e.target.value ? setDate(`${e.target.value}`) : setDate('')}/>
                        </div>}
            {final && <div>
                            <input
                                className="form-select rounded-pill mx-auto"
                                style={{width: '150px'}}
                                type="text"
                                name="date"
                                value={value}
                                placeholder='YYYY-MM-DD'
                                pattern="\d{4}-\d{2}-\d{2}"
                                onChange={(e) => e.target.value ? setDate(`${e.target.value}`) : setDate('')}/>
                        </div>}
        </>
        
    );
    
}

export default PostDateFilter;
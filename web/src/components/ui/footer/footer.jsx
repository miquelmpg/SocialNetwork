import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../../../contexts/auth-context';
import * as ApiService from '../../../services/api-service';
import { useEffect, useState } from "react";
import PaginationArrows from '../pagination/pagination-arrows';
import socialMedia from '../../../assets/icons/socialNetwork.png'

function Footer({ numPage, setNumPage, posts }) {
    const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    
    function addOneToPage() {
        posts.length === 0 ? (setNumPage((prev) => prev - 1), scrollToTop()) : (setNumPage((prev) => prev + 1), scrollToTop());
    }

    function subtractOneTpoPage() {
        numPage === 1 ? setNumPage(1) : setNumPage((prev) => prev - 1);
    }

    return (
        <div className="rounded-5 p-2" style={{backgroundColor: '#202020'}}>
            <PaginationArrows numPage={numPage} addOneToPage={addOneToPage} subtractOneTpoPage={subtractOneTpoPage} posts={posts} home />
        </div>
    );
}

export default Footer;
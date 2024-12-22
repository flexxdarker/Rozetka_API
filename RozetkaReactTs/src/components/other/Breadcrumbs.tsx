import React from 'react';
import "../../styles.css"
import {Link, useLocation} from "react-router-dom";

const Breadcrumbs : React.FC = () => {
    const location = useLocation();

    let currentLink = '';

    const crumbs =
        location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            currentLink += `/${crumb}`;
            crumb = crumb.replace(/[-]/g, ' ').toLowerCase();
           // currentLink =+ `/${crumb}`;//?????????????????????????????

            return (
                <div className="crumb" key={crumb}>
                    <Link to={currentLink}>{String(crumb[0].toUpperCase()) + String(crumb.slice(1))}</Link>
                </div>
            )
        })

    return (
        <div className="breadcrumbs">{crumbs}</div>
    );
};

export default Breadcrumbs ;

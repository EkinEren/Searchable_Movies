import React from 'react';
import { Icon } from 'antd';

function Footer() {

    return (
        <div>
            <Icon type="gitlab" style={{ fontSize: '23px', color: '#08c' }} theme="outlined" />
            <p> Search Movie By Title - Powered by OMDB API</p>
        </div>
    );

}

export default Footer;
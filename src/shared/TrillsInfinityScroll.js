import React from 'react';
import _ from 'lodash';

const TrillsInfinityScroll = (props) => {
    const { callNext, is_next } = props;

    const handleScroll = _.throttle(() => {

        const {innerHeight} = window; // 브라우저 높이
        const {scrollHeight} = document.body; // 웹사이트 body 높이

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop; // Scroll Top 위치
 
        if(scrollHeight - innerHeight - scrollTop < 800) {
            callNext();
        }
        
    }, 300);

    React.useEffect(() => {
        if(!is_next){
            window.addEventListener('scroll', handleScroll);
        } else {
            window.removeEventListener('scroll', handleScroll);
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, [is_next]);

    return (
        <>
            {props.children}
        </>
    );
};

export default TrillsInfinityScroll;
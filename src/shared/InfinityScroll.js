import React from 'react';
import _ from 'lodash';

const InfinityScroll = (props) => {
    const { callNext, is_next } = props;

    const handleScroll = _.throttle(() => {

        const {innerHeight} = window;
        const {scrollHeight} = document.body;

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
 
        if(scrollHeight - innerHeight - scrollTop < 200) {
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

export default InfinityScroll;
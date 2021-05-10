import React from 'react';
import _ from 'lodash';

const InfinityScroll = (props) => {
    const {callNext, is_next, loading} = props;

    const handleScroll = _.throttle(() => {

        const {innerHeight} = window;
        const {scrollHeight} = document.body;

        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
 
        if(scrollHeight - innerHeight - scrollTop < 200){
            callNext();
        }
        
    }, 300);

    //const handleScroll = useCallback(_handleScroll, [loading]); // 메모이제이션

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
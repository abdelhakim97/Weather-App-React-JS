import { useEffect } from 'react';


export default function ScrollToBottom(props) {
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            window.scrollTo(0, document.body.scrollHeight);
        };

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    return null; 
}

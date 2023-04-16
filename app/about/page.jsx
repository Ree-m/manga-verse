'use client'

import { useCountContext } from "../context/count";

const AboutPage = () => {
    const {count,setCount}=useCountContext(1);
    return ( 
        <div>about{count}</div>
     );
}
 
export default AboutPage;
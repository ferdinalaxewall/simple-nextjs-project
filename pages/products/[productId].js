import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const ProductDetail = () => {
    const router = useRouter();
    const { productId } = router.query;

    const { data, error } = useSWR(`https://dummyjson.com/products/${productId}`, fetcher);
    if(error) return <div>Failed to load</div>
    if(!data) return <div>Loading...</div>
    
    // const [name, setName] = useState([]);
    // const [price, setPrice] = useState([]);
    // console.log(productId)

    // useEffect(() => {
    //     const getProductById = async () =>  {
    //         const response = await fetch(`http://localhost:5000/products/${productId}`);
    //         const data = await response.json();
            
    //         setName(data.name);
    //         setPrice(data.price);
    //     }
    //     getProductById();
    // }, [productId]);

  return (
    <div>
        {data.title} - {data.price}
    </div>
  )
}

export default ProductDetail

// Server Side Rendering

// export const getServerSideProps = async ({params}) => {
//     const response = await fetch(`http://localhost:5000/products/${params.productId}`);
//     const data =  await response.json();
    
//     if(!data.id){
//         return {
//             notFound : true
//         }
//     }

//     return {
//         props : {
//             product : data
//         }
//     }
// }
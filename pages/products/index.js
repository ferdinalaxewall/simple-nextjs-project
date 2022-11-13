import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Products = () => {
    const { data, error } = useSWR('https://dummyjson.com/products?limit=20', fetcher);
    if(error) return <div>Failed to load</div>
    if(!data) return <div>Loading...</div>
    
    // Standard Client Data Fetching
    
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     const getProducts = async () =>  {
    //         const response = await fetch("http://localhost:5000/products");
    //         const data = await response.json();

    //         setProducts(data)
    //     }
    //     getProducts();
    // }, []);

  return (
    <div>
        <h1> Product List </h1>
        {data.products.map((item) => (
            <ul key={item.id}>
                <li><Link href={`/products/${item.id}`}>{item.title} - {item.price}</Link></li>
            </ul>
        ))}
    </div>
  )
}

export default Products;


// Server Side Rendering
// export const getServerSideProps = async () => {
//     const response = await fetch("http://localhost:5000/products");
//     const data = await response.json();
//     console.log(data)

//     return {
//         props : {
//             products : data
//         }
//     }
// }
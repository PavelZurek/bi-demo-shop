import {FC, useEffect, useState} from 'react';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/ProductService';

export const ProductList: FC = () => {
    const [data, setData] = useState<Product[]>([]);

    const fetchData = async () => {
        try {
            const svc = new ProductService();
            const { data } = await svc.getProducts();
            setData(data);
        } catch (e) {
            // TODO: handle error
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {data.map(product => (
                <div key={`prod.${product.id}`}>
                    {product.name}
                </div>
            ))}
        </>
    )
}

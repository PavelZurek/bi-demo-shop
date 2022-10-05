import {FC, useState} from 'react';
import {useProducts} from '../../hooks/useProducts';
import {Pagination} from '../Pagination';

export const ProductList: FC = () => {
    const [page, setPage] = useState(1)

    const perPage = 6;
    const userList = useProducts(perPage, (page-1)*perPage);
    const pageCount = userList.data?.count ? Math.ceil(userList.data.count / perPage) : 0;

    return (
        <>
            {userList.isLoading ? 'Loading...' : userList.data && userList.data.data.map(product => (
                <div key={`prod.${product.id}`}>
                    {product.name}
                </div>
            ))}
            <Pagination page={page} pageCount={pageCount} setPage={setPage} />
        </>
    )
}

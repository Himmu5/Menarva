import { FC } from 'react'
import { UpdateProduct } from '../../public';

type P = {}

const UpdateProductDetails: FC<P> = () => {
    return <form>
        <h1>Update Product Details</h1>
        <img src={UpdateProduct} alt="form Image" />
    </form>
}
export default UpdateProductDetails;
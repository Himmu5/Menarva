import { FC } from 'react'
import UpdateProductDetails from './UpdateProductDetails'

type P = {}

const data = [{ title: "Vegetable and Fruits", fruits: ["Apple", "Passion Fruit", "Cantaloupe", "Taro"] },
{ title: "Coffee and Essentials", fruits: ["Matcha", "Coffee Beans", "Coffee Matte", "Black Tapioca Balls", "Mayonnaise", "Brown Sugar"] },
{ title: "Tea", fruits: ["Caramel Earl Grey Tea", "Taiwan Black Tea", "Jasmine Green Tea", "Chocolate Bubble Tea"] },
{ title: "Syrups and Puree", fruits: ["Apple", "Passion Fruit", "Cantaloupe", "Taro"] }]

const Inventory: FC<P> = () => {



    return <div className='m-4 text-sm space-y-4'>

        {/* {
            data.map((options) => {
                return <Option fruits={options.fruits} title={options.title} />
            })
        } */}
        <UpdateProductDetails />

    </div>
}
export default Inventory;
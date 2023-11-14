import { FC, useState } from 'react'
import UpdateProductDetails from './UpdateProductDetails'
import Option from './Option'
import Slider from './Slider'

type P = {}

const data = [{ title: "Vegetable and Fruits", fruits: ["Apple", "Passion Fruit", "Cantaloupe", "Taro"] },
{ title: "Coffee and Essentials", fruits: ["Matcha", "Coffee Beans", "Coffee Matte", "Black Tapioca Balls", "Mayonnaise", "Brown Sugar"] },
{ title: "Tea", fruits: ["Caramel Earl Grey Tea", "Taiwan Black Tea", "Jasmine Green Tea", "Chocolate Bubble Tea"] },
{ title: "Syrups and Puree", fruits: ["Apple", "Passion Fruit", "Cantaloupe", "Taro"] }]

const Inventory: FC<P> = () => {

    const [isVisible, setVisible] = useState(false);


    return <div className='m-4 text-sm space-y-4 '>
        <div className='w-1/3 h-full'></div>
        {
            setVisible && < div className='w-1/3'>
                <Slider setVisible={setVisible} isVisible={isVisible} />
            </div>
        }

        <div className='w-2/3 flex flex-col gap-4'>
            {
                data.map((options) => {
                    return <Option fruits={options.fruits} title={options.title} />
                })
            }
        </div>
        {/* <UpdateProductDetails /> */}

    </div >
}
export default Inventory;
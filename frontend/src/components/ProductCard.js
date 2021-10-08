import * as React from 'react';
import styles from '../styles/productCard.module.css'
import { MdShoppingCart } from "react-icons/md"
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { connect } from "react-redux";

const ProductCard = (props) => {

    let products = [
        {
            img: '/assets/pizzas.jpeg',
            name: 'nombre producto',
            category: 'categoria',
            description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
            price: '550',
            ingredients: 'jamon, tomate, muzzarella',
            stock: 'ni idea',
        },
        {
            img: '/assets/pizzas.jpeg',
            name: 'nombre producto',
            category: 'categoria',
            description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
            price: '550',
            ingredients: 'jamon, tomate, muzzarella',
            stock: 'ni idea',
        },
        {
            img: '/assets/pizzas.jpeg',
            name: 'nombre producto',
            category: 'categoria',
            description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
            price: '550',
            ingredients: 'jamon, tomate, muzzarella',
            stock: 'ni idea',
        },
        {
            img: '/assets/pizzas.jpeg',
            name: 'nombre producto',
            category: 'categoria',
            description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
            price: '550',
            ingredients: 'jamon, tomate, muzzarella',
            stock: 'ni idea',
        },
        {
            img: '/assets/pizzas.jpeg',
            name: 'nombre producto',
            category: 'categoria',
            description: 'Acá va a ir toda la descripción del producto que quieran comprar la gentessss',
            price: '550',
            ingredients: 'jamon, tomate, muzzarella',
            stock: 'ni idea',
        },
    ]
        
    products = [...products, ...products, ...products, ...products, ...products, ...products]
    return (
        <>
            <div className={styles.products}>
                {products.map((product, index) => 

                <div className={styles.product} key={index}>
                    <div className={styles.productBox}>
                        <div className={styles.productImg} style={{ backgroundImage: `url("${product.img}")` }}></div>
                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>{product.name}</h3>
                            <div></div>
                            <p className={styles.productDesc}>{product.description}</p>
                            <p className={styles.productIng}>{product.ingredients}</p>
                        </div>
                    </div>
                    <hr className={styles.line}></hr>
                    <div className={styles.priceBox}>
                        <p className={styles.price}><span className={styles.priceTitle}>Price: </span>$ {product.price}</p>
                        <div className={styles.calification}>
                        <Stack spacing={1}>
                            {!props.user ? <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /> : <Rating className={styles.rating} style={{ backgroundColor: 'yelow'}} name="half-rating" defaultValue={2.5} precision={0.5} />}
                        </Stack>
                        </div>
                    </div>
                    <button className={styles.addBtn}><MdShoppingCart style={{ color: 'white', fontSize: '1.8em', marginRight: '5%' }}/> +</button>
                </div>
            )}
        </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
    }
}

export default connect(mapStateToProps)(ProductCard)
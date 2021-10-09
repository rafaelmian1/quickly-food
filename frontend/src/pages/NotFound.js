import { Link } from "react-router-dom"
import styles from '../styles/notFound.module.css'

const NotFound = () => {
    return (
        <main className={styles.main}>
            <img className={styles.img} src="assets/error.jpg"/>
            <div className={styles.div}>
                <h1 className={styles.h1}>Parece que te has perdido!</h1>
                <p className={styles.p}>Te ayudamos a volver :)</p>
                <Link to="/" className={styles.button}>Volver a Home</Link>
            </div>
        </main>
    )
}

export default NotFound
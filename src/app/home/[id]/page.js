import styles from './page.module.css'

export default function asdasd({params}) {
  return (
    <main className={styles.main}>
      <h1>{params.id}</h1>
    </main>
  )
}
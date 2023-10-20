import RootLayout from './layout'
import Image from 'next/image'
import styles from './page.module.scss'

import logoImg from '../../../frontend/public/android-chrome-192x192.png'

import { Input } from '../component/ui/input/index'

export default function MinhaPagina() {
  return (
    <RootLayout title="FoodieFlow - Login">
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="FoodieFlow Pedidos" />
        <div className={styles.login}>
          <form>
            <Input
              placeholder='Digite seu email'
              type='text'
            />
            <Input
              placeholder='Digite sua senha'
              type='password'
            />
          </form>
        </div>

      </div>
    </RootLayout>
  )
}

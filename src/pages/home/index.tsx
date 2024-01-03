import { FormEvent, useEffect, useState } from 'react'
import styles from './home.module.css'
import { BiSearch } from 'react-icons/bi'
import { Link , useNavigate} from 'react-router-dom'

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarkert: string;
  numberDelta24h: number;
}

interface DataProps {
  coins: CoinProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([])
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      fetch('https://sujeitoprogramador.com/api-cripto/?key=7dc9235ac84b9710&pref=BRL')
        .then(response => response.json())
        .then((data: DataProps) => {
          const coinsData = data.coins.slice(0, 15);

          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          })

          const formatResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarkert: price.format(Number(item.market_cap)),
              numberDelta24h: parseFloat(item.delta_24h.replace(",","."))
      
            }
            return formated;
          })
          setCoins(formatResult);
        })
        .catch((err) => {
          console.log(err);
        })
    }

    getData();
  }, [])

  function handleSearch(e: FormEvent){
    e.preventDefault();
    if(inputValue === "") return;
    navigate(`/detail/${inputValue}`)
  }



  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          placeholder='Digite o simbolo da moeda: BTC...'
          value={inputValue}
          onChange={ (e) => setInputValue(e.target.value)}
        />
        <button type='submit'>
          <BiSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>

        

        <tbody id="tbody">
          {coins.map(coin => (
            <tr key={coin.name} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <Link className={styles.link} to={`./detail/${coin.symbol}`}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>
              <td className={styles.tdLabel} data-label="Mercado">
               {coin.formatedMarkert} 
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {coin.formatedPrice}
              </td>
              <td className={coin.numberDelta24h >= 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume">
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ))}
          
        </tbody>


      </table>
    </main>

  )
}
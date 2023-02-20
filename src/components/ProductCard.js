import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { useCart } from 'react-use-cart';
import { BsCartPlus } from 'react-icons/bs'

const ProdectCard = (props) => {
      let { title, release_date, id, vote_average, poster_path, original_title, original_language, overview, popularity, genre_ids, vote_count } = props.data;
      const [theme] = useThemeHook();
      const { getItem, updateItem } = useCart();
      const { addItem } = useCart();
      const [price, setPrice] = useState();

      useEffect(() => {
            const savedPrice = localStorage.getItem(`product_${id}_price`);
            if (savedPrice) {
                  setPrice(parseInt(savedPrice));
            }
      }, [id]);

      const addToCart = () => {
            addItem({
                  id: id,
                  title: title,
                  price: price,
                  quantity: 1,
                  release_date: release_date,
                  poster_path: poster_path,
                  original_title: original_title,
                  original_language: original_language,
                  overview: overview,
                  popularity: popularity,
                  genre_ids: genre_ids,
                  vote_average: vote_average,
                  vote_count: vote_count,
            });
      };

      const item = getItem(id);
      const itemPrice = item ? item.price : null;

      function editPrice() {
            const newPrice = prompt('Enter a new price:');
            const parsedPrice = parseInt(newPrice, 10);

            if (isNaN(parsedPrice)) {
                  console.error('Invalid price');
                  return;
            }

            setPrice(parsedPrice);

            updateItem(id, { price: parsedPrice });

            // Save price in localStorage
            localStorage.setItem(`product_${id}_price`, parsedPrice);
      }

      return (
            <Card
                  style={{ width: '20rem', padding: '0px', margin: '10px', height: 'auto' }}
                  className={`${theme ? 'bg-light-black text-light' : 'bg-light text-black'} text-center p-0 overflow-hidden shadow  mb-4`}
            >
                  <div style={{ background: 'white', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 'ingerit' }}>
                        <div>
                              <Card.Img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} style={{ objectFit: 'cover', height: '500px' }} />
                        </div>
                  </div>

                  <Card.Body>
                        <Card.Title style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{title}</Card.Title>
                        <Card.Title>
                              THB <span className="h5">{price}</span>
                        </Card.Title>
                        <Card.Title>
                              <Button onClick={editPrice}>Edit price</Button>
                        </Card.Title>
                        <Button onClick={() => addToCart()} className={`${theme ? 'bg-dark-primary text-black' : 'bg-light-primary '}d-flex align-item-center m-auto border-0`}>
                              <BsCartPlus size="1.6rem" />
                              Add to cart
                        </Button>
                  </Card.Body>
            </Card>
      )
}




export default ProdectCard
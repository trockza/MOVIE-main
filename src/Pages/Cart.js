import React, { useState } from 'react';
import { Button, Container, Col, Row, Table } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import { BsCartCheck, BsCartX } from 'react-icons/bs'

const Cart = () => {
      const [theme] = useThemeHook();
      const {
            isEmpty,
            totalItems,
            items,
            updateItemQuantity,
            removeItem,
            emptyCart,
      } = useCart();

      const totalPrice = items.reduce((total, item) => {
            return total + item.price * item.quantity;
      }, 0);

      let reducePrice = 0;

      if (totalItems >= 3 && totalItems < 5) {
            reducePrice = (totalPrice * 90) / 100
      } else if (totalItems >= 5) {
            reducePrice = (totalPrice * 80) / 100
      } else {
            reducePrice = totalPrice
      }

      console.log("eeeeeeeee", items);




      function openPopUp() {
            const popupWindow = window.open('', 'PopUpWindow', 'height=500,width=500');

            const popupDocument = popupWindow.document;

            popupDocument.body.innerHTML = `
              <h1 style="color: #333; text-align: center;">โอนเงิน</h1>
              <p style="color: #666; text-align: center;">000 00 0000 ธนาคารกรุงเทพ นายรักพ่อ รักแม่</p>
              <p style="color: #333; text-align: center;">Total Price: THB. ${reducePrice}</p>
            `;

            popupDocument.body.style.backgroundColor = '#f8f8f8';

            const timerElement = popupDocument.createElement('div');
            timerElement.id = 'timer';
            popupDocument.body.appendChild(timerElement);

            let timer = 60;
            const interval = setInterval(() => {
                  timer--;
                  timerElement.innerHTML = `Timer: ${timer}`;
                  if (timer === 0) {
                        clearInterval(interval);
                        popupWindow.close();
                  }
            }, 1000);
      }






      const genre_to_text = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Science_Fiction",
            10770: "TV_Movie",
            53: "Thriller",
            10752: "War",
            37: "Western",
      }

      function getGenreText(genreNumber) {
            return genre_to_text[genreNumber] || 'Unknown';
      }



      return (
            <Container className='py-4 mt-5'>
                  <h1 className={`${theme ? 'text-light ' : 'text-light-primary'} my-5 text-center`}>
                        {isEmpty ? 'Your Cart is Empty' : 'The Cart'}
                  </h1>
                  <Row className='justify-content-center'>
                        <Table responsive="sm" striped bordered hover variant={theme ? 'dark' : 'light'} className="mb-5" >
                              <tbody>
                                    {items.map((item, index) => {
                                          return (
                                                <tr key={index}>
                                                      {console.log(item)}

                                                      <td>
                                                            <div style={{ background: "white", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "ingerit" }}>
                                                                  <div style={{ padding: ".5rem" }}>
                                                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} style={{ width: "200px", height: "auto" }} />
                                                                  </div>
                                                            </div>

                                                      </td>
                                                      <td>

                                                            <h6 style={{ width: "100px" }}>
                                                                  Name : {item.title} <br /> <br />Original name : {item.original_title} <br /> <br /> Score : {item.vote_average * 10} <br /> <br /> Genre : {getGenreText(item.genre_ids[0])}  {getGenreText(item.genre_ids[1])} {getGenreText(item.genre_ids[2])} {getGenreText(item.genre_ids[3])}
                                                            </h6>
                                                      </td>
                                                      <td style={{ whiteSpace: "pre-line", width: "14rem", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                            Story : {item.overview}


                                                      </td>
                                                      <td>THB {item.price}</td>
                                                      <td>Quantity ({item.quantity})</td>
                                                      <td>
                                                            <Button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} size='sm' className='ms-2' style={{ width: "30px" }}>-</Button>
                                                            <Button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} size='sm' className='ms-2' style={{ width: "30px" }}>+</Button>
                                                            <Button variant='danger' onClick={() => removeItem(item.id)} size='sm' className='ms-2' >Remove Item</Button>
                                                      </td>
                                                </tr>
                                          )
                                    })}

                              </tbody>
                        </Table>
                        {!isEmpty &&
                              <Row style={{ position: "flex", bottom: 0 }}
                                    className={`${theme ? 'bg-light-black text-light' : 'bg-light text-black'} justify-content-center w-100`}
                              >
                                    <Col className='py-2'>
                                          <h4>Total Movie: {totalItems}</h4>
                                    </Col>
                                    <Col className='py-2'>
                                          <h4>Original Price: THB. {totalPrice}</h4>
                                          <h4>Total Price: THB. {reducePrice}</h4>
                                    </Col>
                                    <Col className='p-0' md={4}>
                                          <Button variant='danger'
                                                className='m-2'
                                                onClick={() => emptyCart()}
                                          >
                                                <BsCartX size="1.7rem" />
                                                Clear Cart
                                          </Button>

                                          <Button variant='success'
                                                className='m-2'
                                                onClick={openPopUp}

                                          >
                                                <BsCartCheck size="1.7rem" />
                                                Buy Movie
                                          </Button>
                                    </Col>
                              </Row>
                        }

                  </Row>
            </Container>
      )
}

export default Cart
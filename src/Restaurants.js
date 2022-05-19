import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Table, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  let location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  let bor = urlParams.get("borough");

  useEffect(() => {
    if (bor == undefined) {
      fetch(
        `https://restaurant---api.herokuapp.com/api/restaurants?page=${page}&perPage=10`
      )
        .then((res) => res.json())
        .then((data) => {
          setRestaurants(data.restaurant);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(
        `https://restaurant---api.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${bor}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRestaurants(data.restaurant);
        });
    }
  }, [page, bor]);

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    setPage(page + 1);
  }

  if (
    restaurants == null ||
    restaurants == undefined ||
    restaurants.length == 0
  ) {
    return (
      <>
        <br />
        <Card border="dark" style={{ width: "70rem" }}>
          <Card.Header>
            <Card.Title>Loading Restaurants...</Card.Title>
          </Card.Header>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <br />
        <Card border="dark" style={{ width: "70rem" }}>
          <Card.Header>
            <Card.Title>Restaurant List</Card.Title>
            <Card.Text>
              Full list of restaurants. Optionally sorted by borough
            </Card.Text>
          </Card.Header>
        </Card>

        <br />
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr
                  key={restaurant._id}
                  onClick={() => {
                    navigate(`/restaurant/${restaurant._id}`);
                  }}
                >
                  <td>{restaurant.name}</td>
                  <td>
                    {restaurant.address.building} {restaurant.address.street}
                  </td>
                  <td>{restaurant.borough}</td>
                  <td>{restaurant.cuisine}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination Pagination>
            <Pagination.Prev onClick={() => previousPage()} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={() => nextPage()} />
          </Pagination>
        </div>
      </>
    );
  }
}

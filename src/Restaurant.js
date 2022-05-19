import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import { Card, CardDeck } from "react-bootstrap";

export default function Restaurant() {
  let { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://restaurant---api.herokuapp.com/api/restaurants/${id}`)
      .then((res) => res.json())
      .then(function (data) {
        setLoading(false);
        if (data.restaurant.hasOwnProperty("_id")) {
          setRestaurant(data.restaurant);
        } else {
          setRestaurant(null);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id]);

  if (restaurant == null || loading == true) {
    return (
      <>
        <br />
        <Card border="dark" style={{ width: "70rem" }}>
          <Card.Header>
            <Card.Text>Loading Restaurants...</Card.Text>
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
            <Card.Title>{restaurant.name}</Card.Title>
            <Card.Text>
              {restaurant.address.building} {restaurant.address.street}
            </Card.Text>
          </Card.Header>
        </Card>
        <br />

        <MapContainer
          style={{ height: "400px" }}
          center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />{" "}
          <Marker
            position={[
              restaurant.address.coord[1],
              restaurant.address.coord[0],
            ]}
          ></Marker>{" "}
        </MapContainer>

        <br />
        <h2>Ratings</h2>
        <hr />

        <CardDeck>
          {restaurant.grades.map((gra, index) => (
            <Card key={index}>
              <Card.Header>Grade: {gra.grade}</Card.Header>
              <Card.Body>
                <Card.Text>
                  <small>
                    Completed: {new Date(gra.date).toLocaleDateString()}
                  </small>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardDeck>
      </>
    );
  }
}

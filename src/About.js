import { Card} from "react-bootstrap";

export default function About() {
  return (
    <>
    <br />
    <Card border ="info" style={{ width: "75rem" }}>
          <Card.Header>
        <Card.Title>About</Card.Title>

        <Card.Text>All about me - the developer.</Card.Text>

        <Card.Text>Responsible and organized college student having proficiency in web development,and database management. Excellent leadership, communication, and problem-solving skills. Looking for a co-op position in a reputed company.</Card.Text>
        
        </Card.Header>
    </Card>
    </>
  );
}
